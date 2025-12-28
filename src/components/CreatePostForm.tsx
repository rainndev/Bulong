"use client";

import { createPost } from "@/lib/actions/post";
import { useActionState, useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/api/anonymous-info")
      .then((res) => res.json())
      .then(setInfo);
  }, []);

  console.log("state", state);
  console.log("info", info);
  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="browser" value={info.browser} />
      <input type="hidden" name="country" value={info.country} />
      <input type="hidden" name="device" value={info.device} />
      <input type="hidden" name="os" value={info.os} />
      <input type="hidden" name="region" value={info.region} />

      <div>
        <input name="title" placeholder="Title" className="..." />
        {/* Render Title Errors */}
        {state?.errors?.title && (
          <p className="text-xs text-red-500">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <textarea name="content" placeholder="Content" className="..." />
        {/* Render Content Errors */}
        {state?.errors?.content && (
          <p className="text-xs text-red-500">{state.errors.content[0]}</p>
        )}
      </div>

      {state?.success && <p className="text-xs text-green-500">success add</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
