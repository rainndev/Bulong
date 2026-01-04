"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingPageNavBar = () => {
  const router = useRouter();

  return (
    <div className="w-full rounded-4xl bg-violet-400/10 px-10 py-5 text-[#242731] backdrop-blur-lg">
      <ul className="flex items-center justify-between">
        <li className="flex">
          <Image
            src={"/logo-transparent-1.png"}
            alt="Bulong Logo"
            width={60}
            height={60}
          />
          <div>
            <h1 className="text-4xl font-bold">Bulong</h1>
            <p className="text-sm">Your trusted feedback companion</p>
          </div>
        </li>

        <div className="flex gap-10 text-lg font-medium">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </div>

        <li className="flex gap-5">
          <button
            onClick={() => router.push("/sign-in")}
            className="md:text-md w-full cursor-pointer rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-nowrap text-white transition-colors ease-in-out hover:bg-violet-400 md:p-4 md:px-10"
          >
            Log in
          </button>
          <button
            onClick={() => router.push("/sign-up")}
            className="cursor-pointer text-nowrap"
          >
            Get Started
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LandingPageNavBar;
