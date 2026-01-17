import { getPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import MessagesClient from "./MessagesClient";

export const metadata: Metadata = {
  title: "Messages | Bulong",
};

const MessagesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not logged in</div>;
  }

  const userId = session?.user.id;
  const posts = await getPost(userId as string);

  return <MessagesClient posts={posts} userId={userId} />;
};

export default MessagesPage;
