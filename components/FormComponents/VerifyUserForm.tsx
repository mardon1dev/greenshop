"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import Button from "../ui/Button";
import { useAxios } from "@/hooks/useAxios";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface VerifyUserFormProps {
  setFormAction: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
}

const numberOfDigits = 6;

const VerifyUserForm: React.FC<VerifyUserFormProps> = ({
  setFormAction,
  userEmail,
}) => {
  const axiosInstance = useAxios();
  const [otp, setOtp] = useState<string[]>(Array(numberOfDigits).fill(""));
  const otpBoxRefs = useRef<(HTMLInputElement | null)[]>(
    Array(numberOfDigits).fill(null)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < numberOfDigits - 1) {
        otpBoxRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpBoxRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpBoxRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < numberOfDigits - 1) {
      otpBoxRefs.current[index + 1]?.focus();
    }
  };

  async function handleVerifySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length === numberOfDigits) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post(
          "/users/verify",
          {},
          {
            headers: { "Content-Type": "application/json" },
            params: { email: userEmail, code: enteredOtp },
          }
        );
        if (response.status === 201) {
          toast.success("User successfully verified!");
          setTimeout(() => {
            setFormAction("login");
          }, 1000);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.log(error);

        setIsLoading(false);
        toast.error(
          "An error occurred while verifying the OTP. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please fill in all OTP fields.");
    }
  }

  return (
    <div className="flex flex-col items-center mt-[46px]">
      <Toaster position="top-right" reverseOrder={false} />
      <form className="flex flex-col gap-2" onSubmit={handleVerifySubmit}>
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="tel"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(ref) => {
                otpBoxRefs.current[index] = ref;
              }}
              required
              maxLength={1}
              aria-label={`OTP digit ${index + 1}`}
              pattern="[0-9]*"
              className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          ))}
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
      <div className="w-full text-start mt-[10px]">
        <button
          className="text-start text-sm text-green-600"
          onClick={(e) => {
            e.preventDefault();
            setFormAction("register");
          }}
        >
          Wrong email? Back to register
        </button>
      </div>
    </div>
  );
};

export default VerifyUserForm;
