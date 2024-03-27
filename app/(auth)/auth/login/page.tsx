import { Suspense } from "react";
import { LoginForm } from "./_components/login-form";

const Login = () => {
  return (
    <>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
};

export default Login;
