"use client";
import React, { SetStateAction, useState } from "react";
import CustomInput from "../ui/CustomInput";
import Button from "../ui/Button";
import { useAxios } from "@/hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

interface ResetPasswordAction {
  setFormAction: React.Dispatch<SetStateAction<string>>;
  email: string;
}

const ResetPassword: React.FC<ResetPasswordAction> = ({
  setFormAction,
  email,
}) => {
  const axiosInstance = useAxios();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleResetSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      email,
      new_password: formData.get("newPassword") as string,
      otp: formData.get("otp") as string,
    };
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(`/reset-password`, data);
      if (response.status === 200) {
        toast.success("Password reset successfully");
        setTimeout(() => {
          setFormAction("login");
        }, 1000);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Password or otp is wrong.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <div className="mt-[53px] max-w-[350px] w-full">
      <Toaster position="top-right" reverseOrder={false} />

      <form
        className="space-y-4 mt-[14px]"
        autoComplete="off"
        onSubmit={handleResetSubmit}
      >
        <CustomInput
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter new password"
          extraClass="w-[300px]"
          aria-label="New Password"
        />
        <CustomInput
          type="number"
          id="otp"
          name="otp"
          placeholder="Enter the code."
          extraClass="w-[300px]"
          aria-label="Verification Code"
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
    </div>
  );
};

export default ResetPassword;
