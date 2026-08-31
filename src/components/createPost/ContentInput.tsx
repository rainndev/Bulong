"use client";

import Dice3D from "@/components/createPost/Dice3D";
import { contentInput } from "@/constants/input-placeholder";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

type ContentInputProps = {
  fieldErrors: Record<string, string[]>;
  resetSignal: number;
};
/** Predefined messages the dice can roll (shared with the placeholder pool) */
const diceMessages: string[] = contentInput.filter(
  (entry): entry is string => typeof entry === "string",
);

export default function ContentInput({
  fieldErrors,
  resetSignal,
}: ContentInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [rollTrigger, setRollTrigger] = useState(0);

  const [lastReset, setLastReset] = useState(resetSignal);

  const showPlaceholder = !value && !focused;

  // Clear after a successful submit (resetSignal increments)
  if (resetSignal !== lastReset) {
    setLastReset(resetSignal);
    setValue("");
    setFocused(false);
  }

  const rollDice = () => {
    const message =
      diceMessages[Math.floor(Math.random() * diceMessages.length)];

    setRollTrigger((prev) => prev + 1);
    setValue(message);
  };

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
        className="md:text-md h-55 w-full rounded-xl border-2 border-[#1f1c14] bg-white p-3 pl-4 pb-16 text-sm transition-all duration-200 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none md:p-5 md:pb-16"
      />

      {/* 3D dice — roll for a random message */}
      <div className="absolute right-3 bottom-3 md:right-4 md:bottom-4">
        <Dice3D onRoll={rollDice} rollTrigger={rollTrigger} />
      </div>

      {fieldErrors?.content && (
        <p className="mt-1 text-xs font-bold text-[#ff5e3a] md:text-sm">
          {fieldErrors.content[0]}
        </p>
      )}
    </div>
  );
}
