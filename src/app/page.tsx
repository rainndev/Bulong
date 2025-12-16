import { prisma } from "../../lib/prisma";

const page = async () => {
  const user = await prisma.user.findMany();
  return <div>{JSON.stringify(user)}</div>;
};

export default page;
