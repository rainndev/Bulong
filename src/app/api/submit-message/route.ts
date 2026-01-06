import { prisma } from "@/lib/prisma";
import { PostSchema } from "@/lib/schema";

export const POST = async (request: Request) => {
  const req = await request.json();
  const anonymouseInfoResponse = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/anonymous-info`,
    {
      cache: "no-store",
    },
  );

  console.log("Anonymous info:", anonymouseInfoResponse);

  const anonymouseInfo: {
    device: string;
    os: string;
    browser: string;
    country: string;
    region: string;
  } = await anonymouseInfoResponse.json();

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
      browser: anonymouseInfo.browser,
      country: anonymouseInfo.country,
      device: anonymouseInfo.device,
      OS: anonymouseInfo.os,
      region: anonymouseInfo.region,
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
