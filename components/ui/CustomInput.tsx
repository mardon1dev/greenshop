"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputTypes {
  type?: "email" | "password" | "text" | "number";
  placeholder?: string;
  name: string;
  id: string;
  extraClass?: string
}

const CustomInput: React.FC<InputTypes> = ({
  type = "text",
  placeholder = "",
  name,
  id,
  extraClass
}) => {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password" && name === "password";

  return (
    <div className="input-container relative">
      <input
        type={isPasswordField && showPassword ? "text" : type}
        name={name}
        id={id}
        placeholder={placeholder}
        required
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`w-full py-3 px-4 placeholder:text-[#A5A5A5] text-black outline-none border-[1px] rounded-[5px] ${
          focus ? "border-[#46A358]" : "border-[#EAEAEA]"
        } ${extraClass}`}
        aria-label={placeholder || name}
      />
      {isPasswordField && (
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute top-0 bottom-0 flex items-center right-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 text-[#727272]" />
          ) : (
            <Eye className="w-4 h-4 text-[#727272]" />
          )}
        </button>
      )}
    </div>
  );
};

export default CustomInput;

// Password should be 8-20 characters long and contain at least one lowercase letter, one uppercase letter, and one digit
