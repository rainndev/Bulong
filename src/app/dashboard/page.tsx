import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import {
  getAverageMessagesPerDaySQL,
  getMessagesThisWeekData,
  getMessagesCountToday,
  getRecentPost,
  getTotalPost,
} from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { IoAnalytics } from "react-icons/io5";
import NavigationBar from "@/components/NavigationBar";
import AreaChartMessages from "@/components/AreaChartMessages";
import BottomBanner from "@/components/BottomBanner";

export type PostType = Prisma.PostGetPayload<{}>;

const DashboardPage = async () => {
  //current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!session) {
    return <div>Not logged in</div>;
  }

  const userId = session?.user.id;
  const totalPost = await getTotalPost(userId);
  const recentPost = await getRecentPost(userId);
  const messagesToday = await getMessagesCountToday(userId);
  const { totalThisWeek, chartData } = await getMessagesThisWeekData(userId);
  const avgMessagePerDay = await getAverageMessagesPerDaySQL(userId);

  return (
    <main className="mx-auto flex h-screen w-full rounded-3xl bg-gray-50 text-[#242731]">
      <NavigationBar currentPath="/dashboard" />
      <div className="h-full w-full p-5 md:p-10">
        <p className="text-xl font-semibold text-[#242731]">
          Hello, {user?.name || "User"}!
        </p>
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>

        <div className="mt-10 font-sans text-white">
          <div className="mx-auto space-y-6">
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-[#242731] p-8 md:grid-cols-2">
              <div>
                <p className="text-md mb-1 text-gray-400">Messages Received</p>
                <h1 className="mb-8 text-5xl font-bold">{totalPost}</h1>
                <div className="my-2 h-px bg-[#949494]" />
                <div className="space-y-4">
                  <h1>Recent</h1>

                  {recentPost.map((data) => (
                    <div
                      key={data.id}
                      className="flex flex-col justify-between rounded-xl p-2 px-5 text-sm"
                    >
                      <h1 className="text-lg font-semibold">{data.title}</h1>
                      <p className="truncate text-[#949494]">{data.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex justify-center">
                <AreaChartMessages data={chartData} />
              </div>
            </div>

            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
              <div className="h-full rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-sm text-gray-400">
                  New Messages (Today)
                </p>
                <h2 className="text-3xl font-bold">{messagesToday}</h2>
                <p className="mt-1 text-xs text-green-400">+1.5%</p>
                <div className="mt-4 h-12 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-sm text-gray-400">Messages This Week</p>
                <h2 className="text-3xl font-bold">{totalThisWeek}</h2>
                <p className="mt-1 text-xs text-blue-400">+1.5%</p>
                <div className="mt-4 h-12 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-sm text-gray-400">AVG Message/Day</p>
                <h2 className="text-2xl font-bold">{avgMessagePerDay}</h2>
                <p className="mt-1 text-xs text-pink-400">+1.5%</p>
                <div className="mt-4 h-12 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-4xl" />
                </div>
              </div>
            </div>

            <BottomBanner userId={userId} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
