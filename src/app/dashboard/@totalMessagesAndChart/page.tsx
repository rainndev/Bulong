import AreaChartMessages from "@/components/AreaChartMessages";
import { getMessagesThisWeekData, getTotalPost } from "@/lib/actions/post";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const TotalMessagesAndChart = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("completed");
    }, 2000);
  });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not logged in</div>;
  }

  const userId = session?.user.id;

  const totalPost = await getTotalPost(userId);
  const { chartData } = await getMessagesThisWeekData(userId);
  return (
    <div className="relative flex h-full flex-col justify-center rounded-3xl border border-violet-200 bg-violet-100 p-6 text-[#242731]">
      <p className="md:text-md mb-1 text-sm">Messages Received</p>
      <h1 className="mb-10 text-4xl font-bold md:mb-8 md:text-5xl">
        {totalPost}
      </h1>

      <AreaChartMessages data={chartData} />
    </div>
  );
};

export default TotalMessagesAndChart;
