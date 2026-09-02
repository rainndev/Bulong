import SideBar from "@/components/SideBar";

const ghostCards = [
  { label: "Limit Message", helper: "Max anonymous messages per day", control: "input" },
  { label: "Spoil Unread Messages", helper: "Hide preview text of unread messages", control: "switch" },
  { label: "Accept Messages", helper: "Turn off to pause receiving new messages", control: "switch" },
];

const Loading = () => {
  return (
    <div className="sketch-grid font-fredoka flex h-dvh w-full overflow-hidden bg-[#fdfaf2] text-[#1f1c14]">
      <SideBar currentPath="/settings" />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto pt-6 pb-24 md:pb-4">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:px-5">
            <div>
              <h1 className="text-xl font-bold tracking-[-0.04em] md:text-2xl">
                Settings
              </h1>
              <p className="mt-0.5 text-xs font-bold text-[#1f1c14]/50">
                Manage how your anonymous inbox behaves
              </p>
            </div>

            <div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {ghostCards.map((card) => (
                  <div
                    key={card.label}
                    className="flex flex-col gap-4 rounded-xl border-2 border-[#1f1c14] bg-white p-5 shadow-[6px_6px_0_#1f1c14] md:p-6"
                  >
                    <p className="text-base font-bold">
                      {card.label}
                      <span className="ml-2 inline-block h-5 w-14 animate-pulse rounded-full border-2 border-[#1f1c14]/20 bg-[#ece9de] align-middle" />
                    </p>

                    {card.control === "input" ? (
                      <div className="h-[42px] w-full animate-pulse rounded-lg border-2 border-[#1f1c14]/20 bg-[#fdfaf2]" />
                    ) : (
                      <div className="h-8 w-14 animate-pulse rounded-full border-2 border-[#1f1c14]/20 bg-[#ece9de]" />
                    )}

                    <p className="text-xs font-bold text-[#1f1c14]/50">
                      {card.helper}
                    </p>
                  </div>
                ))}
              </div>

              {/* save button ghost — same pill metrics */}
              <div className="mt-8 max-w-md">
                <div className="h-12 w-full animate-pulse rounded-full border-2 border-[#1f1c14]/20 bg-[#ece9de]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
