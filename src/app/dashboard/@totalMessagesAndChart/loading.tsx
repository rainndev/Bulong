const Loading = () => {
  return (
    <section className="flex flex-col rounded-lg border-2 border-[#e5e5e5] bg-white p-3.5">
      <div className="mb-2 flex items-baseline justify-between">
        <div className="h-3.5 w-32 animate-pulse rounded bg-[#f5f5f5]" />
        <div className="h-3 w-24 animate-pulse rounded bg-[#f5f5f5]" />
      </div>
      <div className="h-56 w-full animate-pulse rounded-lg bg-[#f5f5f5] md:h-64" />
    </section>
  );
};

export default Loading;
