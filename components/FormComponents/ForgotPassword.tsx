"use client";
import React, { SetStateAction, useState } from "react";
import CustomInput from "../ui/CustomInput";
import Button from "../ui/Button";
import { useAxios } from "@/hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";

interface ForgotPaswordAction {
  setFormAction: React.Dispatch<SetStateAction<string>>;
  setUserEmail: React.Dispatch<SetStateAction<string>>;
}

const ForgotPassword: React.FC<ForgotPaswordAction> = ({
  setFormAction,
  setUserEmail,
}) => {
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleForgotSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserEmail((e.target as HTMLFormElement).email.value);
    const email = (e.target as HTMLFormElement).email.value;
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/forgot/${email}`, {});
      if (response.status === 200) {
        toast.success("Email sent successfully");
        setTimeout(() => {
          setFormAction("resetPassword");
        }, 1000);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Email not found");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Error sending email");
    }
  }
  function handleLogin() {
    setFormAction("login");
  }
  return (
    <div className="mt-[53px] max-w-[350px] w-full">
      <Toaster position="top-right" reverseOrder={false} />

      <form
        className="space-y-4 mt-[14px]"
        autoComplete="off"
        onSubmit={handleForgotSubmit}
      >
        <CustomInput
          type="email"
          placeholder="almamun_uxui@outlook.com"
          name="email"
          id="email"
          extraClass="w-[300px]"
        />
        <div className="text-end text-[16px] text-[#46A358]">
          <span className="cursor-pointer" onClick={handleLogin}>
            Login
          </span>
        </div>
        <Button
          title={isLoading ? "Processing..." : "Submit"}
          type="submit"
          extraStyle={`w-full mt-[20px] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
