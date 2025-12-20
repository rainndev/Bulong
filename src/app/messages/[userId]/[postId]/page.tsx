import { getPostById } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const PostPage = async ({
  params,
}: {
  params: Promise<{ userId: string; postId: string }>;
}) => {
  const { postId, userId } = await params;
  //current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || userId != session.user.id) {
    return <div>Not logged in</div>;
  }

  const post = await getPostById(userId, postId);

  return <div>message: {post?.content}</div>;
};

export default PostPage;
