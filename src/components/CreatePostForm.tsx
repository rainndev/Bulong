"use client";

import { createPost } from "@/lib/actions/post";
import { useActionState, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRandomTitle } from "@/hooks/useRandomTitle";
import { FaUser } from "react-icons/fa";

type anonymouseInfoType = {
  device: string;
  os: string;
  browser: string;
  country: string;
  region: string;
};

export default function CreatePostForm({ userId }: { userId: string }) {
  const [info, setInfo] = useState<anonymouseInfoType>({
    device: "Unknown",
    os: "Unknown",
    browser: "Unknown",
    country: "Unknown",
    region: "Unknown",
  });
  const [state, formAction] = useActionState(createPost, null);
  const params = useParams();
  const raw = params.userName as string;
  const username = decodeURIComponent(raw);
  const randomTitle = useRandomTitle(username);

  useEffect(() => {
    fetch("/api/anonymous-info")
      .then((res) => res.json())
      .then(setInfo);
  }, []);

  console.log("state", state);
  console.log("info", info);
  return (
    <div className="flex h-dvh flex-col items-center justify-center overflow-y-auto p-5 md:p-10">
      <form action={formAction} className="w-full max-w-3xl">
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="browser" value={info.browser} />
        <input type="hidden" name="country" value={info.country} />
        <input type="hidden" name="device" value={info.device} />
        <input type="hidden" name="os" value={info.os} />
        <input type="hidden" name="region" value={info.region} />

        <div className="mb-5 flex-1 rounded-4xl bg-linear-to-r from-purple-600 to-indigo-600 p-15 text-white drop-shadow-2xl drop-shadow-purple-600/10 md:p-20">
          <div className="mb-5 flex items-center justify-center">
            <div className="w-fit rounded-full bg-violet-100 p-5 md:p-6 lg:p-8">
              <FaUser className="text-xl text-violet-600 md:text-3xl lg:text-4xl" />
            </div>
          </div>
          <p className="text-md w-full text-center md:text-lg lg:text-xl">
            {randomTitle}
          </p>
        </div>

        <div className="mb-3">
          <input
            name="title"
            placeholder="Title"
            className="md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          {/* Render Title Errors */}
          {state?.errors?.title && (
            <p className="mt-1 text-xs font-medium text-red-400 md:text-sm">
              {state.errors.title[0]}
            </p>
          )}
        </div>

        <div>
          <textarea
            name="content"
            placeholder="Content"
            className="md:text-md h-55 w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
          />
          {/* Render Content Errors */}
          {state?.errors?.content && (
            <p className="text-xs font-medium text-red-400 md:text-sm">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        {state?.success && (
          <p className="text-sm text-green-600">
            Your message has been successfully submitted.
          </p>
        )}

        <button
          type="submit"
          className="ring-offset mt-3 w-full cursor-pointer rounded-full bg-linear-to-r from-purple-600 to-indigo-600 p-4 text-sm font-semibold text-violet-50 antialiased transition-all ease-in-out hover:from-indigo-600 hover:to-purple-600 hover:ring hover:ring-purple-600 hover:ring-offset-3 md:text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
