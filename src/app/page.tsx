"use client";

import About from "@/components/About";
import HeroPage from "@/components/HeroPage";
import LandingPageNavBar from "@/components/LandingPageNavBar";
import LenisPageWrapper from "@/components/LenisPageWrapper";

export default function Home() {
  return (
    <LenisPageWrapper>
      <main className="sketch-grid flex h-full flex-col items-center gap-10 overflow-auto bg-[#fdfaf2] p-4 text-[#1f1c14] md:gap-16 md:p-6 lg:p-10">
        <LandingPageNavBar />
        <HeroPage />
        <About />
      </main>
    </LenisPageWrapper>
  );
}
