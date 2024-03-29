export const publicRoutes = [
  "/",
  "/about-us",
  "/contact-us",
  "/blogs",
  "/blogs/:path*",
  "/pricing",
  "/solutions/:path*",
  "/thank-you",
  "/auth/new-verification",
  "/api/uploadthing",
];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/admin";
