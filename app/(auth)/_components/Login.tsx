"use client";

import { useEffect, useState } from "react";
import { loginFields } from "../_constants/formField";
import Input from "./Input";
import FormExtra from "./FormExtra";
import FormAction from "./FormAction";
import { useRouter } from "next/navigation";
import AuthService from "@/services/AuthService";
import { toast } from "sonner";

const fields = loginFields;
let fieldsState: Record<string, string> = {};
fields.forEach((field) => {
  fieldsState[field.id] = '';
});

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({
      ...loginState,
      [e.target.id]: e.target.value
    })
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    const rememberedPassword = localStorage.getItem('rememberPassword');

    if (rememberedEmail && rememberedPassword) {
      setLoginState((prevState) => ({
        ...prevState,
        email: rememberedEmail,
        password: rememberedPassword,
      }));
      const rememberMeCheckbox = document.getElementById("remember-me") as HTMLInputElement;
      if (rememberMeCheckbox) {
        rememberMeCheckbox.checked = true;
      }
    }
  }, []);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dto = {
      email: loginState["email"],
      password: loginState["password"],
    }

    try {
      const response = await AuthService(dto);

      if (response && response.token) {
        const rememberMe = (document.getElementById("remember-me") as HTMLInputElement).checked;

        if (rememberMe) {
          localStorage.setItem('rememberEmail', loginState["email"]);
          localStorage.setItem('rememberPassword', loginState["password"]);
        } else {
          localStorage.removeItem('rememberEmail');
          localStorage.removeItem('rememberPassword');
        }

        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('emailUser', loginState["email"]);
        router.push('/workspaces');
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            customClass=""
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleLogin} text="Login" />
    </form>
  );
}