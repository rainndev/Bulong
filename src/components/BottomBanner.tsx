"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};

const BottomBanner = ({ userName }: { userName: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const origin = useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => "",
  );

  const fullLink = `${origin}/@${userName}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullLink);
    setIsCopied(true);
  };

  return (
    <section className="-rotate-1 rounded-lg border-2 border-[#1f1c14] bg-[#1f1c14] p-4 shadow-[6px_6px_0_#a3e635] md:p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="min-w-0">
          <h2 className="text-base font-bold tracking-[-0.04em] text-white">
            Share your link
          </h2>
          <p className="mt-1 max-w-md text-[13px] font-medium text-[#b5b0a6]">
            Bulong lets friends and followers send you anonymous messages. Share
            your link and start receiving honest thoughts today.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <span className="max-w-full truncate rounded-full border-2 border-[#a3e635] px-3 py-2 text-xs font-bold text-[#ecfccb] sm:max-w-72">
            {fullLink || `…/@${userName}`}
          </span>
          <button
            onClick={handleCopy}
            aria-live="polite"
            className="cursor-pointer rounded-full border-2 border-[#a3e635] bg-[#a3e635] px-4 py-2 text-xs font-bold text-[#1f1c14] transition-transform duration-100 hover:-rotate-1 active:translate-x-0.5 active:translate-y-0.5"
          >
            {isCopied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
