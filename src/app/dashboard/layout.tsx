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
import {
  FaCalendarDay,
  FaCalendarWeek,
  FaChartLine,
  FaEnvelope,
} from "react-icons/fa";

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
    <div className="sketch-grid font-fredoka flex h-dvh w-full flex-col overflow-hidden bg-[#fdfaf2] text-[#171717]">
      <div className="flex min-h-0 flex-1">
        <SideBar currentPath="/dashboard" />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto pt-6 pb-24 md:pb-4">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 md:px-5">
              <div>
                <h1 className="text-xl font-bold tracking-[-0.04em]">
                  Dashboard
                </h1>
                <p className="mt-0.5 text-xs font-semibold text-[#1f1c14]/50">
                  Welcome back, {user?.name || "User"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
                <KpiCard
                  label="Total messages"
                  value={totalMessages}
                  delta="All time"
                  spark={spark}
                  icon={<FaEnvelope size={11} />}
                />
                <KpiCard
                  label="New today"
                  value={messagesToday}
                  delta={todayDelta}
                  deltaTone={
                    dayDiff > 0 ? "up" : dayDiff < 0 ? "down" : "neutral"
                  }
                  icon={<FaCalendarDay size={11} />}
                />
                <KpiCard
                  label="This week"
                  value={totalThisWeek}
                  delta="Last 7 days"
                  spark={spark}
                  icon={<FaCalendarWeek size={11} />}
                />
                <KpiCard
                  label="Avg / day"
                  value={avgMessagePerDay}
                  delta="Lifetime average"
                  icon={<FaChartLine size={11} />}
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
    </div>
  );
};

export default Layout;
