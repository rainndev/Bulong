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
    <section className="flex flex-col rounded-lg border-2 border-[#1f1c14] bg-white p-3.5 shadow-[6px_6px_0_#1f1c14]">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-[13px] font-semibold">Messages received</h2>
        <span className="text-[11px] font-bold text-[#1f1c14]/50">
          Daily · last 7 days
        </span>
      </div>

      <div className="h-56 w-full md:h-64">
        <AreaChartMessages data={chartData} />
      </div>
    </section>
  );
};

export default TotalMessagesAndChart;
