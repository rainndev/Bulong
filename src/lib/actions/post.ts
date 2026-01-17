"use server";

import { PostType } from "@/types/post.types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth/auth";
import { prisma } from "../prisma";

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

  redirect("/");
};

export const searchPost = async (
  query: string,
  userId: string,
): Promise<PostType[]> => {
  return await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
      ],
      authorId: userId,
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

export const getMessagesThisWeekData = async (userId: string) => {
  const now = new Date();

  // Monday start
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Fetch posts this week
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      createdAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    select: {
      createdAt: true,
    },
  });

  // Prepare 7-day map
  const daysMap: Record<string, number> = {};

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const key = d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
    daysMap[key] = 0;
  }

  // Count messages per day
  for (const post of posts) {
    const key = post.createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });

    if (daysMap[key] !== undefined) {
      daysMap[key]++;
    }
  }

  const chartData = Object.entries(daysMap).map(([date, messagesCount]) => ({
    date,
    messagesCount,
  }));

  return {
    chartData,
    totalThisWeek: posts.length,
  };
};

export const getAverageMessagesPerDaySQL = async (userId: string) => {
  const result = await prisma.$queryRaw<{ avg: number | null }[]>`
    SELECT 
      COUNT(*)::float 
      / NULLIF(COUNT(DISTINCT DATE("createdAt")), 0) AS avg
    FROM "Post"
    WHERE "authorId" = ${userId};
  `;

  return result[0]?.avg ? Number(result[0].avg.toFixed(1)) : 0;
};

export const markAsReadPost = async (postId?: string) => {
  if (!postId) return false;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { isRead: true },
    });

    return !!updatedPost;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deletePost = async (postId?: string) => {
  if (!postId) return false;

  try {
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    return !!deletedPost;
  } catch (error) {
    console.error(error);
    return false;
  }
};
