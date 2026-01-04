"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "@/lib/auth-client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
      setIsLoading(false);
    }
  }

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col justify-center space-y-4 p-6 text-black">
        <h1 className="text-2xl font-semibold">Sign In</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          <button
            type="submit"
            className="md:text-md flex w-full cursor-pointer justify-center rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition-colors ease-in-out hover:bg-violet-400 md:p-5"
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
