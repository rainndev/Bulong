"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, useSession } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data } = useSession();

  useEffect(() => {
    if (!!data?.user) {
      router.push("/dashboard");
    }
  }, [router, data]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
        return;
      }

      setError(res.error.message || "Something went wrong.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto max-w-md space-y-4 p-6 text-black">
        <h1 className="text-2xl font-semibold">Sign Up</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            required
            className="md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
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
            minLength={8}
            className="md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          <button
            type="submit"
            className="md:text-md w-full cursor-pointer rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition-colors ease-in-out hover:bg-violet-400 md:p-5"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
