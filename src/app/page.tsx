"use client";

import HeroPage from "@/components/HeroPage";
import LandingPageNavBar from "@/components/LandingPageNavBar";
import PageLoadingGate from "@/components/landing/PageLoadingGate";
import LenisPageWrapper from "@/components/LenisPageWrapper";

export default function Home() {
  return (
    <LenisPageWrapper>
      <PageLoadingGate />
      <main className="sketch-grid flex min-h-dvh w-full flex-col items-center bg-[#fdfaf2] p-4 text-[#1f1c14] md:p-6 lg:p-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          <LandingPageNavBar />
          <HeroPage />
        </div>
      </main>
    </LenisPageWrapper>
  );
}
