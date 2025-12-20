import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { getPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";

export type PostType = Prisma.PostGetPayload<{}>;

const DashboardPage = async () => {
  const headersList = await headers();
  const host = headersList.get("host"); // e.g., localhost:3000 or your domain
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  //current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!session) {
    return <div>Not logged in</div>;
  }

  const userId = session?.user.id;
  const posts = await getPost(userId as string);

  return (
    <main className="h-full flex items-center justify-center  mx-auto  text-black bg-amber-200 w-full">
      <NavigationBar currentPath="/dashboard" />
      <div className="w-full p-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {user?.name || "User"}!</p>
        <p>Email: {user?.email}</p>
        <p>Share Own Link: {`${baseUrl}/posts/create/${user?.id}`}</p>

        {/* list of messages */}
        <ul>
          {posts.map((data) => (
            <li key={data.id}>
              <Link href={`/messages/${userId}/${data.id}`}>
                {" "}
                {data.title}{" "}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default DashboardPage;
