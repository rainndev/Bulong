"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export type UserType = Prisma.UserGetPayload<{}>;

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
