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

  const { sFullName, sEmail, sPassword } = validateField.data;

  const hashedPassword = crypto
    .createHash("sha1")
    .update(sPassword)
    .digest("hex");
  const hashedPasswordHex = crypto
    .createHash("sha1")
    .update(Buffer.from(hashedPassword, "hex"))
    .digest("hex");

  const hashedPasswordUppercase = hashedPasswordHex.toUpperCase();

  const existingUser = await getUserByEmail(sEmail);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  // const lastId = await db.memailuser.findMany({});

  // let { nEmailUserID } = lastId[lastId.length - 1];

  // Get current date and time
  let currentDate = new Date();
  let indiaTime = new Date(currentDate.getTime() + 5.5 * 60 * 60 * 1000);

  await db.memailuser.create({
    data: {
      nEmailUserID: 1,
      sEmail,
      sPassword: "*" + hashedPasswordUppercase,
      sFullName,
      dtExpiry: "",
      bSentReminder1: 0,
      bSentReminder2: 0,
      bSentReminder3: 0,
      sComanyName: "",
      sContactNo: "",
      sPythaDongalNo: "",
      bApproved: 0,
      dtCreated: indiaTime,
    },
  });

  const verificationToken = await generateVerificationToken(sEmail);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Email Send" };
};
