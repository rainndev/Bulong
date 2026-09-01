"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordInputProps = {
  name?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
  className?: string;
  ariaLabel?: string;
};

/** Password field with a show/hide eye toggle in the sketch theme. */
const PasswordInput = ({
  name = "password",
  placeholder = "Password",
  required = true,
  minLength,
  autoComplete = "current-password",
  className = "",
  ariaLabel,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        aria-label={ariaLabel ?? placeholder}
        className={`${className} pr-12`}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        aria-pressed={showPassword}
        className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-lg text-[#1f1c14]/40 transition-colors hover:text-[#1f1c14] focus-visible:text-[#1f1c14] focus-visible:outline-none"
        tabIndex={0}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
