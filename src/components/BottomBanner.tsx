"use client";

import { useEffect, useState } from "react";

const BottomBanner = ({ userName }: { userName: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleCopy = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  const fullLink = baseUrl ? `${baseUrl}/@${userName}` : "";

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-[#242731] p-6 text-[clamp(0.875rem,2vw,1.125rem)] text-violet-50 antialiased">
      <p>
        Bulong lets you get anonymous messages from friends and followers. Share
        your link and start receiving honest thoughts and secrets today!
      </p>

      <div className="mt-10 flex items-end gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="w-fit rounded-lg bg-violet-50/10 px-3 py-2 text-[clamp(0.75rem,2vw,1rem)] text-nowrap">
            Share Own Link
          </span>
          <p className="truncate">{fullLink}</p>
        </div>

        <button
          onClick={() => handleCopy(fullLink)}
          className="cursor-pointer rounded-lg bg-white px-4 py-2 text-[clamp(0.75rem,2vw,1rem)] font-bold text-[#242731] transition-all hover:bg-gray-100 hover:px-8 hover:py-3"
        >
          {isCopied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};

export default BottomBanner;
