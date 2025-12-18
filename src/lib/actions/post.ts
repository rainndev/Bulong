"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export type PostType = Prisma.PostGetPayload<{}>;

export const createPost = async (formData: FormData, userId: string) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { id: userId } },
      published: true,
    },
  });
};

export const getPost = async (userID: string): Promise<PostType[]> => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userID,
    },
  });
  return posts;
};
