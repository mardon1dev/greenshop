"use client";
import { Context } from "@/context/Context";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import React, { useContext } from "react";

const BasketPart = () => {
  const { token } = useContext(Context);

  const axiosInstance = useAxios();
  const getBasket = async () => {
    const response = await axiosInstance.get("/basket", {
      params: {
        page: 1,
        limit: 100,
      },
      headers: token ? { Authorization: `${token}` } : {},
    });

    return response?.data.ProductId || [];
  };

  const { data: basket = [] } = useQuery({
    queryKey: ["basket"],
    queryFn: getBasket,
    enabled: !!token,
  });

  return (
    <div className="relative">
      <button className="text-gray-600" aria-label="Shopping Cart">
        <ShoppingCart className="h-5 w-5" />
      </button>
      <span className="absolute -top-1 -right-1 flex items-center w-[12px] h-[12px] text-[8px] justify-center bg-green-600 text-white p-0 rounded-full">
        {basket.length}
      </span>
    </div>
  );
};

export default BasketPart;
