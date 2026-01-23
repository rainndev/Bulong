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
        <div className="md:text-md pointer-events-none absolute top-4 left-4 text-sm text-gray-400 md:top-5 md:left-5">
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
        className="md:text-md h-55 w-full rounded-2xl border-2 border-violet-400 p-3 pl-4 text-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
      />

      {fieldErrors?.content && (
        <p className="mt-1 text-xs font-medium text-red-400 md:text-sm">
          {fieldErrors.content[0]}
        </p>
      )}
    </div>
  );
}
