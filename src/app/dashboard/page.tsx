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
import { FaEnvelope } from "react-icons/fa";

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
  const recentPost = await getRecentPost(userId, 4);
  const messagesToday = await getMessagesCountToday(userId);
  const { totalThisWeek, chartData } = await getMessagesThisWeekData(userId);
  const avgMessagePerDay = await getAverageMessagesPerDaySQL(userId);

  return (
    <main className="mx-auto flex h-screen w-full rounded-3xl bg-gray-50 text-[#242731]">
      <NavigationBar currentPath="/dashboard" />
      <div className="h-full w-full p-2 md:p-10">
        <p className="text-xl font-semibold text-[#242731]">
          Hello, {user?.name || "User"}!
        </p>
        <h1 className="text-2xl font-bold md:text-4xl">
          Welcome to Your Dashboard
        </h1>

        <div className="mt-3 font-sans text-white md:mt-10">
          <div className="mx-auto space-y-3 md:space-y-6">
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border bg-[#242731] p-6 md:grid-cols-2 md:p-8">
              <div className="relative flex h-full flex-col justify-center">
                <p className="md:text-md mb-1 text-sm text-gray-400">
                  Messages Received
                </p>
                <h1 className="mb-10 text-4xl font-bold md:mb-8 md:text-5xl">
                  {totalPost}
                </h1>

                <AreaChartMessages data={chartData} />
              </div>

              <div>
                <div className="space-y-2 md:space-y-4">
                  <h1 className="md:text-md rounded-lg bg-gray-50/5 p-2 pl-4 text-sm">
                    Recent
                  </h1>

                  {recentPost.map((data) => (
                    <div
                      key={data.id}
                      className="flex items-center gap-4 rounded-xl p-2 md:px-5"
                    >
                      <div>
                        <FaEnvelope className="rotate-30 text-sm text-gray-50/40" />
                      </div>

                      <div className="flex min-w-0 flex-col text-sm">
                        <h1 className="text-md font-semibold md:text-lg">
                          {data.title}
                        </h1>
                        <p className="truncate text-xs text-[#949494] md:text-sm">
                          {data.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
              <div className="h-full rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-sm text-gray-400">
                  New Messages (Today)
                </p>
                <h2 className="text-3xl font-bold">{messagesToday}</h2>

                <div className="mt-4 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-xl md:text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-sm text-gray-400">Messages This Week</p>
                <h2 className="text-3xl font-bold">{totalThisWeek}</h2>

                <div className="mt-4 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-xl md:text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl bg-[#242731] p-6">
                <p className="mb-2 text-sm text-gray-400">AVG Message/Day</p>
                <h2 className="text-2xl font-bold">{avgMessagePerDay}</h2>

                <div className="mt-4 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-xl md:text-4xl" />
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
