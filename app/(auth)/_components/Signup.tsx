"use client";

import { useState } from "react";
import { signupFields } from "../_constants/formField";
import Input from "./Input";
import FormAction from "./FormAction";
import { toast } from "sonner";
import RegisterService from "@/services/RegisterService";
import { useRouter } from "next/navigation";

const fields = signupFields;
let fieldsState: Record<string, string> = {};
fields.forEach((field) => {
  fieldsState[field.id] = '';
});

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState({
      ...signupState,
      [e.target.id]:e.target.value
    })
  };

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { username, email, password, "confirm-password": confirmPassword } = signupState;

    let formErrors: Record<string, string> = {};

    if (!validateEmail(email)) {
      formErrors.email = "Invalid email format.";
    }

    if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 8 characters long, include letters and numbers.";
    }

    if (password !== confirmPassword) {
      formErrors["confirm-password"] = "Passwords do not match.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const dto = {
      username,
      email,
      password,
    };
    // const dto = {
    //   username: signupState["username"],
    //   email: signupState["email"],
    //   password: signupState["password"],
    // }

    try {
      console.log(dto);
      const response = await RegisterService(dto);

      if (response && response.email) {
        localStorage.setItem('rememberEmail', signupState["email"]);
        localStorage.setItem('rememberPassword', signupState["password"]);
        toast.success("Sign up successfully.");
        router.push('/login');
      } else {
        toast.error("Sign up failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during sign up.");
      console.error("Sign up error:", error);
    }
  };

  return (
    <form className="mt-8 space-y-6">
        <div className="">
          {fields.map(field => (
            <div key={field.id}>
            <Input
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              customClass=""
            />
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        ))}
          <FormAction handleSubmit={handleSignin} text="Sign Up" />
        </div>
    </form>
  );
}