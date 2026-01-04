"use client";

import HeroPage from "@/components/HeroPage";
import LandingPageNavBar from "@/components/LandingPageNavBar";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center gap-6 overflow-auto bg-violet-50 p-4 text-white md:gap-10 md:p-5 lg:p-10">
      <LandingPageNavBar />
      <HeroPage />
    </main>
  );
}
