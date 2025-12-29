import CreatePostForm from "@/components/CreatePostForm";
import { isUserExist } from "@/lib/actions/user";
import { notFound } from "next/navigation";

const CreatePostPage = async ({
  params,
}: {
  params: Promise<{ userName: string }>;
}) => {
  const { userName } = await params;

  const user = await isUserExist(userName);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <CreatePostForm userId={user.id} />
    </div>
  );
};

export default CreatePostPage;
