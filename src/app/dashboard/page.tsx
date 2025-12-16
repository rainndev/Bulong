import React from "react";
import DashboardClient from "./DashboardClient";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";

export type PostType = Prisma.PostGetPayload<{}>;

const Page = async () => {
  // Infer type of a Post

  const headersList = await headers();
  const host = headersList.get("host"); // e.g., localhost:3000 or your domain
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const getPost = async (userID: string): Promise<PostType[]> => {
    "use server";
    const posts = await prisma.post.findMany({
      where: {
        authorId: userID,
      },
    });
    return posts;
  };

  return <DashboardClient getPost={getPost} baseUrl={baseUrl} />;
};

export default Page;
