import { Suspense } from "react";
import { NewVerificationForm } from "./_components/new-verification-form";

const NewVerificationPage = () => {
  return (
    <>
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </>
  );
};

export default NewVerificationPage;
