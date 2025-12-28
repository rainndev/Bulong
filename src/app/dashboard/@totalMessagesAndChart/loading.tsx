import AreaChartMessages from "@/components/AreaChartMessages";

const data = [
  { date: "Dec 12", messagesCount: 12 },
  { date: "Dec 12", messagesCount: 8 },
  { date: "Dec 12", messagesCount: 15 },
  { date: "Dec 12", messagesCount: 6 },
  { date: "Dec 12", messagesCount: 20 },
  { date: "Dec 12", messagesCount: 10 },
  { date: "Dec 12", messagesCount: 18 },
];

const Loading = () => {
  return (
    <div className="relative flex h-full flex-col justify-center">
      <p className="md:text-md mb-1 text-sm text-gray-400">Messages Received</p>
      <h1 className="mb-10 w-fit animate-pulse rounded-xl bg-gray-50/5 px-2 text-4xl font-bold md:mb-8 md:text-5xl">
        <span className="invisible">12</span>
      </h1>

      <div className="animate-pulse rounded-2xl bg-gray-50/5">
        <AreaChartMessages className="invisible" data={data} />
      </div>
    </div>
  );
};

export default Loading;
