"use client";
import { LogIn, Menu, Search, ShoppingCart, User2Icon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "./ui/Button";
import ModalWrapper from "./Modal";
import LoginForm from "./FormComponents/LoginForm";
import RegisterForm from "./FormComponents/RegisterForm";
import VerifyUserForm from "./FormComponents/VerifyUserForm";
import ForgotPassword from "./FormComponents/ForgotPassword";
import ResetPassword from "./FormComponents/ResetPassword";

const Header = () => {
  const navlinks = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/plant-care", label: "Plant Care" },
    { path: "/blogs", label: "Blogs" },
  ];

  const pathname = usePathname();
  const location = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [formAction, setFormAction] = useState("login");
  const [userEmail, setUserEmail] = useState("");

  const [openNavbar, setOpenNavbar] = useState(false);

  const access_token = localStorage.getItem("access_token");
  const userName = localStorage.getItem("firstName");

  return (
    <>
      <header className="bg-white">
        <div className="container mx-auto">
          <div className="flex w-full items-center justify-between border-b border-[#46A35880] md:py-0 py-3 px-3">
            <div className="flex items-center">
              <button
                className="md:hidden block mr-[10px]"
                onClick={() => setOpenNavbar(true)}
              >
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
              {navlinks.map(({ path, label }) => (
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

            <div className="flex items-center gap-[20px] md:gap-[30px]">
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
              {!access_token ? (
                <Button
                  iconLeft={<LogIn />}
                  title="Login"
                  type="button"
                  onClick={() => setOpenModal(true)}
                />
              ) : (
                <Button
                  title={userName ?? "User"}
                  type="button"
                  iconLeft={<User2Icon />}
                  onClick={() => {
                    location.push("/profile");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {openNavbar && (
        <div
          id="outer-wrapper"
          className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm z-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpenNavbar(false);
            }
          }}
        >
          <button
            onClick={() => setOpenNavbar(false)}
            className="absolute top-3 left-2 w-5 h-5"
          >
            <X />
          </button>
          <div className="flex flex-col items-start justify-between h-screen bg-white w-1/2 py-[50px] sm:px-[30px] px-[10px]">
            <div className="flex flex-col items-start justify-start gap-[20px]">
              {navlinks.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  className={`border-b-[3px] ${
                    pathname === path
                      ? "border-green-600 text-green-700"
                      : "border-transparent"
                  } font-semibold`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <p>
                Call: <Link href={"tel:+998999999999"}>+998999999999</Link>{" "}
              </p>
              <span>Support centre: Tashkent, Chilanzar, 1000092</span>
            </div>
          </div>
        </div>
      )}

      <ModalWrapper setOpenModal={setOpenModal} openModal={openModal}>
        <div className="w-full">
          {(formAction === "login" || formAction === "register") && (
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
            <div className="text-center w-[300px]">
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
          {formAction == "forgotPassword" && (
            <div className="text-center w-[300px]">
              <span
                className={`text-xl font-medium leading-4 cursor-pointer ${
                  formAction == "forgotPassword"
                    ? "text-[#46a358]"
                    : "text-[#3D3D3D]"
                }`}
                onClick={() => setFormAction("verifyUser")}
              >
                Forgot Password
              </span>
              {
                <ForgotPassword
                  setFormAction={setFormAction}
                  setUserEmail={setUserEmail}
                />
              }
            </div>
          )}
          {formAction == "resetPassword" && (
            <div className="text-center w-[300px]">
            <span
              className={`text-xl font-medium leading-4 cursor-pointer ${
                formAction == "resetPassword"
                  ? "text-[#46a358]"
                  : "text-[#3D3D3D]"
              }`}
              onClick={() => setFormAction("verifyUser")}
            >
              Forgot Password
            </span>
            {
              <ResetPassword email={userEmail} setFormAction={setFormAction} />
            }
          </div>
          )}
          {formAction == "login" && (
            <LoginForm
              setFormAction={setFormAction}
              setUserEmail={setUserEmail}
              setOpenModal={setOpenModal}
            />
          )}
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
