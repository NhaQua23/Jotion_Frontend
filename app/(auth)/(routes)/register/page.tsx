"use client";

import { useLoading } from "@/hooks/use-loading";
import Heading from "../../_components/Heading";
import Signup from "../../_components/Signup";
import { Spinner } from "@/components/spinner";

export default function SignupPage() {
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
            heading="Sign Up to create an account"
            paragraph="Already have an account? "
            linkName="Log in"
            linkUrl="/login"
          />
          <Signup />
        </>
      )}
    </>
  );
}