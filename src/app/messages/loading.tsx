import SideBar from "@/components/SideBar";

const Loading = () => {
  return (
    <div className="flex h-dvh font-fredoka">
      <SideBar currentPath="/messages" />

      <div className="flex h-full w-full min-w-0 flex-1 flex-col">
        <div className="sketch-grid flex flex-1 flex-col overflow-y-auto bg-[#fdfaf2] pt-6 pb-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-5 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="h-8 w-32 animate-pulse rounded-lg bg-[#e5e5e5]" />
            <div className="h-11 w-full animate-pulse rounded-full bg-[#e5e5e5] md:max-w-xs" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-2 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-lg border-2 border-[#e5e5e5] bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
