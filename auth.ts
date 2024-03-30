import NextAuth, { Account } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UpadtedUserInterface } from "./interface/UserInterface";
import { getSession } from "next-auth/react";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.memailuser.update({
        where: { sEmail: user.email! },
        data: { bEmailVerified: 1 },
      });
    },
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: UpadtedUserInterface;
      account: Account | null;
    }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.nEmailUserID!.toString());

      if (existingUser?.bEmailVerified === 0) return false;

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },

    async jwt({ token }) {
      // console.log("tokenInJWT", token);
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      // console.log("existingUserInJWT", existingUser);

      if (!existingUser) return token;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
