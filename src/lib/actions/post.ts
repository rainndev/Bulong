"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { PostSchema } from "../schema";
import { auth } from "../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type PostType = Prisma.PostGetPayload<{}>;

export const createPost = async (prevState: any, formData: FormData) => {
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
    userId: formData.get("userId"),
  };

  const validatedFields = PostSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.post.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        author: { connect: { id: validatedFields.data.userId } },
        published: true,
      },
    });
    return { success: true };
  } catch (error) {
    return { error: "Database failure" };
  }
};

export const getPost = async (userID: string): Promise<PostType[]> => {
  return await prisma.post.findMany({
    where: {
      authorId: userID,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostById = async (
  userID: string,
  postId: string,
): Promise<PostType | null> => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userID,
    },
  });

  return post;
};

export const signOut = async () => {
  "use server";
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/sign-in");
};

export const searchPost = async (query: string): Promise<PostType[]> => {
  return await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
    },
  });
};

export const getTotalPost = async (userId: string): Promise<number> => {
  return await prisma.post.count({
    where: {
      authorId: userId,
    },
  });
};

export const getRecentPost = async (
  userId: string,
  count: number = 2,
): Promise<PostType[]> => {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: count,
  });
};

export const getMessagesCountToday = async (
  userId: string,
): Promise<number> => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return await prisma.post.count({
    where: {
      authorId: userId,
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
  });
};

export const getMessagesCountThisWeek = async (
  userId: string,
): Promise<number> => {
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return await prisma.post.count({
    where: {
      authorId: userId,
      createdAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });
};

export const getAverageMessagesPerDaySQL = async (userId: string) => {
  const result = await prisma.$queryRaw<{ avg: number | null }[]>`
    SELECT COUNT(*)::float / COUNT(DISTINCT DATE("createdAt")) AS avg
    FROM "Post"
    WHERE "authorId" = ${userId};
  `;

  return result[0]?.avg ? Number(result[0].avg.toFixed(1)) : 0;
};
