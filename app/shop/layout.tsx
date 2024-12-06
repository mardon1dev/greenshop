"use client";
import GetProducts from "@/components/GetProducts/GetProducts";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full p-3">
        <button
          className="font-bold"
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </button>
        <span> /</span>
        {pathname == "/shop" ? (
          <span> Shop</span>
        ) : (
          <span> Shop / Shopping-cart</span>
        )}
      </div>
      {children}
      <div className="my-[40px]">
        <GetProducts />
      </div>
    </div>
  );
};

export default MainLayout;
