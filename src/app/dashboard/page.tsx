import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { getPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { IoAnalytics } from "react-icons/io5";
import NavigationBar from "@/components/NavigationBar";
import AreaChartExample from "@/components/AreaChartExample";

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

  return (
    <main className="mx-auto flex h-screen w-full rounded-3xl bg-gray-50 text-[#242731]">
      <NavigationBar currentPath="/dashboard" />
      <div className="h-full w-full p-10">
        <p className="text-xl font-semibold text-[#242731]">
          Hello, {user?.name || "User"}!
        </p>
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>

        <div className="mt-10 font-sans text-white">
          <div className="mx-auto space-y-6">
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-[#242731] p-8 md:grid-cols-2">
              <div>
                <p className="text-md mb-1 text-gray-400">Total Balance</p>
                <h1 className="mb-8 text-5xl font-bold">4725.05</h1>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-orange-400"></span>
                      <span className="text-gray-400">Category A</span>
                    </div>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                      <span className="text-gray-400">Category B</span>
                    </div>
                    <span className="font-medium">25%</span>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center">
                <AreaChartExample />
              </div>
            </div>

            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
              <div className="h-full rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-xs text-gray-400">Category</p>
                <h2 className="text-3xl font-bold">$1282</h2>
                <p className="mt-1 text-xs text-green-400">+1.5%</p>
                <div className="mt-4 h-12 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-xs text-gray-400">Category</p>
                <h2 className="text-3xl font-bold">$1282</h2>
                <p className="mt-1 text-xs text-blue-400">+1.5%</p>
                <div className="mt-4 h-12 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-xs text-gray-400">Category</p>
                <h2 className="text-2xl font-bold">$1282</h2>
                <p className="mt-1 text-xs text-pink-400">+1.5%</p>
                <div className="mt-4 h-12 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-4xl" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-linear-to-r from-purple-600 to-indigo-600 p-6">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                id ea eveniet deleniti ratione dolor assumenda voluptatibus?
                Amet minima, vitae asperiores error quo quidem, deserunt ratione
                delectus provident consectetur distinctio.
              </p>
              <div className="mt-10 flex items-center gap-2">
                <p>Share Own Link: {`${baseUrl}/posts/create/${user?.id}`}</p>

                <button className="rounded-xl bg-white px-6 py-2 text-sm font-bold text-black transition hover:bg-gray-100">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
