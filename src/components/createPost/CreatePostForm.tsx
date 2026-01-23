"use client";

import ContentInput from "@/components/createPost/ContentInput";
import { useRandomTitle } from "@/hooks/useRandomTitle";
import { PostFormSchema } from "@/lib/schema";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isSuccess, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  const params = useParams();
  const raw = params.userName as string;
  const username = decodeURIComponent(raw);
  const cleanUsername = username.startsWith("@")
    ? username.substring(1)
    : username;

  const randomTitle = useRandomTitle(username);

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

    setIsLoading(false);
  };
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-y-auto p-5 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] md:p-10">
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]" />

      <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="mb-5 flex-1 rounded-4xl bg-linear-to-r from-purple-600 to-indigo-600 p-15 text-white ring-5 ring-violet-300 drop-shadow-2xl drop-shadow-purple-600/10 md:p-20">
          <div className="mb-5 flex items-center justify-center">
            <div className="w-fit rounded-full bg-violet-200 p-4 md:p-6">
              <Image
                src={"/bulong-logo.png"}
                alt="Bulong Logo"
                width={50}
                height={50}
                className="rounded-full bg-violet-200 object-contain"
              />
            </div>
          </div>
          <p className="text-md w-full text-center md:text-lg lg:text-xl">
            {randomTitle}
          </p>
        </div>

        <div className="mb-3">
          <input
            name="title"
            placeholder="Title of your message"
            className="md:text-md w-full rounded-2xl border-2 border-violet-400 p-3 pl-4 text-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          {/* Render Title Errors */}
          {fieldErrors.title && (
            <p className="mt-1 text-xs font-medium text-red-400 md:text-sm">
              {fieldErrors.title[0]}
            </p>
          )}
        </div>

        <ContentInput fieldErrors={fieldErrors} resetSignal={resetCounter} />

        {formError && (
          <p className="mt-1 text-xs font-medium text-red-400 md:text-sm">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="ring-offset mt-3 w-full cursor-pointer rounded-full bg-linear-to-r from-purple-600 to-indigo-600 p-4 text-xs font-medium text-violet-50 antialiased transition-all ease-in-out hover:from-indigo-600 hover:to-purple-600 hover:ring hover:ring-purple-600 hover:ring-offset-3 md:text-lg"
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
