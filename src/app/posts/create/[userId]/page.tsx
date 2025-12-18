import CreatePostForm from "@/components/CreatePostForm";
import { isUserExist } from "@/lib/actions/user";
import { notFound } from "next/navigation";

const CreatePostPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  if (!(await isUserExist(userId))) {
    return notFound();
  }

  return (
    <div>
      <CreatePostForm userId={userId} />
    </div>
  );
};

export default CreatePostPage;
