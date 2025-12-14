import React from "react";

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return <div>Slug: {slug}</div>;
};

export default PostPage;
