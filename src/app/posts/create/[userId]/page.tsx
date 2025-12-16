import React from "react";
import CreatePostClient from "./CreatePostClient";
import { prisma } from "@/lib/prisma";

const CreatePostServer = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const createPost = async (formData: FormData) => {
    "use server";

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

  return <CreatePostClient createPost={createPost} />;
};

export default CreatePostServer;
