"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { isHandleAvailable } from "@/lib/actions/user";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

type Availability = "idle" | "invalid" | "checking" | "available" | "taken";

const HANDLE_REGEX = /^[a-z0-9_]{3,20}$/;

const subscribe = () => () => {};

const ClaimHandle = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [serverState, setServerState] = useState<{
    handle: string;
    available: boolean;
  } | null>(null);

  const host = useSyncExternalStore(
    subscribe,
    () => window.location.host,
    () => "bulong.app",
  );

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
    idle: null,
    invalid: "Kailangan: 3–20 characters, letters / numbers / _ lang.",
    checking: "Tinitingnan namin…",
    available: `@${handle} is available!`,
    taken: `@${handle} is taken — try another.`,
  }[availability];

  const statusColor = {
    idle: "",
    invalid: "text-[#ff5e3a]",
    checking: "text-[#1f1c14]/50",
    available: "text-[#22a06b]",
    taken: "text-[#ff5e3a]",
  }[availability];

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          claimHandle();
        }}
        className="flex items-stretch gap-2 sm:gap-3"
      >
        <label htmlFor="handle" className="sr-only">
          Username handle
        </label>

        <div className="flex min-w-0 flex-1 items-center rounded-full border-2 border-[#1f1c14] bg-white py-2.5 pr-4 pl-4 focus-within:ring-4 focus-within:ring-[#a3e635]/50 md:py-2">
          <span
            aria-hidden="true"
            className="shrink-0 text-base font-bold text-[#1f1c14]/40 md:text-lg"
          >
            {host}/@
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
            className="min-w-0 flex-1 bg-transparent pl-1 text-base font-bold placeholder:font-normal placeholder:text-[#1f1c14]/30 focus:outline-none md:text-lg"
          />
        </div>

        <button
          type="submit"
          disabled={availability !== "available"}
          className="shrink-0 cursor-pointer rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-5 py-2.5 text-base font-bold shadow-[3px_3px_0_#1f1c14] transition-all duration-100 hover:-rotate-1 hover:scale-[1.02] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:rotate-0 disabled:hover:scale-100 md:px-6 md:text-lg"
        >
          Claim
        </button>
      </form>

      {statusMessage && (
        <p
          id="handle-status"
          aria-live="polite"
          className={`mt-2 flex items-center justify-center gap-1.5 text-center text-sm font-bold ${statusColor}`}
        >
          {availability === "available" && (
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
          )}
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default ClaimHandle;
