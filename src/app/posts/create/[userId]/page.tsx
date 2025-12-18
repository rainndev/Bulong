import { createPost } from "@/lib/actions/post";

const CreatePostPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const formAction = async (formData: FormData) => {
    "use server";
    await createPost(formData, userId);
  };

  return (
    <div>
      <form action={formAction} className="space-y-4">
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

export default CreatePostPage;
