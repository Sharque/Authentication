"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid field" };
  }

  const { sEmail, sPassword } = validateField.data;

  const existingUser = await getUserByEmail(sEmail);

  if (!existingUser || !existingUser.sEmail || !existingUser.sPassword) {
    return { error: "Email does not exist" };
  }

  if (existingUser.bEmailVerified === 0) {
    const verificationToken = await generateVerificationToken(
      existingUser.sEmail
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      sEmail,
      sPassword,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default: {
          return { error: "Something went wrong" };
        }
      }
    }
    throw error;
  }
};
