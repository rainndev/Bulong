import SideBar from "@/components/SideBar";

const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];
const pinPositions = [
  "-top-4 left-6",
  "-top-4 right-8",
  "-top-5 left-10",
  "-top-4 right-6",
];

const Loading = () => {
  return (
    <div className="font-fredoka flex h-dvh overflow-hidden bg-[#fafafa] text-[#171717]">
      <SideBar currentPath="/messages" />

      <div className="flex h-full w-full min-w-0 flex-1 flex-col">
        <div className="sketch-grid flex flex-1 flex-col overflow-y-auto bg-[#fdfaf2] pt-6 pb-28 md:pb-8">
          {/* header — real title + squiggle, ghost badge and search */}
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-5 md:flex-row md:items-center md:justify-between md:px-0">
            <div>
              <h1 className="relative text-xl font-bold tracking-[-0.04em] md:text-2xl">
                Messages
                <span className="ml-2 inline-block h-5 w-12 animate-pulse rounded-full border-2 border-[#1f1c14]/20 bg-[#ece9de] align-middle" />
              </h1>
            </div>

            <div className="relative w-full md:max-w-xs">
              <div className="h-10 w-full -rotate-1 animate-pulse rounded-full border-2 border-[#1f1c14]/20 bg-white shadow-[3px_3px_0_#1f1c14]/20" />
            </div>
          </div>

          {/* card grid — ghost cards with real rotations, pins, badges */}
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-2 pt-6 pb-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`relative block w-full rounded-xl border-2 border-[#1f1c14] bg-white p-5 pt-7 text-left shadow-[6px_6px_0_#1f1c14] ${rotations[i % rotations.length]}`}
              >
                {/* ghost pin */}
                <span
                  aria-hidden="true"
                  className={`absolute ${pinPositions[i % pinPositions.length]} size-7 animate-pulse rounded-full bg-[#ece9de]`}
                />

                {/* ghost "new" badge on some cards */}
                {i % 2 === 0 && (
                  <span className="absolute top-3 right-3 h-4 w-10 animate-pulse rounded-full border-2 border-[#1f1c14]/20 bg-[#ece9de]" />
                )}

                <div
                  className="mb-1 h-4 animate-pulse rounded bg-[#ece9de]"
                  style={{ width: "62%" }}
                />
                <div
                  className="mt-2 h-2.5 animate-pulse rounded bg-[#ece9de]/70"
                  style={{ width: "92%" }}
                />
                <div
                  className="mt-1.5 h-2.5 animate-pulse rounded bg-[#ece9de]/70"
                  style={{ width: "78%" }}
                />
                <div
                  className="mt-1.5 h-2.5 animate-pulse rounded bg-[#ece9de]/70"
                  style={{ width: "85%" }}
                />
                <div
                  className="mt-3 h-2 w-12 animate-pulse rounded bg-[#ece9de]/70"
                  style={{ marginLeft: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
