import BottomBanner from "@/components/BottomBanner";
import KpiCard from "@/components/dashboard/KpiCard";
import SideBar from "@/components/SideBar";
import {
  getAverageMessagesPerDaySQL,
  getMessagesCountToday,
  getMessagesThisWeekData,
  getTotalPost,
} from "@/lib/actions/post";
import { requireAuth } from "@/lib/actions/user";
import { Metadata } from "next";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Dashboard | Bulong",
};

const Layout = async ({
  recentMessages,
  totalMessagesAndChart,
}: {
  recentMessages: React.ReactNode;
  totalMessagesAndChart: React.ReactNode;
}) => {
  const session = await requireAuth();
  const user = session?.user;

  const userId = user.id;
  const userName = user.name;

  const [totalMessages, messagesToday, weekData, avgMessagePerDay] =
    await Promise.all([
      getTotalPost(userId),
      getMessagesCountToday(userId),
      getMessagesThisWeekData(userId),
      getAverageMessagesPerDaySQL(userId),
    ]);

  const { totalThisWeek, chartData } = weekData;
  const spark = chartData.map((day) => day.messagesCount);
  const yesterdayCount = chartData[chartData.length - 2]?.messagesCount ?? 0;
  const dayDiff = messagesToday - yesterdayCount;

  const todayDelta =
    dayDiff > 0
      ? `↑ ${dayDiff} vs yesterday`
      : dayDiff < 0
        ? `↓ ${Math.abs(dayDiff)} vs yesterday`
        : "Same as yesterday";

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[#fafafa] font-fredoka text-[#171717]">
      <SideBar currentPath="/dashboard" />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#e5e5e5] bg-white px-4 md:px-5">
          <Link
            href="/messages"
            aria-label="Search your messages"
            className="flex items-center gap-2 rounded-lg bg-[#f5f5f5] px-3 py-2 text-[13px] text-[#a3a3a3] transition-colors hover:bg-[#efefef] hover:text-[#737373]"
          >
            <IoSearchOutline className="text-sm" />
            <span className="hidden sm:inline">Search messages…</span>
          </Link>
          <span className="ml-auto rounded-lg border border-[#e5e5e5] px-2.5 py-1.5 text-xs text-[#525252]">
            Last 7 days ▾
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 pb-24 md:pb-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-[-0.04em]">
                Dashboard
              </h1>
              <p className="mt-0.5 text-xs text-[#737373]">
                Welcome back, {user?.name || "User"} · anonymous messages at a
                glance
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
              <KpiCard
                label="Total messages"
                value={totalMessages}
                delta="All time"
                spark={spark}
              />
              <KpiCard
                label="New today"
                value={messagesToday}
                delta={todayDelta}
                deltaTone={
                  dayDiff > 0 ? "up" : dayDiff < 0 ? "down" : "neutral"
                }
              />
              <KpiCard
                label="This week"
                value={totalThisWeek}
                delta="Last 7 days"
                spark={spark}
              />
              <KpiCard
                label="Avg / day"
                value={avgMessagePerDay}
                delta="Lifetime average"
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[1.5fr_1fr]">
              {totalMessagesAndChart}
              {recentMessages}
            </div>

            <BottomBanner userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
