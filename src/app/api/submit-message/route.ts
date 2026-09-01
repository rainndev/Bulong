import { prisma } from "@/lib/prisma";
import { findProfanity } from "@/lib/profanity";
import {
  checkInboxCooldown,
  checkRateLimit,
  getIpForCooldown,
  honeypotPassed,
  isBodyTooLarge,
  isBotUserAgent,
} from "@/lib/rateLimit";
import { PostSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

const isNewDay = (lastReset: Date) => {
  return new Date().toDateString() !== new Date(lastReset).toDateString();
};

const getAnonymousInfo = async (userAgent: string) => {
  const isMobile = /Mobi|Android/i.test(userAgent);

  let os = "Unknown";
  if (/Android/i.test(userAgent)) os = "Android";
  else if (/iPhone|iPad/i.test(userAgent)) os = "iOS";
  else if (/Windows/i.test(userAgent)) os = "Windows";
  else if (/Macintosh/i.test(userAgent)) os = "macOS";

  let browser = "Other";
  if (/Chrome/i.test(userAgent)) browser = "Chrome";
  else if (/Safari/i.test(userAgent)) browser = "Safari";
  else if (/Firefox/i.test(userAgent)) browser = "Firefox";

  let geoJsData: { region?: string; country?: string } = {};

  try {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
    geoJsData = (await res.json()) as { region?: string; country?: string };
  } catch (error) {
    console.log("fetch failed:", error);
  }

  return {
    device: isMobile ? "Mobile" : "Desktop",
    os,
    browser,
    region: geoJsData.region,
    country: geoJsData.country,
  };
};

export const POST = async (request: Request) => {
  const userAgent = request.headers.get("user-agent") || "";

  if (isBotUserAgent(userAgent)) {
    return NextResponse.json({ error: "Message rejected." }, { status: 403 });
  }

  const rawBody = await request.text();

  if (isBodyTooLarge(rawBody)) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 413 },
    );
  }

  const req = JSON.parse(rawBody);
  const { username, title, content, honeypot } = req;

  if (!honeypotPassed(honeypot)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // 4. IP rate limit (sliding window + escalating block)
  const rateLimit = checkRateLimit(request);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: rateLimit.error },
      {
        status: rateLimit.status,
        headers: { "Retry-After": String(rateLimit.retryAfterSec) },
      },
    );
  }

  const basicInfo = await getAnonymousInfo(userAgent);

  if (!username || !title || !content) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  const inboxCooldown = checkInboxCooldown(getIpForCooldown(request), username);

  if (!inboxCooldown.allowed) {
    return NextResponse.json(
      { error: inboxCooldown.error },
      {
        status: inboxCooldown.status,
        headers: { "Retry-After": String(inboxCooldown.retryAfterSec) },
      },
    );
  }

  try {
    const rawData = {
      title,
      content,
      username,
      browser: basicInfo.browser,
      country: basicInfo.country,
      device: basicInfo.device,
      OS: basicInfo.os,
      region: basicInfo.region,
    };

    const validatedFields = PostSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return new Response(
        JSON.stringify({
          errors: validatedFields.error.flatten().fieldErrors,
        }),
        { status: 400 },
      );
    }

    // PROFANITY CHECK — reject before anything is stored or forwarded
    if (
      findProfanity(validatedFields.data.title, validatedFields.data.content)
    ) {
      return NextResponse.json(
        {
          error: "Please rewrite your message without offensive words.",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { name: validatedFields.data.username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // RESET DAILY COUNT IF NEW DAY
    if (isNewDay(user.lastResetDate)) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          messagesToday: 0,
          isDisabled: false,
          lastResetDate: new Date(),
        },
      });

      user.messagesToday = 0;
      user.isDisabled = false;
    }

    // CHECK LIMIT
    if (user.isDisabled || user.messagesToday >= user.dailyLimit) {
      return NextResponse.json(
        { error: "This inbox reached today's limit" },
        { status: 403 },
      );
    }

    //SAVE MESSAGE
    await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        author: { connect: { name: validatedFields.data.username } },
        published: true,
        browser: validatedFields.data.browser,
        country: validatedFields.data.country,
        device: validatedFields.data.device,
        OS: validatedFields.data.OS,
        region: validatedFields.data.region,
      },
    });

    // INCREMENT MESSAGE COUNT

    await prisma.user.update({
      where: { id: user.id },
      data: {
        messagesToday: { increment: 1 },
        isDisabled: user.messagesToday + 1 >= user.dailyLimit,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in /api/submit-message:", error);
    return new Response(JSON.stringify({ error: "Failed to save message" }), {
      status: 500,
    });
  }
};
