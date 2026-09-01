"use client";

import { signIn } from "@/lib/auth/auth-client";
import PasswordInput from "@/components/PasswordInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const inputClassName =
  "md:text-md w-full rounded-lg border-2 border-[#1f1c14] bg-[#fdfaf2] p-3 pl-4 text-sm font-bold placeholder:font-normal placeholder:text-[#1f1c14]/30 transition-all duration-200 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none md:p-4";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setIsLoading(false);

      if (
        res.error.code === "INVALID_EMAIL_OR_PASSWORD" ||
        res.error.code === "EMAIL_NOT_VERIFIED"
      ) {
        setError(
          res.error.code === "EMAIL_NOT_VERIFIED"
            ? "Verify your email first — check your inbox for the link."
            : "Wrong email or password.",
        );
        return;
      }

      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  // Clear loading state on unmount
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <main className="sketch-grid font-fredoka flex h-screen w-full items-center justify-center bg-[#fdfaf2] p-3 md:p-10">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-2 rounded-xl border-2 border-[#1f1c14] bg-white p-8 shadow-[8px_8px_0_#1f1c14] md:p-10">
        <h1 className="text-[clamp(1.5rem,2vw,1.875rem)] font-bold">Sign In</h1>
        <p className="mb-6 text-[clamp(0.875rem,2vw,1rem)] text-[#1f1c14]/60">
          Welcome back! Please enter your credentials to access your account.
        </p>

        {error && (
          <div className="rounded-lg border-2 border-[#ff5e3a] bg-[#ff5e3a]/10 px-4 py-3">
            <p className="text-sm font-bold text-[#ff5e3a]">{error}</p>
            {error.toLowerCase().includes("verify") && (
              <Link
                href={`/verify-email?email=${encodeURIComponent(email)}`}
                className="mt-1 inline-block text-xs font-bold text-[#1f1c14]/60 underline decoration-[#65a30d] decoration-2 underline-offset-4 hover:text-[#1f1c14]"
              >
                Resend verification email →
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
          />
          <PasswordInput className={inputClassName} />

          <p>
            <Link
              href="/sign-up"
              className="text-[clamp(0.75rem,2vw,0.875rem)] text-[#1f1c14]/60"
            >
              Don&apos;t have an account?{" "}
              <span className="font-bold text-[#4d7c0f] hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
          <button
            type="submit"
            className="md:text-md flex w-full -rotate-1 cursor-pointer justify-center rounded-full border-2 border-[#1f1c14] bg-[#1f1c14] px-4 py-3 text-sm font-semibold text-[#fdfaf2] shadow-[4px_4px_0_#a3e635] transition-transform duration-100 hover:scale-[1.01] hover:rotate-0 active:translate-x-1 active:translate-y-1 active:shadow-none md:py-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
                <p>Signing In...</p>
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
