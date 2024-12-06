"use client";
import { Context } from "@/context/Context";
import { useAxios } from "@/hooks/useAxios";
import React, { useContext } from "react";

import { ProductType } from "@/service/ShowProducts";
import ProductCard from "../ui/ProductCard/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

const GetProducts = () => {
  const { token } = useContext(Context);
  const axiosInstance = useAxios();

  const fetchProducts = async () => {
    const response = await axiosInstance.get(`/products`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: {
        page: 1,
        limit: 100,
      },
    });
    return response?.data?.products || [];
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "basket"],
    queryFn: fetchProducts,
    enabled: true,
  });

  return (
    <div className="w-full px-3">
      <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={false}
        modules={[FreeMode, Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {products.map((product: ProductType) => (
          <SwiperSlide key={product.product_id}>
            <ProductCard product={product} height={250} width={190} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GetProducts;
