import { getUserById } from "@/data/user";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export interface CustomApiRequest extends NextApiRequest {
  session?: Session;
}

async function signIn(req: NextApiRequest, res: NextApiResponse) {
  console.log("req", req);
  const { user, account } = req.body as {
    user: any;
    account: any;
  };

  if (account?.provider !== "credentials") {
    return res.status(200).json({ success: true });
  }

  const existingUser = await getUserById(user.nEmailUserID!.toString());
  console.log("existingUser", existingUser);

  if (existingUser?.bEmailVerified === 0) {
    return res
      .status(200)
      .json({ success: false, message: "Email not verified" });
  }
  //@ts-expect-error
  const session = await getSession({ req });
  if (session) {
    //@ts-expect-error

    session.user = existingUser;
    //@ts-expect-error

    await session.save(); // Save the session changes
  } else {
    //@ts-expect-error

    req.session.user = existingUser;
  }

  return res.status(200).json({ success: true });
}

export default signIn;
