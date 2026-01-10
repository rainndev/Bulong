"use client";

import About from "@/components/About";
import HeroPage from "@/components/HeroPage";
import LandingPageNavBar from "@/components/LandingPageNavBar";
import LenisPageWrapper from "@/components/LenisPageWrapper";

export default function Home() {
  return (
    <LenisPageWrapper>
      <main className="flex h-full flex-col items-center gap-6 overflow-auto bg-violet-50 p-4 text-white md:gap-10 md:p-5 lg:p-10">
        <LandingPageNavBar />
        <HeroPage />
        <About />
      </main>
    </LenisPageWrapper>
  );
}
