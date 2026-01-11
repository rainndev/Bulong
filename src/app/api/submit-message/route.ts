import { prisma } from "@/lib/prisma";
import { PostSchema } from "@/lib/schema";
import { NextResponse } from "next/server";

const isNewDay = (lastReset: Date) => {
  return new Date().toDateString() !== new Date(lastReset).toDateString();
};

const getAnonymousInfo = async (userAgent: string, request: Request) => {
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

  let geoJsData: any = { region: "Unknown", country_code: "Unknown" };

  try {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
    geoJsData = await res.json();
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
  const basicInfo = await getAnonymousInfo(userAgent, request);

  const req = await request.json();

  const { username, title, content } = req;

  if (!username || !title || !content) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
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
