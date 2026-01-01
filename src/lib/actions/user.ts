"use server";

import { prisma } from "../prisma";
import { UserType } from "@/types/user.types";

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
