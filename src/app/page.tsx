"use client";

import LandingPageNavBar from "@/components/LandingPageNavBar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 bg-violet-50 p-10 text-white">
      <LandingPageNavBar />

      <div className="flex gap-4"></div>
    </main>
  );
}
