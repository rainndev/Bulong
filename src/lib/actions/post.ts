"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { PostSchema } from "../schema";

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
  const posts = await prisma.post.findMany({
    where: {
      authorId: userID,
    },
  });
  return posts;
};

export const getPostById = async (
  userID: string,
  postId: string
): Promise<PostType | null> => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userID,
    },
  });

  return post;
};
