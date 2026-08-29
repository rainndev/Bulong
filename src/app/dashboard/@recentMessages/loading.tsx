const Loading = () => {
  return (
    <section className="flex min-h-72 flex-col rounded-xl border border-[#e5e5e5] bg-white p-3.5">
      <div className="mb-1 flex items-baseline justify-between">
        <div className="h-3.5 w-32 animate-pulse rounded bg-[#f5f5f5]" />
        <div className="h-3 w-16 animate-pulse rounded bg-[#f5f5f5]" />
      </div>

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b border-[#f5f5f5] py-2.5 last:border-b-0"
        >
          <div className="size-7 shrink-0 animate-pulse rounded-lg bg-[#f5f5f5]" />
          <div className="flex w-full min-w-0 flex-col gap-1.5">
            <div className="h-3.5 w-3/5 animate-pulse rounded bg-[#f5f5f5]" />
            <div className="h-2.5 w-4/5 animate-pulse rounded bg-[#f5f5f5]" />
          </div>
          <div className="ml-auto h-2.5 w-10 shrink-0 animate-pulse rounded bg-[#f5f5f5]" />
        </div>
      ))}
    </section>
  );
};

export default Loading;
