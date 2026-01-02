import CreatePostForm from "@/components/CreatePostForm";
import { playfulTitles } from "@/constants/titleMessage";
import { isUserExist } from "@/lib/actions/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userName: string }>;
}): Promise<Metadata> {
  const { userName } = await params;
  const decodedUserName = decodeURIComponent(userName);
  const randomIndex = Math.floor(Math.random() * playfulTitles.length);
  const description = playfulTitles[randomIndex].replace(
    "{username}",
    decodedUserName,
  );

  return {
    title: `Send Message to ${decodedUserName} | Bulong`,
    description,
  };
}

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

  return <CreatePostForm userId={user.id} />;
};

export default CreatePostPage;
