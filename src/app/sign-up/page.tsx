"use client";

import { signUp } from "@/lib/auth/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const inputClassName =
  "md:text-md w-full rounded-lg border-2 border-[#1f1c14] bg-[#fdfaf2] p-3 pl-4 text-sm font-bold placeholder:font-normal placeholder:text-[#1f1c14]/30 transition-all duration-200 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none md:p-4";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimedHandle = searchParams.get("handle");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res?.error) {
      if (
        res.error.code === "FAILED_TO_CREATE_USER" ||
        res.error.message?.toLowerCase().includes("unique")
      ) {
        setError("Username already exists. Please choose another.");
        setIsLoading(false);
        return;
      }

      setError(res.error.message || "Something went wrong.");

      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  // Clear loading state on unmount
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-2 rounded-lg border-2 border-[#1f1c14] bg-white p-8 shadow-[8px_8px_0_#1f1c14] md:p-10">
      <Image
        src={"/bulong-peeking.png"}
        alt="Sign Up Illustration"
        width={200}
        height={100}
        className="mx-auto my-4"
      />

      <h1 className="text-[clamp(1.5rem,2vw,1.875rem)] font-bold">Sign Up</h1>
      <p className="mb-6 text-[clamp(0.875rem,2vw,1rem)] text-[#1f1c14]/60">
        Create your account to start receiving valuable feedback.
      </p>

      {error && <p className="font-bold text-[#ff5e3a]">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="username"
            placeholder="Username"
            defaultValue={claimedHandle ?? ""}
            readOnly={!!claimedHandle}
            required
            aria-label="Username"
            className={`${inputClassName} ${claimedHandle ? "cursor-not-allowed bg-[#a3e635]/15" : ""}`}
          />
          {claimedHandle && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-[#22a06b]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="shrink-0"
              >
                <path
                  d="M 3 10 L 8 15 L 17 4"
                  stroke="#22a06b"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Handle locked in from your claim: @{claimedHandle}
            </p>
          )}
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className={inputClassName}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className={inputClassName}
        />

        <p>
          <Link
            href="/sign-in"
            className="text-[clamp(0.75rem,2vw,0.875rem)] text-[#1f1c14]/60"
          >
            Already have an account?{" "}
            <span className="font-bold text-[#4d7c0f] hover:underline">
              Sign In
            </span>
          </Link>
        </p>

        <button
          type="submit"
          className="md:text-md flex w-full -rotate-1 cursor-pointer justify-center rounded-full border-2 border-[#1f1c14] bg-[#1f1c14] px-4 py-3 text-sm font-bold text-[#fdfaf2] shadow-[4px_4px_0_#a3e635] transition-transform duration-100 hover:rotate-0 hover:scale-[1.01] active:translate-x-1 active:translate-y-1 active:shadow-none md:py-4"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              <p>Signing Up...</p>
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <main className="sketch-grid flex h-screen w-full items-center justify-center bg-[#fdfaf2] p-3 md:p-10">
      <Suspense
        fallback={
          <div
            className="flex items-center gap-2 text-lg font-bold"
            aria-busy="true"
          >
            <AiOutlineLoading3Quarters className="animate-spin" />
            Loading sign up…
          </div>
        }
      >
        <SignUpForm />
      </Suspense>
    </main>
  );
}
