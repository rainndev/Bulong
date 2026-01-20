"use client";

import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SaveSettingsButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="md:text-md mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-70 md:p-5"
    >
      {pending && <AiOutlineLoading3Quarters className="animate-spin" />}
      {pending ? "Saving..." : "Save Settings"}
    </button>
  );
}
