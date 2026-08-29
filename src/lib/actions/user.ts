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

export const isHandleAvailable = async (handle: string): Promise<boolean> => {
  const normalized = handle.trim().toLowerCase();

  if (!/^[a-z0-9_]{3,20}$/.test(normalized)) {
    return false;
  }

  const existing = await prisma.user.findFirst({
    where: {
      name: {
        equals: normalized,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
    },
  });

  return !existing;
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
