"use client";

import BrandMark from "@/components/BrandMark";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const LandingPageNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 w-full px-2 py-4 md:px-6">
      <div className="flex w-full items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 cursor-pointer items-center gap-2 md:gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark size={32} className="shrink-0 md:hidden" />
          <BrandMark size={40} className="hidden shrink-0 md:block" />
          <div className="min-w-0">
            <h1 className="text-xl font-bold md:text-3xl">Bulong</h1>
            <p className="-mt-0.5 hidden text-xs font-bold text-[#1f1c14]/60 md:block md:text-sm">
              your feedback companion
            </p>
          </div>
        </Link>

        {/* Desktop auth actions */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <Link
            href="/sign-in"
            className="cursor-pointer text-lg font-bold text-nowrap hover:text-[#4d7c0f]"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="-rotate-1 cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-5 py-2 font-bold text-nowrap shadow-[3px_3px_0_#1f1c14] transition-transform duration-100 hover:scale-[1.03] hover:rotate-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Get started →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex size-11 shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-[#1f1c14] bg-white shadow-[3px_3px_0_#1f1c14] transition-transform duration-100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none md:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-auth-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-[3px] w-5 rounded bg-[#1f1c14] transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          ></span>
          <span
            className={`my-[3px] block h-[3px] w-5 rounded bg-[#1f1c14] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block h-[3px] w-5 rounded bg-[#1f1c14] transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile expandable auth menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div
              id="mobile-auth-menu"
              className="mt-4 flex flex-col gap-3 rounded-lg border-2 border-[#1f1c14] bg-white p-4 shadow-[6px_6px_0_#1f1c14]"
            >
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="w-full cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#fdfaf2] px-4 py-2.5 text-center text-base font-bold transition-colors hover:bg-[#ecfccb]"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="w-full -rotate-1 cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-4 py-2.5 text-center text-base font-bold shadow-[4px_4px_0_#1f1c14] transition-transform duration-100 hover:rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Get started →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingPageNavBar;
