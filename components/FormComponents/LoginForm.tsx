"use client";
import React, { SetStateAction } from "react";
import CustomInput from "../ui/CustomInput";
import Button from "../ui/Button";
import { FacebookIcon, GoogleIcon } from "@/public/images/icon";

interface LoginAction {
  setFormAction: React.Dispatch<SetStateAction<string>>
}

const LoginForm: React.FC<LoginAction> = ({setFormAction}) => {

  return (
      <div className="mt-[53px] max-w-[350px] w-full">
        <p>Enter your username and password to login.</p>
        <form className="space-y-4 mt-[14px]" autoComplete="off">
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
            <span className="cursor-pointer">Forgot Password</span>
          </div>
          <Button title="Login" type="submit" extraStyle={"w-full"} />
        </form>
        <div className="w-full mt-[46px]">
          <div className="w-full pb-[27px]">
            <div className="relative flex items-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#eaeaea]"></div>
              </div>
              <div className="absolute right-0 left-0 mx-auto w-[120px] bg-white px-4 text-center z-10">
                <p className="text-sm text-gray-500 text-center">
                  Or login with
                </p>
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
