import CreatePostForm from "@/components/CreatePostForm";
import { isUserExist } from "@/lib/actions/user";
import { notFound } from "next/navigation";

const CreatePostPage = async ({
  params,
}: {
  params: Promise<{ userName: string }>;
}) => {
  const { userName } = await params;

  const decodedUserName = decodeURIComponent(userName);
  const cleanUsername = decodedUserName.startsWith("@")
    ? decodedUserName.substring(1)
    : decodedUserName;

  const user = await isUserExist(cleanUsername);
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
