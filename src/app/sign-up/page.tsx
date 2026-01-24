"use client";

import { signUp } from "@/lib/auth/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignUpPage() {
  const router = useRouter();
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
    <main className="relative flex h-screen w-full items-center justify-center p-3 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] md:p-10">
      <div className="shadow-5xl mx-auto flex max-w-md flex-col justify-center space-y-2 rounded-3xl p-10 text-[#242731] ring-5 shadow-violet-100 ring-violet-100">
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />
        <Image
          src={"/bulong-peeking.png"}
          alt="Sign In Illustration"
          width={200}
          height={100}
          className="mx-auto my-4"
        />

        <h1 className="text-[clamp(1.5rem,2vw,1.875rem)] font-semibold">
          Sign Up
        </h1>

        <p className="mb-8 text-[clamp(0.875rem,2vw,1rem)] text-gray-600">
          Create your account to start receiving valuable feedback from your
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            required
            className="md:text-md w-full rounded-2xl border-2 border-violet-400 p-3 pl-4 text-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="md:text-md w-full rounded-2xl border-2 border-violet-400 p-3 pl-4 text-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={8}
            className="md:text-md w-full rounded-2xl border-2 border-violet-400 p-3 pl-4 text-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />

          <p>
            <Link
              href="/sign-in"
              className="text-[clamp(0.75rem,2vw,0.875rem)] text-gray-600"
            >
              Already have an account?{" "}
              <span className="font-semibold text-violet-500 hover:underline">
                Sign In
              </span>
            </Link>
          </p>

          <button
            type="submit"
            className="md:text-md flex w-full cursor-pointer justify-center rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition-all ease-in-out hover:bg-violet-400 md:p-5"
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
    </main>
  );
}
