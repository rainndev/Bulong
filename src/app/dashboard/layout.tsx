import { Prisma } from "@prisma/client";
import { headers } from "next/headers";
import {
  getAverageMessagesPerDaySQL,
  getMessagesThisWeekData,
  getMessagesCountToday,
} from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { IoAnalytics } from "react-icons/io5";
import NavigationBar from "@/components/NavigationBar";
import BottomBanner from "@/components/BottomBanner";

const Layout = async ({
  recentMessages,
  totalMessagesAndChart,
}: {
  recentMessages: React.ReactNode;
  totalMessagesAndChart: React.ReactNode;
}) => {
  //current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  if (!session) {
    return <div>Not logged in</div>;
  }

  const userId = session?.user.id;
  const userName = session?.user.name;
  const messagesToday = await getMessagesCountToday(userId);
  const { totalThisWeek } = await getMessagesThisWeekData(userId);
  const avgMessagePerDay = await getAverageMessagesPerDaySQL(userId);

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-gray-50 text-[#242731] md:flex-row">
      <NavigationBar currentPath="/dashboard" />
      <div className="h-full flex-1 overflow-y-auto p-4 md:p-10">
        <p className="mt-10 px-2 text-lg font-semibold text-[#242731] md:mt-0 md:text-xl">
          Hello, {user?.name || "User"}! 👋
        </p>
        <h1 className="mb-5 px-2 text-xl font-bold md:mb-0 md:text-4xl">
          Welcome to Your Dashboard
        </h1>

        <div className="mt-3 font-sans text-white md:mt-10">
          <div className="mx-auto space-y-3 md:space-y-6">
            <div className="grid grid-cols-1 items-center gap-3 rounded-3xl md:grid-cols-2 md:gap-6">
              {/* total message and chart */}
              {totalMessagesAndChart}

              {/* recent message */}
              {recentMessages}
            </div>

            <div className="grid h-full grid-cols-1 gap-3 text-[#242731] md:grid-cols-3 md:gap-6">
              <div className="h-full rounded-3xl border border-violet-200 bg-violet-50 p-6">
                <p className="mb-2 text-sm">New Messages (Today)</p>
                <h2 className="text-2xl font-bold">{messagesToday}</h2>

                <div className="mt-4 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-xl md:text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
                <p className="mb-2 text-sm">Messages This Week</p>
                <h2 className="text-2xl font-bold">{totalThisWeek}</h2>

                <div className="mt-4 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-xl md:text-4xl" />
                </div>
              </div>

              <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6">
                <p className="mb-2 text-sm">AVG Message/Day</p>
                <h2 className="text-2xl font-bold">{avgMessagePerDay}</h2>

                <div className="mt-4 w-full via-blue-400/20 to-transparent">
                  <IoAnalytics className="text-xl md:text-4xl" />
                </div>
              </div>
            </div>

            <BottomBanner userName={userName} />

            <div className="invisible h-30" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
