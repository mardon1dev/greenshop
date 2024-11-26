"use client";
import { LogIn, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Button from "./ui/Button";
import ModalWrapper from "./Modal";
import LoginForm from "./FormComponents/LoginForm";
import RegisterForm from "./FormComponents/RegisterForm";
import VerifyUserForm from "./FormComponents/VerifyUserForm";

const Header = () => {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const [formAction, setFormAction] = useState("login");
  const [userEmail, setUserEmail] = useState("");
  return (
    <>
      <header className="bg-white">
        <div className="container mx-auto">
          <div className="flex w-full items-center justify-between border-b border-[#46A35880] md:py-0 py-3">
            <div className="flex items-center">
              <button className="md:hidden block mr-[10px]">
                <Menu />
              </button>
              <Link href="/" className="flex items-center gap-1">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={150}
                  height={34}
                  priority
                  style={{ width: "150px", height: "34px" }}
                  className="hidden md:flex"
                />
                <Image
                  src="/favicon.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  priority
                  style={{ width: "30px", height: "30px" }}
                  className="flex md:hidden"
                />
              </Link>
            </div>
            <nav
              className="hidden md:flex items-center md:gap-[30px]"
              role="navigation"
              aria-label="Main Navigation"
            >
              {[
                { path: "/", label: "Home" },
                { path: "/shop", label: "Shop" },
                { path: "/plant-care", label: "Plant Care" },
                { path: "/blogs", label: "Blogs" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  className={`border-b-[3px] ${
                    pathname === path
                      ? "border-green-600 text-green-700"
                      : "border-transparent"
                  } py-5 font-semibold`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center sm:gap-[20px] gap-[10px] md:gap-[30px]">
              <button className="text-gray-600" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
              <div className="relative">
                <button className="text-gray-600" aria-label="Shopping Cart">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <span className="absolute -top-1 -right-1 flex items-center w-[12px] h-[12px] text-[8px] justify-center bg-green-600 text-white p-0 rounded-full">
                  0
                </span>
              </div>
              <Button
                iconLeft={<LogIn />}
                title="Login"
                type="button"
                onClick={() => setOpenModal(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <ModalWrapper setOpenModal={setOpenModal} openModal={openModal}>
        <div className="w-full">
          {formAction != "verifyUser" && (
            <div className="flex items-center justify-center gap-3">
              <span
                className={`text-xl font-medium leading-4 cursor-pointer ${
                  formAction == "login" ? "text-[#46a358]" : "text-[#3D3D3D]"
                }`}
                onClick={() => setFormAction("login")}
              >
                Login
              </span>
              <span>|</span>
              <span
                className={`text-xl font-medium leading-4  cursor-pointer ${
                  formAction == "register" ? "text-[#46a358]" : "text-[#3D3D3D]"
                }`}
                onClick={() => setFormAction("register")}
              >
                Register
              </span>
            </div>
          )}
          {formAction == "verifyUser" && (
            <div className="text-center">
              <span
                className={`text-xl font-medium leading-4 cursor-pointer ${
                  formAction == "verifyUser"
                    ? "text-[#46a358]"
                    : "text-[#3D3D3D]"
                }`}
                onClick={() => setFormAction("verifyUser")}
              >
                Verification
              </span>
              {
                <VerifyUserForm
                  setFormAction={setFormAction}
                  userEmail={userEmail}
                />
              }
            </div>
          )}
          {formAction == "login" && <LoginForm setFormAction={setFormAction} />}
          {formAction == "register" && (
            <RegisterForm
              setFormAction={setFormAction}
              setUserEmail={setUserEmail}
            />
          )}
        </div>
      </ModalWrapper>
    </>
  );
};

export default Header;
