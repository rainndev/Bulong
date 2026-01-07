import { prisma } from "@/lib/prisma";
import { PostSchema } from "@/lib/schema";

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

  const { userId, title, content } = req;

  if (!userId || !title || !content) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }
  try {
    const rawData = {
      title,
      content,
      userId,
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

    await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        author: { connect: { id: validatedFields.data.userId } },
        published: true,
        browser: validatedFields.data.browser,
        country: validatedFields.data.country,
        device: validatedFields.data.device,
        OS: validatedFields.data.OS,
        region: validatedFields.data.region,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save message" }), {
      status: 500,
    });
  }
};
