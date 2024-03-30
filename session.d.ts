// session.d.ts
declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      username?: string;
      sEmail?: string;
      sFullName?: string;
      nEmailUserID?: number;
      bEmailVerified?: number;
    };
  }
}
