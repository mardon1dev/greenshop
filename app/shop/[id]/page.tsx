"use client";

import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { ProductType } from "@/service/ShowProducts";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Facebook, FacebookIcon, Heart } from "lucide-react";
import Link from "next/link";
import {
  ShareEmailIcon,
  ShareFacebookIcon,
  ShareLinkedinIcon,
  ShareTwitterIcon,
} from "@/public/images/icon";

const ProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const axiosInstance = useAxios();

  const fetchProduct = async (): Promise<ProductType> => {
    const response = await axiosInstance.get(`/product/${id}`);
    if (!response?.data) throw new Error("Product not found");
    return response?.data;
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  return (
    <main className="mt-[12px]">
      <div className="container">
        <div className="w-full p-3">
          <div>
            <button
              className="font-bold"
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </button>
            <span> /</span>
            <span> Shop</span>
          </div>
          {isLoading && <p className="loading-message">Loading product...</p>}
          {isError && <p className="error-message">Error: {error.message}</p>}
          {product && (
            <div className="mt-10">
              <div className="flex justify-between">
                <div className="w-full flex justify-center">
                  <Image
                    src={
                      product?.image_url ? product?.image_url[0] : "/logo.svg"
                    }
                    alt={
                      product.product_name ? product.product_name : "Product"
                    }
                    className="w-full"
                    width={400}
                    height={400}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "400px",
                      height: "400px",
                    }}
                    priority
                  />
                </div>
                <div className="max-w-[576px] w-full">
                  <h2 className="text-3xl font-bold leading-4 text-left text-[#3D3D3D]">
                    {product.product_name}
                  </h2>
                  <div className="flex items-center justify-between my-5">
                    <p className="text-green-700 text-xl font-bold leading-4 text-left">
                      ${product.cost && product.cost.toFixed(2)}
                    </p>
                    <p>19 reviews</p>
                  </div>
                  <div>
                    <p className="text-[#3D3D3D] text-sm font-medium leading-4 text-left">
                      Short description:
                    </p>
                    <p className="text-sm font-normal leading-6 text-left text-[#727272] mt-[10px]">
                      {product.short_description}
                    </p>
                  </div>
                  <div className="mt-[10px]">
                    <p className="text-[#3D3D3D] text-sm font-medium leading-4 text-left">
                      Size:
                    </p>
                    <ul className="flex  items-center gap-[10px] mt-[10px]">
                      {product?.size?.map((item) => (
                        <li
                          className="w-[28px] h-[28px] flex items-center justify-center text-sm font-normal text-[#727272] border-[#727272] border-[1px] rounded-full hover:border-[#46A358] hover:text-[#46A358] cursor-pointer hover:font-semibold"
                          key={item}
                        >
                          {item.charAt(0)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex gap-6">
                      <div className="flex items-center gap-3">
                        <Button
                          title="-"
                          type="button"
                          extraStyle="rounded-full text-[24px] !h-[40px]"
                        />
                        <span className="text-[20px]">0</span>
                        <Button
                          title="+"
                          type="button"
                          extraStyle="rounded-full text-[24px] !h-[40px]"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          title="Buy Now"
                          type="button"
                          extraStyle="uppercase !h-[40px] hover:!text-[#46A358] hover:!bg-transparent font-semibold border border-transparent hover:border-[#46A358]"
                        />
                        <Button
                          title="Add to Cart"
                          type="button"
                          extraStyle="uppercase !h-[40px] bg-transparent border border-[#46A358] !text-[#46A358] font-semibold hover:!text-white hover:bg-[#46A358]"
                        />
                        <Button
                          title=""
                          type="button"
                          extraStyle="uppercase !h-[40px] bg-transparent border border-[#46A358] !text-[#46A358] font-semibold hover:!text-white hover:bg-[#46A358]"
                          iconLeft={<Heart />}
                        />
                      </div>
                    </div>
                    <div className="text-[#727272] mt-6">
                      <span>Tags: </span>
                      {product?.tags?.map((tag) => (
                        <span key={tag}>{tag} </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <span>Share this product:</span>
                      <div className="flex items-center gap-[20px]">
                        <Link
                          href={"#"}
                          className="text-[#3D3D3D] hover:text-[#46A358]"
                        >
                          <ShareFacebookIcon />
                        </Link>
                        <Link
                          href={"#"}
                          className="text-[#3D3D3D] hover:text-[#46A358]"
                        >
                          <ShareTwitterIcon />
                        </Link>
                        <Link
                          href={"#"}
                          className="text-[#3D3D3D] hover:text-[#46A358]"
                        >
                          <ShareLinkedinIcon />
                        </Link>
                        <Link
                          href={"#"}
                          className="text-[#3D3D3D] hover:text-[#46A358]"
                        >
                          <ShareEmailIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-[90px]">
                <div className="border-b-[1px] border-[#46A35880]">
                  <span className="border-b-[3px] border-[#46A358] pb-3 inline-block text-[#46a358] font-semibold text-[18px]">
                    Product Description
                  </span>
                </div>
                <p className="text-sm font-normal leading-6 text-left text-[#727272]">
                  {product?.product_description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
