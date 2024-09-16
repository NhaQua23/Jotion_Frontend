"use client";

import { useLoading } from "@/hooks/use-loading";
import Heading from "../../_components/Heading";
import Login from "../../_components/Login";
import { Spinner } from "@/components/spinner";

export default function LoginPage() {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Spinner size='lg'/>
        </div>
      )}
      {!isLoading && (
        <>
          <Heading
            heading="Log In to your account"
            paragraph="Don't have an account yet? "
            linkName="Sign up"
            linkUrl="/register"
          />
          <Login />
        </>
      )}
    </>
  );
}