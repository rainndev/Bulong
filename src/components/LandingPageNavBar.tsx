"use client";

import BrandMark from "@/components/BrandMark";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const LandingPageNavBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 w-full px-2 py-4 text-lg md:px-6 md:text-xl">
      <div className="flex items-center justify-between gap-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark size={40} className="shrink-0" />
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Bulong.</h1>
            <p className="-mt-1 text-xs font-bold text-[#1f1c14]/60 md:text-sm">
              your feedback companion
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 font-bold lg:flex">
          {navigationLinks.map((link) => (
            <li
              key={link.name}
              className="cursor-pointer transition-colors hover:text-[#4d7c0f]"
              onClick={() => {
                router.push(link.href);
                setMenuOpen(false);
              }}
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => router.push("/sign-in")}
            className="cursor-pointer font-bold text-nowrap hover:text-[#4d7c0f]"
          >
            Log in
          </button>
          <button
            onClick={() => router.push("/sign-up")}
            className="-rotate-1 cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-5 py-2 font-bold text-nowrap shadow-[3px_3px_0_#1f1c14] transition-transform duration-100 hover:rotate-1 hover:scale-[1.03] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Get started →
          </button>
        </div>

        {/* Hamburger Icon */}
        <button
          className="flex flex-col items-center justify-center lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-1 w-6 rounded bg-[#1f1c14] transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          ></span>
          <span
            className={`my-1 block h-1 w-6 rounded bg-[#1f1c14] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block h-1 w-6 rounded bg-[#1f1c14] transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
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
            className="mt-4 flex flex-col gap-4 rounded-lg border-2 border-[#1f1c14] bg-white p-5 shadow-[6px_6px_0_#1f1c14] lg:hidden"
          >
            <ul className="flex flex-col gap-4 font-bold">
              {navigationLinks.map((link) => (
                <li
                  key={link.name}
                  className="cursor-pointer transition-colors hover:text-[#4d7c0f]"
                  onClick={() => {
                    router.push(link.href);
                    setMenuOpen(false);
                  }}
                >
                  {link.name}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/sign-in");
                }}
                className="w-full cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#fdfaf2] px-4 py-2.5 font-bold"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/sign-up");
                }}
                className="-rotate-1 w-full cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-4 py-2.5 font-bold shadow-[3px_3px_0_#1f1c14]"
              >
                Get started →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingPageNavBar;
