"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { isHandleAvailable } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Availability = "idle" | "invalid" | "checking" | "available" | "taken";

const HANDLE_REGEX = /^[a-z0-9_]{3,20}$/;

const ClaimHandle = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [serverState, setServerState] = useState<{
    handle: string;
    available: boolean;
  } | null>(null);

  const debouncedHandle = useDebounce(handle, 500);

  useEffect(() => {
    if (!debouncedHandle || !HANDLE_REGEX.test(debouncedHandle)) return;

    let isCurrent = true;

    isHandleAvailable(debouncedHandle).then((available) => {
      if (!isCurrent) return;
      setServerState({ handle: debouncedHandle, available });
    });

    return () => {
      isCurrent = false;
    };
  }, [debouncedHandle]);

  const availability: Availability = (() => {
    if (!handle) return "idle";
    if (!HANDLE_REGEX.test(handle)) return "invalid";
    if (serverState?.handle !== handle) return "checking";
    return serverState.available ? "available" : "taken";
  })();

  const claimHandle = () => {
    if (availability !== "available") return;
    router.push(`/sign-up?handle=${encodeURIComponent(handle)}`);
  };

  const statusMessage = {
    idle: "3–20 characters — letters, numbers, at underscore.",
    invalid: "Kailangan: 3–20 characters, letters / numbers / _ lang.",
    checking: "Tinitingnan namin…",
    available: `@${handle} is available!`,
    taken: `@${handle} is taken — try another.`,
  }[availability];

  const statusColor = {
    idle: "text-[#1f1c14]/50",
    invalid: "text-[#ff5e3a]",
    checking: "text-[#1f1c14]/50",
    available: "text-[#22a06b]",
    taken: "text-[#ff5e3a]",
  }[availability];

  return (
    <div className="w-full max-w-md -rotate-2 rounded-lg border-2 border-[#1f1c14] bg-white p-5 shadow-[8px_8px_0_#1f1c14] md:p-6">
      <h2 className="text-2xl font-bold">Claim your handle</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          claimHandle();
        }}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="handle" className="sr-only">
          Username handle
        </label>

        <div className="relative flex-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-lg font-bold text-[#1f1c14]/40"
          >
            @
          </span>
          <input
            id="handle"
            name="handle"
            type="text"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={handle}
            onChange={(event) =>
              setHandle(
                event.target.value
                  .replace(/[^a-zA-Z0-9_]/g, "")
                  .toLowerCase(),
              )
            }
            placeholder="username"
            aria-describedby="handle-status"
            aria-invalid={availability === "invalid" || availability === "taken"}
            className="w-full rounded-lg border-2 border-[#1f1c14] bg-[#fdfaf2] py-2.5 pr-3 pl-8 text-lg font-bold placeholder:font-normal placeholder:text-[#1f1c14]/30 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={availability !== "available"}
          className="cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#1f1c14] px-6 py-2.5 text-lg font-bold text-[#fdfaf2] transition-transform duration-100 hover:-rotate-1 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:rotate-0 disabled:hover:scale-100"
        >
          Claim →
        </button>
      </form>

      <p
        id="handle-status"
        aria-live="polite"
        className={`mt-3 flex items-center gap-1.5 text-sm font-bold ${statusColor}`}
      >
        {availability === "available" && (
          <svg
            width="16"
            height="16"
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
        )}
        {statusMessage}
      </p>
    </div>
  );
};

export default ClaimHandle;
