"use client";

import ModalWrapper from "@/components/Modal";
import Button from "@/components/ui/Button";
import { useAxios } from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserInfo {
  bio?: string;
  email?: string;
  first_name: string;
  id?: string;
  image_url?: string;
  last_name?: string;
  phone_number?: string;
}

const Page = () => {
  const location = useRouter();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("access_token");

  const axiosInstance = useAxios();

  const [data, setData] = useState<UserInfo | null>(null);
  const [openLogOut, setOpenLogOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && token) {
        try {
          const response = await axiosInstance.get(`user/${userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
          setData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data. Please try again.");
        }
      }
    };

    fetchUserData();
  }, [axiosInstance, userId, token]);

  const handleLogOut = () => {
    setOpenLogOut(false);
    localStorage.clear();
    location.push("/");
  };

  return (
    <>
      <main className="mt-[12px]">
        <div className="container">
          <div className="w-full px-3">
            <div className="w-full shadow flex items-center justify-between py-3">
              <h1 className="text-xl font-bold">User Profile</h1>
              <Button
                title="Log Out"
                type="button"
                extraStyle="w-[150px] bg-red-500 hover:bg-red-700"
                onClick={() => setOpenLogOut(true)}
              />
            </div>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div>
                <h2 className="text-lg font-bold">User Information</h2>
                <div className="flex flex-col gap-2 p-3">
                  <div className="flex items-center gap-2">
                    <p>{data?.first_name || "First name not available"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <ModalWrapper openModal={openLogOut} setOpenModal={setOpenLogOut}>
        <div
          role="dialog"
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
          className="w-full py-[20px] px-[20px]"
        >
          <p id="logout-dialog-description" className="mb-[20px]">
            Are you sure to log out?
          </p>
          <div className="w-full flex items-center justify-end gap-5">
            <button onClick={() => setOpenLogOut(false)}>Cancel</button>
            <Button
              title="Ok"
              type="button"
              extraStyle="w-[50px] bg-red-500 hover:bg-red-700"
              onClick={handleLogOut}
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default Page;
