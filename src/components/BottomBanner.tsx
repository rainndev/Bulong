"use client";

import { useEffect, useState } from "react";

const BottomBanner = ({ userName }: { userName: string }) => {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleCopy = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
  };

  const fullLink = baseUrl ? `${baseUrl}/${userName}` : "";

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-linear-to-r from-purple-600 to-indigo-600 p-6">
      <p>
        Bulong lets you get anonymous messages from friends and followers. Share
        your link and start receiving honest thoughts and secrets today!
      </p>

      <div className="mt-10 flex items-center gap-2">
        <p className="truncate">
          Share Own Link <br /> {fullLink}
        </p>

        <button
          onClick={() => handleCopy(fullLink)}
          className="rounded-xl bg-white px-6 py-2 text-sm font-bold text-black transition hover:bg-gray-100"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default BottomBanner;
