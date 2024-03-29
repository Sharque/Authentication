import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import crypto from "crypto";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    Credentials({
      async authorize(credentials) {
        const validateField = LoginSchema.safeParse(credentials);

        if (validateField.success) {
          const { sEmail, sPassword } = validateField.data;

          const user = await getUserByEmail(sEmail);

          if (!user || !user.sPassword) return null;

          const hashedPassword = crypto
            .createHash("sha1")
            .update(sPassword)
            .digest("hex");
          const hashedPasswordHex = crypto
            .createHash("sha1")
            .update(Buffer.from(hashedPassword, "hex"))
            .digest("hex");

          const hashedPasswordUppercase = "*" + hashedPasswordHex.toUpperCase();

          if (hashedPasswordUppercase === user.sPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
