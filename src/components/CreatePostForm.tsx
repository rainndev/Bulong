// CreatePostForm.tsx
"use client";

import { createPost } from "@/lib/actions/post";
import { useActionState } from "react";

export default function CreatePostForm({ userId }: { userId: string }) {
  const [state, formAction] = useActionState(createPost, null);

  console.log("state", state);
  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} />

      <div>
        <input name="title" placeholder="Title" className="..." />
        {/* Render Title Errors */}
        {state?.errors?.title && (
          <p className="text-red-500 text-xs">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <textarea name="content" placeholder="Content" className="..." />
        {/* Render Content Errors */}
        {state?.errors?.content && (
          <p className="text-red-500 text-xs">{state.errors.content[0]}</p>
        )}
      </div>

      {state?.success && <p className="text-green-500 text-xs">success add</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
