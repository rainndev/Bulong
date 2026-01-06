"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LandingPageNavBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full rounded-2xl border border-violet-200/50 bg-violet-400/10 px-4 py-3 text-[#242731] md:rounded-3xl md:px-10 md:py-5 lg:rounded-4xl">
      <div className="flex items-center justify-between gap-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={"/bulong-logo.png"}
            alt="Bulong Logo"
            width={50}
            height={50}
            className="rounded-full bg-violet-200 object-contain p-2 md:h-12 md:w-12 lg:h-16 lg:w-16"
          />
          <div>
            <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">
              Bulong
            </h1>
            <p className="text-xs md:text-sm">
              Your trusted feedback companion
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-10 text-lg font-medium lg:flex">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-5 lg:flex">
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
        </div>

        {/* Hamburger Icon */}
        <button
          className="flex flex-col items-center justify-center lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-1 w-6 rounded bg-[#242731] transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          ></span>
          <span
            className={`my-1 block h-1 w-6 rounded bg-[#242731] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block h-1 w-6 rounded bg-[#242731] transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 flex flex-col gap-4 px-2 py-5 lg:hidden"
          >
            <ul className="text-md flex flex-col gap-4 font-medium">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Contact</li>
            </ul>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/sign-in");
                }}
                className="w-full cursor-pointer rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-400"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/sign-up");
                }}
                className="cursor-pointer text-sm text-nowrap"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingPageNavBar;
