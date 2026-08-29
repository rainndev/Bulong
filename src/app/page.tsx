"use client";

import HeroPage from "@/components/HeroPage";
import LandingPageNavBar from "@/components/LandingPageNavBar";
import LenisPageWrapper from "@/components/LenisPageWrapper";

export default function Home() {
  return (
    <LenisPageWrapper>
      <main className="sketch-grid flex h-full flex-col items-center overflow-auto bg-[#fdfaf2] p-4 text-[#1f1c14] md:p-6 lg:p-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          <LandingPageNavBar />
          <HeroPage />
        </div>
      </main>
    </LenisPageWrapper>
  );
}
