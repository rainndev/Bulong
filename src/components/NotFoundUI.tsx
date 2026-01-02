"use client";

import Image from "next/image";

const NotFoundUI = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-violet-50 p-5 md:p-10">
      <Image
        src={"/not-found.png"}
        alt="Not found image"
        height={300}
        width={300}
      />
      <h1 className="mt-5 text-center text-xl font-semibold md:text-3xl">
        Oops! We couldn't find that page.
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600 md:text-base">
        The page you're looking for might have been removed or is temporarily
        unavailable.
      </p>

      <button
        onClick={() => window.location.replace("/")}
        className="md:text-md md:text-md mt-10 cursor-pointer rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition-colors ease-in-out hover:bg-violet-400 md:p-5"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFoundUI;
