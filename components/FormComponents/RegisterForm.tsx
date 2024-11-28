"use client";
import React, { SetStateAction, useState } from "react";
import CustomInput from "../ui/CustomInput";
import Button from "../ui/Button";
import { FacebookIcon, GoogleIcon } from "@/public/images/icon";
import { useAxios } from "@/hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

interface RegisterAction {
  setFormAction: React.Dispatch<SetStateAction<string>>;
  setUserEmail: React.Dispatch<SetStateAction<string>>;
}

const RegisterForm: React.FC<RegisterAction> = ({
  setFormAction,
  setUserEmail,
}) => {
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserEmail((e.target as HTMLFormElement).email.value);
    const data = {
      email: (e.target as HTMLFormElement).email.value,
      firstName: (e.target as HTMLFormElement).username.value,
      lastName: (e.target as HTMLFormElement).username.value,
      password: (e.target as HTMLFormElement).password.value,
    };

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/register", data);
      if (response.status === 200) {
        toast.success("Registration successful");
        setTimeout(() => {
          setFormAction("verifyUser");
        }, 1000);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Some inputs are wrong.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Registration failed");
    }
  }
  return (
    <div className="mt-[53px] max-w-[350px] w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <p>Enter your username, email, and password to register.</p>
      <form
        className="space-y-4 mt-[14px]"
        autoComplete="off"
        onSubmit={handleRegisterSubmit}
      >
        <CustomInput
          type="text"
          placeholder="Username"
          name="username"
          id="username"
        />
        <CustomInput
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <CustomInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <CustomInput
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Confirm Password"
        />
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
            <div className="absolute right-0 left-0 mx-auto w-[150px] bg-white px-4 text-center z-10">
              <p className="text-sm text-gray-500 text-center">
                Or register with
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-[15px] mt-[27px]">
          <button className="flex items-center justify-center py-[10px] w-full border-[1px] border-[#EAEAEA] rounded-[5px] space-x-[10px] hover:border-[#46A358]">
            <GoogleIcon />
            <span>Register with Google</span>
          </button>
          <button className="flex items-center justify-center py-[10px] w-full border-[1px] border-[#EAEAEA] rounded-[5px] space-x-[10px] hover:border-[#46A358]">
            <FacebookIcon />
            <span>Register with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
