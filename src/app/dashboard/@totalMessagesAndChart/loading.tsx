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
    <div className="relative flex h-full flex-col justify-center rounded-3xl border border-violet-200 bg-violet-100 p-6 text-[#242731]">
      <p className="text-[clamp(0.875rem,2vw,1rem)] font-medium text-[#242731]/50">
        Messages Received
      </p>
      <h1 className="mb-10 w-fit animate-pulse rounded-xl bg-violet-950/15 px-2 text-[clamp(2.5rem,4vw,3rem)] font-bold">
        <span className="invisible">12</span>
      </h1>

      <div className="animate-pulse rounded-2xl bg-violet-950/15">
        <AreaChartMessages className="invisible" data={data} />
      </div>
    </div>
  );
};

export default Loading;
