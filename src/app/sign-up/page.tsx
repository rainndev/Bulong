"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
        <h1 className="text-2xl font-bold">Sign Up</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            required
            className="w-full rounded-lg border border-gray-500 bg-white px-4 py-3 text-violet-950"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-gray-500 bg-white px-4 py-3 text-violet-950"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={8}
            className="w-full rounded-lg border border-gray-500 bg-white px-4 py-3 text-violet-950"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-400 px-4 py-3 font-medium text-white hover:bg-violet-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}
