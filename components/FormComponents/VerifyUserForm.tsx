"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import axios from "axios";
import Button from "../ui/Button";
import { useAxios } from "@/hooks/useAxios";

interface RegisterAction {
  setFormAction: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
}

const numberOfDigits = 6;

const VerifyUserForm: React.FC<RegisterAction> = ({ setFormAction, userEmail }) => {
  const [otp, setOtp] = useState<string[]>(Array(numberOfDigits).fill(""));
  const otpBoxRefs = useRef<(HTMLInputElement | null)[]>(Array(numberOfDigits).fill(null));
  const [error, setError] = useState<string | null>(null);

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

  async function handleSubmit(e: React.MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const enteredOtp = otp.join("");
    if (enteredOtp.length === numberOfDigits) {
      try {
        const response = await useAxios().post(
          "/users/verify",
          {},
          {
            headers: { "Content-Type": "application/json" },
            params: { email: userEmail, code: enteredOtp },
          }
        );
        if (response.status === 200) {
          setFormAction("login");
        } else {
          setError("Invalid OTP.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Please fill all OTP fields.");
    }
  }

  return (
    <div className="flex flex-col items-center mt-[46px]">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="tel"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(ref) => (otpBoxRefs.current[index] = ref)}
              required
              maxLength={1}
              aria-label={`OTP digit ${index + 1}`}
              pattern="[0-9]*"
              className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          ))}
        </div>
        <Button title="Verify User" type="submit" extraStyle="w-full mt-[20px]" />
      </form>
      <div className="w-full text-start mt-[10px]">
        <button
          className="text-start"
          onClick={(e) => {
            e.preventDefault();
            setFormAction("register");
          }}
        >
          Wrong email. Back to register
        </button>
      </div>
    </div>
  );
};

export default VerifyUserForm;
