"use client";

import ModalWrapper from "@/components/Modal";
import Button from "@/components/ui/Button";
import { useAxios } from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const location = useRouter()
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("access_token");

  const axiosInstance = useAxios();

  const [data, setData] = useState({});
  const [openLogOut, setOpenLogOut] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && token) {
        try {
          const response = await axiosInstance.get(`user/${userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          console.log(response);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogOut = () => {
    setOpenLogOut(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("access_token");
    window.location.reload();
    location.push("/")
  };

  return (
    <>
      <main className="mt-[12px]">
        <div className="container">
          <div className="w-full shadow flex items-center justify-between p-3">
            <h1 className="text-xl font-bold">User Profile</h1>
            <Button
              title="Log Out"
              type="button"
              extraStyle="w-[150px] bg-red-500 hover:bg-red-700"
              onClick={() => setOpenLogOut(true)}
            />
          </div>
        </div>
      </main>

      <ModalWrapper openModal={openLogOut} setOpenModal={setOpenLogOut}>
        <div className="w-full py-[20px] px-[20px]">
          <p className="mb-[20px]">Are you sure to log out?</p>
          <div className="w-full flex items-center justify-end gap-5">
            <button onClick={()=> setOpenLogOut(false)}>Cancel</button>
            <Button
              title="Ok"
              type="button"
              extraStyle="w-[50px] bg-red-500 hover:bg-red-700"
              onClick={() => handleLogOut()}
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default Page;
