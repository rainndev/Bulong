import NavigationBar from "@/components/NavigationBar";
import { getPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import MessagesClient from "./MessagesClient";

const MessagesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not logged in</div>;
  }

  const userId = session?.user.id;
  const posts = await getPost(userId as string);

  return <MessagesClient posts={posts} />;
};

export default MessagesPage;
