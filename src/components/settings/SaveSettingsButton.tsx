"use client";

import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SaveSettingsButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-4 py-3.5 text-sm font-bold text-[#1f1c14] shadow-[4px_4px_0_#1f1c14] transition-all duration-100 hover:-rotate-1 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <AiOutlineLoading3Quarters className="animate-spin" />}
      {pending ? "Saving..." : "Save Settings"}
    </button>
  );
}
