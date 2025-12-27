"use client";

import { useEffect, useState } from "react";

const BottomBanner = ({ userId }: { userId: string }) => {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleCopy = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
  };

  const fullLink = baseUrl ? `${baseUrl}/posts/create/${userId}` : "";

  return (
    <div className="flex flex-col justify-between rounded-3xl bg-linear-to-r from-purple-600 to-indigo-600 p-6">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni id ea
        eveniet deleniti ratione dolor assumenda voluptatibus? Amet minima,
        vitae asperiores error quo quidem, deserunt ratione delectus provident
        consectetur distinctio.
      </p>

      <div className="mt-10 flex items-center gap-2">
        <p className="truncate">Share Own Link: {fullLink}</p>

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
