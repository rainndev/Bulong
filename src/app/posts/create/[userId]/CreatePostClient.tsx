"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { signUp, useSession } from "@/lib/auth-client";
import { prisma } from "@/lib/prisma";

interface CreatePostClientProps {
  createPost: (formData: FormData) => Promise<void>;
}
const CreatePostClient = ({ createPost }: CreatePostClientProps) => {
  const router = useRouter();

  return (
    <div>
      <form action={createPost} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Title"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />
        <input
          name="content"
          type="text"
          placeholder="content"
          required
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >
          Submit post
        </button>
      </form>
    </div>
  );
};

export default CreatePostClient;
