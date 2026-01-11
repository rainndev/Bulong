import CreatePostForm from "@/components/CreatePostForm";
import { playfulTitles } from "@/constants/titleMessage";
import { Metadata } from "next";

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

const CreatePostPage = async () => {
  return <CreatePostForm />;
};

export default CreatePostPage;
