"use client";

import BrandMark from "@/components/BrandMark";
import { sendVerificationEmail } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [resent, setResent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    setIsSending(true);
    await sendVerificationEmail({ email });
    setResent(true);
    setIsSending(false);
  };

  return (
    <main className="sketch-grid flex min-h-dvh w-full flex-col items-center justify-center bg-[#fdfaf2] p-4 text-[#1f1c14] md:p-10">
      <div className="w-full max-w-md -rotate-1 rounded-xl border-2 border-[#1f1c14] bg-white p-8 text-center shadow-[8px_8px_0_#1f1c14] md:p-10">
        <div className="mb-5 flex justify-center">
          <BrandMark size={48} />
        </div>

        <h1 className="font-kalam text-2xl font-bold">
          Check your email!
        </h1>
        <p className="font-kalam mt-2 text-sm font-bold text-[#1f1c14]/60">
          Nagpadala kami ng verification link sa{" "}
          <span className="text-[#1f1c14]">{email ?? "iyong email"}</span>.
          I-click ang link para ma-verify ang account mo.
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

        {resent ? (
          <p className="font-kalam text-sm font-bold text-[#22a06b]">
            Resend na! Tignan ang inbox mo ulit.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleResend}
              disabled={isSending || !email}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#1f1c14] transition-all duration-100 hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSending && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
              {isSending ? "Sending..." : "Resend verification email"}
            </button>

            <Link
              href="/sign-in"
              className="font-kalam text-sm font-bold text-[#1f1c14]/50 underline decoration-[#65a30d] decoration-2 underline-offset-4 hover:text-[#1f1c14]"
            >
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="sketch-grid flex min-h-dvh items-center justify-center bg-[#fdfaf2]">
          <div className="flex items-center gap-2 font-kalam text-lg font-bold text-[#1f1c14]">
            <AiOutlineLoading3Quarters className="animate-spin" />
            loading...
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
