"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Ticket background with a scalloped perforation seam.
 * Horizontal layout on desktop (seam at x=560), vertical on mobile
 * (seam at y=160) — same squiggle, rotated.
 */
const TicketBg = ({
  className,
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) =>
  vertical ? (
    <svg
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 800"
    >
      {/* dark body (top ~85%) */}
      <rect width="400" height="680" fill="#1f1c14" />
      {/* lime stub (bottom ~15%) */}
      <rect y="680" width="400" height="120" fill="#a3e635" />
      {/* scalloped seam */}
      <g fill="#1f1c14">
        {[-40, 0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440].map(
          (x) => (
            <circle key={x} cx={x} cy="680" r="16" />
          ),
        )}
      </g>
      {/* dashed perforation */}
      <line
        x1="0"
        y1="680"
        x2="400"
        y2="680"
        stroke="#1f1c14"
        strokeWidth="4"
        strokeDasharray="2 14"
        strokeLinecap="round"
      />
      {/* subtle diagonal hatch on stub */}
      <g stroke="#1f1c14" strokeWidth="2" opacity="0.18">
        <line x1="0" y1="696" x2="400" y2="800" />
        <line x1="-100" y1="760" x2="300" y2="800" />
      </g>
    </svg>
  ) : (
    <svg
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 800 200"
    >
      {/* ticket body */}
      <path
        d="M 0 0 L 560 0 A 14 14 0 0 0 560 40 A 14 14 0 0 0 560 80 A 14 14 0 0 0 560 120 A 14 14 0 0 0 560 160 A 14 14 0 0 0 560 200 L 0 200 Z"
        fill="#1f1c14"
      />
      {/* lime stub */}
      <path
        d="M 560 0 L 800 0 L 800 200 L 560 200 A 14 14 0 0 1 560 160 A 14 14 0 0 1 560 120 A 14 14 0 0 1 560 80 A 14 14 0 0 1 560 40 A 14 14 0 0 1 560 0 Z"
        fill="#a3e635"
      />
      {/* perforation line */}
      <line
        x1="560"
        y1="8"
        x2="560"
        y2="192"
        stroke="#1f1c14"
        strokeWidth="4"
        strokeDasharray="2 14"
        strokeLinecap="round"
      />
      {/* subtle diagonal hatch on stub */}
      <g stroke="#1f1c14" strokeWidth="2" opacity="0.18">
        <line x1="600" y1="0" x2="780" y2="200" />
        <line x1="650" y1="0" x2="800" y2="160" />
        <line x1="560" y1="40" x2="700" y2="200" />
      </g>
    </svg>
  );

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
    <section className="relative mt-4 overflow-hidden rounded-lg border-2 border-[#1f1c14] shadow-[6px_6px_0_#1f1c14]">
      {/* ticket backgrounds: squiggle seam matching each layout */}
      <TicketBg className="absolute inset-0 hidden h-full w-full md:block" />
      <TicketBg vertical className="absolute inset-0 h-full w-full md:hidden" />

      <div className="relative flex flex-col md:min-h-36 md:flex-row md:items-center md:justify-between md:gap-4 md:p-5">
        {/* body (dark) */}
        <div className="p-4 md:p-0">
          <h2 className="text-base font-medium tracking-[-0.04em] text-white">
            Share your link
          </h2>
          <p className="mt-1 max-w-md text-[13px] font-medium text-[#b5b0a6]">
            Bulong lets friends and followers send you anonymous messages. Share
            your link and start receiving honest thoughts today.
          </p>
        </div>

        {/* stub (lime) */}
        <div className="flex flex-col gap-2 p-4 md:flex-row md:items-center md:p-0 md:pl-10">
          <span className="max-w-full truncate rounded-full border-2 border-[#1f1c14] bg-white px-3 py-2 text-xs font-bold text-[#1f1c14]">
            {fullLink || `…/@${userName}`}
          </span>
          <button
            onClick={handleCopy}
            aria-live="polite"
            className="cursor-pointer rounded-full border-2 border-[#a3e635] bg-[#1f1c14] px-4 py-2 text-xs font-bold text-[#a3e635] shadow-[3px_3px_0_#a3e635] transition-transform duration-100 hover:-rotate-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none md:border-[#1f1c14] md:text-[#a3e635] md:shadow-[3px_3px_0_#1f1c14] md:active:shadow-none"
          >
            {isCopied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>

      {/* spacer so stub clears the vertical seam on mobile */}
      <div className="h-12 md:hidden" />
    </section>
  );
};

export default BottomBanner;
