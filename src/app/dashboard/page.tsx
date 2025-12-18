import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { getPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export type PostType = Prisma.PostGetPayload<{}>;

const signOut = async () => {
  "use server";
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/sign-in");
};

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
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.name || "User"}!</p>
      <p>Email: {user?.email}</p>
      <p>Share Own Link: {`${baseUrl}/posts/create/${user?.id}`}</p>

      {/* list of messages */}
      <ul>
        {posts.map((data) => (
          <li key={data.id}>{data.title}</li>
        ))}
      </ul>
      <button
        onClick={signOut}
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </main>
  );
};

export default DashboardPage;
