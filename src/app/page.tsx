"use client";

import Footer from "@/components/landing/Footer";
import HeroPage from "@/components/HeroPage";
import LandingPageNavBar from "@/components/LandingPageNavBar";
import PageLoadingGate from "@/components/landing/PageLoadingGate";
import LenisPageWrapper from "@/components/LenisPageWrapper";

export default function Home() {
  return (
    <LenisPageWrapper>
      <PageLoadingGate />
      <main className="sketch-grid flex min-h-dvh w-full flex-col items-center bg-[#fdfaf2] text-[#1f1c14]">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center p-4 md:p-6 lg:p-10">
          <LandingPageNavBar />
          <HeroPage />
        </div>
        <Footer />
      </main>
    </LenisPageWrapper>
  );
}
