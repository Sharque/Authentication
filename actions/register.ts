"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import crypto from "crypto";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateField = RegisterSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid field" };
  }

  const { name, email, password } = validateField.data;

  const hashedPassword = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex");
  const hashedPasswordHex = crypto
    .createHash("sha1")
    .update(Buffer.from(hashedPassword, "hex"))
    .digest("hex");

  const hashedPasswordUppercase = hashedPasswordHex.toUpperCase();

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: "*" + hashedPasswordUppercase,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Email Send" };
};
