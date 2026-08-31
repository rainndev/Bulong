"use client";

import BrandMark from "@/components/BrandMark";
import ContentInput from "@/components/createPost/ContentInput";
import { useRandomTitle } from "@/hooks/useRandomTitle";
import { findProfanity } from "@/lib/profanity";
import { PostFormSchema } from "@/lib/schema";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PROFANITY_MESSAGE =
  "Please rewrite your message without offensive words.";

export default function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isSuccess, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [hasProfanity, setHasProfanity] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  const params = useParams();
  const raw = params.userName as string;
  const username = decodeURIComponent(raw);
  const cleanUsername = username.startsWith("@")
    ? username.substring(1)
    : username;

  const randomTitle = useRandomTitle(username);

  // Live client-side profanity check on every keystroke
  const handleFormInput = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string) ?? "";
    const content = (formData.get("content") as string) ?? "";

    setHasProfanity(findProfanity(title, content));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFieldErrors({});
    setFormError(null);

    const formData = new FormData(e.currentTarget);

    const rawData = {
      username: cleanUsername,
      title: formData.get("title"),
      content: formData.get("content"),
    };

    // Block submission client-side before hitting the API
    if (findProfanity(String(rawData.title), String(rawData.content))) {
      setHasProfanity(true);
      setFormError(PROFANITY_MESSAGE);
      setIsLoading(false);
      return;
    }

    const validatedFields = PostFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
      setFieldErrors(validatedFields.error.flatten().fieldErrors);
      setIsLoading(false);
      return;
    }

    const res = await fetch("/api/submit-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: cleanUsername,
        title: formData.get("title"),
        content: formData.get("content"),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setResetCounter((prev) => prev + 1);
    } else {
      setSuccess(false);
    }

    if (!res.ok && data.errors) {
      setFieldErrors(data.errors);
      setIsLoading(false);
      return;
    }

    if (!res.ok && data.error) {
      setFormError(data.error);
      setIsLoading(false);
      return;
    }

    if (formRef.current) {
      formRef.current.reset();
    }

    // Programmatic reset doesn't fire onInput — clear the warning manually
    setHasProfanity(false);

    setIsLoading(false);
  };
  return (
    <div className="sketch-grid relative flex h-dvh w-full flex-col items-center justify-center overflow-y-auto bg-[#fdfaf2] p-5 md:p-10">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onInput={handleFormInput}
        className="w-full max-w-3xl"
      >
        <div className="mb-5 -rotate-1 rounded-xl border-2 border-[#1f1c14] bg-white p-8 text-center shadow-[8px_8px_0_#1f1c14] md:p-10">
          <div className="mb-4 flex justify-center">
            <BrandMark size={56} />
          </div>
          <p className="text-md w-full md:text-lg lg:text-xl">{randomTitle}</p>
        </div>

        <div className="mb-3">
          <input
            name="title"
            placeholder="Title of your message"
            className="md:text-md w-full rounded-xl border-2 border-[#1f1c14] bg-white p-3 pl-4 text-sm font-bold transition-all duration-200 placeholder:font-normal placeholder:text-[#1f1c14]/30 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none md:p-4"
          />
          {/* Render Title Errors */}
          {fieldErrors.title && (
            <p className="mt-1 text-xs font-bold text-[#ff5e3a] md:text-sm">
              {fieldErrors.title[0]}
            </p>
          )}
        </div>

        <ContentInput fieldErrors={fieldErrors} resetSignal={resetCounter} />

        {hasProfanity && (
          <p className="mt-1 text-xs font-bold text-[#ff5e3a] md:text-sm">
            {PROFANITY_MESSAGE}
          </p>
        )}

        {formError && !hasProfanity && (
          <p className="mt-1 text-xs font-bold text-[#ff5e3a] md:text-sm">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={hasProfanity || isLoading}
          className="font-fredoka mt-3 flex w-full cursor-pointer justify-center rounded-full border-2 border-[#1f1c14] bg-[#1f1c14] p-4 text-xs font-medium text-[#fdfaf2] transition-transform duration-100 hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:rotate-0 md:text-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2 md:gap-3">
              <AiOutlineLoading3Quarters className="animate-spin" />
              <p>Submitting...</p>
            </span>
          ) : isSuccess ? (
            "Message Submitted!"
          ) : (
            "Submit Message"
          )}
        </button>
      </form>
    </div>
  );
}
