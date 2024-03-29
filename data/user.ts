import { db } from "@/lib/db";

export const getUserByEmail = async (sEmail: string) => {
  try {
    const user = await db.memailuser.findUnique({ where: { sEmail } });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (nEmailUserID: string) => {
  try {
    const userId = parseInt(nEmailUserID);
    const user = await db.memailuser.findUnique({
      where: { nEmailUserID: userId },
    });

    return user;
  } catch (error) {
    return null;
  }
};
