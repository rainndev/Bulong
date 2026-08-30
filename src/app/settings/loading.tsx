import SideBar from "@/components/SideBar";

const Loading = () => {
  return (
    <div className="sketch-grid font-fredoka flex h-dvh w-full overflow-hidden bg-[#fdfaf2] text-[#1f1c14]">
      <SideBar currentPath="/settings" />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto pt-6 pb-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:px-5">
            <div className="flex flex-col gap-2">
              <div className="h-7 w-28 animate-pulse rounded bg-[#e5e5e5]" />
              <div className="h-3 w-56 animate-pulse rounded bg-[#e5e5e5]" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-44 animate-pulse rounded-xl border-2 border-[#e5e5e5] bg-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
