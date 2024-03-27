import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ErrorPage = () => {
  return (
    <>
      <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300 text-center py-10">
          Oops! Something went wrong!
        </p>
        <div className="text-center">
          <Link href="/auth/login">
            <Button className="hover:text-blue-600" variant="link">
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
