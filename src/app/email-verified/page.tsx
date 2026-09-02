"use client";

import BrandMark from "@/components/BrandMark";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmailVerifiedContent() {
  const searchParams = useSearchParams();
  const isError = searchParams.has("error");

  return (
    <main className="sketch-grid flex min-h-dvh w-full flex-col items-center justify-center bg-[#fdfaf2] p-4 text-[#1f1c14] md:p-10">
      <div
        className={`w-full max-w-md -rotate-1 rounded-xl border-2 border-[#1f1c14] bg-white p-8 text-center shadow-[8px_8px_0_#1f1c14] md:p-10`}
      >
        <div className="mb-5 flex justify-center">
          <BrandMark size={48} />
        </div>

        {isError ? (
          <>
            <h1 className="font-kalam text-2xl font-bold">
              Ay! May problema sa link.
            </h1>
            <p className="font-kalam mt-2 text-sm font-bold text-[#1f1c14]/60">
              Baka expired na ang link o nagamit na ito. Try mo ulit mag-sign in
              — kung hindi pa verified ang email mo, pwede kang mag-request ng
              bagong link.
            </p>

            <div className="my-6">
              <svg
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
                className="h-4 w-full"
              >
                <path
                  d="M 4 10 Q 50 2, 100 8 T 200 8 T 296 10"
                  fill="none"
                  stroke="#65a30d"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <Link
              href="/sign-in"
              className="inline-block rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-6 py-3 text-sm font-bold shadow-[4px_4px_0_#1f1c14] transition-all duration-100 hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Back to sign in →
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-kalam text-2xl font-bold">Email verified!</h1>
            <p className="font-kalam mt-2 text-sm font-bold text-[#1f1c14]/60">
              Salamat! Verified na ang email mo — kumpleto na ang account mo.
            </p>

            <Link
              href="/sign-in"
              className="mt-2 inline-block rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-6 py-3 text-sm font-bold shadow-[4px_4px_0_#1f1c14] transition-all duration-100 hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Sign in ka na →
            </Link>
          </>
        )}
      </div>

      <p className="font-kalam mt-6 text-xs font-bold text-[#1f1c14]/40">
        anonymous na mensahe, totoong opinyon
      </p>
    </main>
  );
}

export default function EmailVerifiedPage() {
  return (
    <Suspense
      fallback={
        <div className="sketch-grid flex min-h-dvh items-center justify-center bg-[#fdfaf2]">
          <div className="font-kalam flex items-center gap-2 text-lg font-bold text-[#1f1c14]">
            loading...
          </div>
        </div>
      }
    >
      <EmailVerifiedContent />
    </Suspense>
  );
}
