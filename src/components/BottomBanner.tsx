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
    <section className="rounded-xl bg-[#171717] p-4 text-[#ece8df] md:p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="min-w-0">
          <h2 className="text-base font-medium tracking-[-0.04em] text-white">
            Share your link
          </h2>
          <p className="mt-1 max-w-md text-[13px] text-[#b5b0a6]">
            Bulong lets friends and followers send you anonymous messages. Share
            your link and start receiving honest thoughts today.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <span className="max-w-full truncate rounded-lg bg-[#365314] px-3 py-2 text-xs font-medium text-[#ecfccb] sm:max-w-72">
            {fullLink || `…/@${userName}`}
          </span>
          <button
            onClick={handleCopy}
            aria-live="polite"
            className="cursor-pointer rounded-lg bg-[#65a30d] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#4d7c0f]"
          >
            {isCopied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
