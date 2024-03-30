import { getUserById } from "@/data/user";

export async function POST(req: any, res: any) {
  try {
    console.log("req.body", req.body);
    const { user, account } = req.body;

    if (!user || !account) {
      return res.json({ message: "Invalid request body" });
    }

    const existingUser = await getUserById(user.nEmailUserID!.toString());

    if (!existingUser || existingUser.bEmailVerified === 0) {
      return res.json({ message: "Unauthorized" });
    }

    req.session.user = existingUser;

    return res.json({ success: true });
  } catch (error) {
    console.error("Error processing login:", error);
    return res.json({ message: "Internal Server Error" });
  }
}
