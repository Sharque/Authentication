import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="h-screen grid place-items-center">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-3xl font-bold">Landing Page</h1>
          <Link href="/auth/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
