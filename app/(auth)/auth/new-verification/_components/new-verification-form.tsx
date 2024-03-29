"use client";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { BeatLoader } from "react-spinners";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl text-center p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <p className="text-neutral-600 text-xl font-semibold mt-2 dark:text-neutral-300 text-center pt-4">
          Confirming your verification
        </p>
        <div className="flex items-center justify-center">
          <div className="py-4 max-w-[300px]">
            {!success && !error && <BeatLoader />}
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
        </div>

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
