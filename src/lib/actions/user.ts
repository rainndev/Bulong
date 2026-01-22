"use server";

import { auth } from "@/lib/auth/auth";
import { UserType } from "@/types/user.types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

export const requireAuth = async (redirectTo = "/sign-in") => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(redirectTo);
  }

  return session;
};

export const toggleLinkAcceptance = async (
  userId: string,
  isDisabled: boolean,
) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isDisabled,
    },
  });
};
