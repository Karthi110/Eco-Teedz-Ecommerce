"use server";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

export const getAuthStatus = async () => {
  const user = await currentUser();

  if (!user?.id || !user.emailAddresses[0].emailAddress) {
    throw new Error("Invalid user data");
  }

  const existingUser = await db.user.findFirst({
    where: { email: user.emailAddresses[0].emailAddress },
  });

  await db.user.upsert({
    where: { email: user.emailAddresses[0].emailAddress },
    update: {
      id: user.id,
      avatarUrl: user.imageUrl,
    },
    create: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.fullName,
      address: "dummy address",
      mobile: "9140908978",
      avatarUrl: user.imageUrl,
    },
  });

  return { success: true };
};
