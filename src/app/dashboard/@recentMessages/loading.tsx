const Loading = () => {
  return (
    <section className="flex min-h-72 rotate-1 flex-col rounded-xl border-2 border-[#1f1c14] bg-white p-3.5 shadow-[6px_6px_0_#1f1c14]">
      <div className="mb-1 flex items-baseline justify-between">
        <h2 className="text-[13px] font-bold">Recent messages</h2>
        <span className="text-[11px] font-bold text-[#1f1c14]/50">
          View all →
        </span>
      </div>

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 border-b-2 border-dashed border-[#1f1c14]/15 py-2.5 last:border-b-0"
        >
          {/* ghost envelope tile — same size/shape as the lime icon tile */}
          <span className="grid size-7 shrink-0 animate-pulse place-items-center rounded-lg border-2 border-[#1f1c14]/20 bg-[#ece9de]" />

          <div className="flex w-full min-w-0 flex-col gap-1">
            <div
              className="h-3.5 animate-pulse rounded bg-[#ece9de]"
              style={{ width: `${60 - i * 8}%` }}
            />
            <div
              className="h-2.5 animate-pulse rounded bg-[#ece9de]/70"
              style={{ width: `${85 - i * 6}%` }}
            />
          </div>

          <div className="ml-auto h-2.5 w-10 shrink-0 animate-pulse rounded bg-[#ece9de]/70" />
        </div>
      ))}
    </section>
  );
};

export default Loading;
