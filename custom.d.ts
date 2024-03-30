import { Session } from "express-session";
import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    session: Session;
  }
}
