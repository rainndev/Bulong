"use server";

import { prisma } from "../prisma";

export const isUserExist = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user != null;
};
