"use client";

import HeroPage from "@/components/HeroPage";
import LandingPageNavBar from "@/components/LandingPageNavBar";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center gap-10 overflow-auto bg-violet-50 p-10 text-white">
      <LandingPageNavBar />
      <HeroPage />
    </main>
  );
}
