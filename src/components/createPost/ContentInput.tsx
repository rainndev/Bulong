"use client";

import { contentInput } from "@/constants/input-placeholder";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

type ContentInputProps = {
  fieldErrors: Record<string, string[]>;
  resetSignal: number;
};
export default function ContentInput({
  fieldErrors,
  resetSignal,
}: ContentInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const showPlaceholder = !value && !focused;

  useEffect(() => {
    setValue("");
    setFocused(false);
  }, [resetSignal]);

  return (
    <div className="relative">
      {showPlaceholder && (
        <div className="md:text-md pointer-events-none absolute top-4 left-4 text-sm text-[#1f1c14]/40 md:top-5 md:left-5">
          <TypeAnimation
            sequence={contentInput}
            speed={50}
            repeat={Infinity}
            omitDeletionAnimation
          />
        </div>
      )}

      <textarea
        name="content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="md:text-md h-55 w-full rounded-xl border-2 border-[#1f1c14] bg-white p-3 pl-4 text-sm transition-all duration-200 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none md:p-5"
      />

      {fieldErrors?.content && (
        <p className="mt-1 text-xs font-bold text-[#ff5e3a] md:text-sm">
          {fieldErrors.content[0]}
        </p>
      )}
    </div>
  );
}
