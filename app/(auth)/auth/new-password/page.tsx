import { Suspense } from "react";
import { NewPasswordForm } from "./_components/new-password-form";

const NewPasswordPage = () => {
  return (
    <>
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </>
  );
};

export default NewPasswordPage;
