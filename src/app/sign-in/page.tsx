"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="w-full h-full flex justify-center items-center   ">
      <div className="max-w-md flex justify-center flex-col mx-auto p-6 space-y-4 text-black ">
        <h1 className="text-2xl font-bold">Sign In</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-lg text-violet-950 bg-white border border-gray-500 px-4 py-3"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-lg text-violet-950 bg-white border border-gray-500 px-4 py-3"
          />
          <button
            type="submit"
            className="w-full bg-violet-400 text-white font-medium rounded-lg px-4 py-3 hover:bg-violet-300 "
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
