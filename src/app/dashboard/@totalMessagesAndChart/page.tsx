import AreaChartMessages from "@/components/AreaChartMessages";
import { getMessagesThisWeekData } from "@/lib/actions/post";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const TotalMessagesAndChart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const userId = session?.user.id;
  const { chartData } = await getMessagesThisWeekData(userId);

  return (
    <section className="flex flex-col rounded-xl border border-[#e5e5e5] bg-white p-3.5">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-[13px] font-semibold">Messages received</h2>
        <span className="text-[11px] text-[#737373]">Daily · last 7 days</span>
      </div>

      <div className="h-56 w-full md:h-64">
        <AreaChartMessages data={chartData} />
      </div>
    </section>
  );
};

export default TotalMessagesAndChart;
