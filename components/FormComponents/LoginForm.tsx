"use client";
import React, { SetStateAction, useState } from "react";
import CustomInput from "../ui/CustomInput";
import Button from "../ui/Button";
import { FacebookIcon, GoogleIcon } from "@/public/images/icon";
import { useAxios } from "@/hooks/useAxios";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface LoginAction {
  setFormAction: React.Dispatch<SetStateAction<string>>;
  setUserEmail: React.Dispatch<SetStateAction<string>>;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginAction> = ({
  setFormAction,
  setUserEmail,
  setOpenModal,
}) => {
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserEmail((e.target as HTMLFormElement).email.value);
    const data = {
      usernameoremail: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/login", data);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data?.access_token);
        localStorage.setItem("firstName", response?.data?.first_name);
        localStorage.setItem("userId", response?.data?.id);
        toast.success("Login successful!");
        setTimeout(() => {
          setOpenModal(false);
        }, 1000);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("An error occurred while logging in. Please try again.");
    }
  }

  function handleForgotPassword() {
    setFormAction("forgotPassword");
  }

  return (
    <div className="mt-[53px] max-w-[350px] w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <p>Enter your username and password to login.</p>
      <form
        className="space-y-4 mt-[14px]"
        autoComplete="off"
        onSubmit={handleLoginSubmit}
      >
        <CustomInput
          type="email"
          placeholder="almamun_uxui@outlook.com"
          name="email"
          id="email"
        />
        <CustomInput
          type="password"
          id="password"
          name="password"
          placeholder="******"
        />
        <div className="text-end text-[16px] text-[#46A358]">
          <span className="cursor-pointer" onClick={handleForgotPassword}>
            Forgot Password
          </span>
        </div>
        <Button
          iconRight={isLoading ? <Loader className="rotateAnimation" /> : null}
          title={isLoading ? "Processing..." : "Submit"}
          type="submit"
          extraStyle={`w-full mt-[20px] ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        />
      </form>
      <div className="w-full mt-[46px]">
        <div className="w-full pb-[27px]">
          <div className="relative flex items-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#eaeaea]"></div>
            </div>
            <div className="absolute right-0 left-0 mx-auto w-[120px] bg-white px-4 text-center z-10">
              <p className="text-sm text-gray-500 text-center">Or login with</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-[15px] mt-[27px]">
          <button className="flex items-center justify-center py-[10px] w-full border-[1px] border-[#EAEAEA] rounded-[5px] space-x-[10px] hover:border-[#46A358]">
            <GoogleIcon />
            <span>Login with Google</span>
          </button>
          <button className="flex items-center justify-center py-[10px] w-full border-[1px] border-[#EAEAEA] rounded-[5px] space-x-[10px] hover:border-[#46A358]">
            <FacebookIcon />
            <span>Login with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
