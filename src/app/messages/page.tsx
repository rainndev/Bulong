import MessagesClient from "@/components/messages/MessagesClient";
import { getPost } from "@/lib/actions/post";
import { requireAuth } from "@/lib/actions/user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | Bulong",
};

const MessagesPage = async () => {
  const session = await requireAuth();

  const userId = session?.user.id;
  const posts = await getPost(userId as string);

  return <MessagesClient posts={posts} userId={userId} />;
};

export default MessagesPage;
