"use server";

import { UserType } from "@/types/user.types";
import { prisma } from "../prisma";

export const isUserExist = async (
  userName: string,
): Promise<UserType | null> => {
  const user = await prisma.user.findFirst({
    where: {
      name: userName,
    },
  });

  return user;
};
