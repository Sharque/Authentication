import NextAuth, { Session } from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { NextURL } from "next/dist/server/web/next-url";
import { RequestData } from "next/dist/server/web/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const { auth } = NextAuth(authConfig);

export interface LoggedIn {
  session?: Session & { user?: any };
  cookies?: RequestCookies;
  geo?: RequestData["geo"];
  ip?: string;
  url: string;
  nextUrl: NextURL;
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("isLoggedIn", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.some((route) => {
    // If the route contains a wildcard, check if it matches the start of the pathname
    if (route.includes(":path")) {
      return nextUrl.pathname.startsWith(route.split(":path")[0]);
    }
    // Otherwise, check for an exact match
    return nextUrl.pathname === route;
  });

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
