"use client";

import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";

import { ProductType } from "@/service/ShowProducts";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Heart } from "lucide-react";
import Link from "next/link";
import {
  ShareEmailIcon,
  ShareFacebookIcon,
  ShareLinkedinIcon,
  ShareTwitterIcon,
} from "@/public/images/icon";
import { useLikeMutation } from "@/hooks/useLikeMutation";
import { useBasketMutation } from "@/hooks/useBasketMutation";
import { Context } from "@/context/Context";
import CustomOrderButton from "@/components/ui/CustomOrderButton.tsx/CustomOrderButton";
import ModalWrapper from "@/components/Modal";
import toast, { Toaster } from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const likeMutation = useLikeMutation();
  const basketMutation = useBasketMutation();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ordered, setOrdered] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<number>(0);

  const { token } = useContext(Context);

  const fetchProduct = async (): Promise<ProductType> => {
    const response = await axiosInstance.get(`/product/${id}`, {
      headers: token ? { Authorization: `${token}` } : {},
    });
    if (!response?.data) throw new Error("Product not found");
    return response?.data;
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
    enabled: true,
  });

  const handleLike = (id: string) => {
    if (id) {
      likeMutation.mutate(id);
    }
  };

  const handleBasket = (id: string) => {
    if (id) {
      basketMutation.mutate(id, {
        onSuccess: () => {
          if (product?.basket) {
            toast.error("Product removed.");
          } else {
            toast.success("Product added.");
          }
        },
      });
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full p-3">
        {isLoading && <p className="loading-message">Loading product...</p>}
        {isError && <p className="error-message">Error: {error.message}</p>}
        {product && (
          <div className="mt-10">
            <div className="flex justify-between md:flex-row flex-col">
              <div className="w-full flex justify-center">
                <Image
                  src={product?.image_url ? product?.image_url[0] : "/logo.svg"}
                  alt={product.product_name ? product.product_name : "Product"}
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
              <div className="max-w-[576px] w-full md:mt-0 mt-[20px]">
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
                  <div className="mt-6 flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                      <Button
                        title="-"
                        type="button"
                        extraStyle="rounded-full text-[24px] !h-[40px]"
                        onClick={() => {
                          if (productCount > 0) {
                            setProductCount(productCount - 1);
                          }
                        }}
                      />
                      <span className="text-[20px]">{productCount}</span>
                      <Button
                        title="+"
                        type="button"
                        extraStyle="rounded-full text-[24px] !h-[40px]"
                        onClick={() => {
                          setProductCount(productCount + 1);
                        }}
                      />
                    </div>
                    <div className="flex sm:flex-nowrap flex-wrap items-center gap-3">
                      <Button
                        title="Buy Now"
                        type="button"
                        extraStyle="uppercase !h-[40px] hover:!text-[#46A358] hover:!bg-transparent font-semibold border border-transparent hover:border-[#46A358]"
                        onClick={() => {
                          if (productCount > 0) {
                            setOpenModal(true);
                          } else {
                            toast.error("Please select quantity first");
                          }
                        }}
                      />
                      <Button
                        title="Add to Cart"
                        type="button"
                        extraStyle="uppercase !h-[40px] bg-transparent border border-[#46A358] !text-[#46A358] font-semibold hover:!text-white hover:bg-[#46A358]"
                        onClick={() => {
                          if (product?.product_id) {
                            handleBasket(product?.product_id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (product?.product_id) {
                            handleLike(product?.product_id);
                          }
                        }}
                        className={`w-[40px] h-[40px] flex items-center justify-center rounded border ${
                          product?.liked
                            ? "bg-white border-red-600"
                            : "bg-red-300 border-transparent"
                        }`}
                      >
                        {product?.liked ? (
                          <Heart
                            style={{ fill: "currentColor" }}
                            className={"text-red-600"}
                          />
                        ) : (
                          <Heart
                            style={{ fill: "currentColor" }}
                            className={"text-white"}
                          />
                        )}
                      </button>
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
      <ModalWrapper openModal={openModal} setOpenModal={setOpenModal}>
        {product ? (
          <div className="w-[400px]">
            <div className="w-full flex items-center flex-col">
              <Image
                src={"/ordered.png"}
                alt="Ordered"
                width={70}
                height={70}
                style={{
                  objectFit: "contain",
                  width: "70px",
                  height: "70px",
                }}
                priority
                className="h-[70px]"
              />
              <p className="text-[#727272] mt-4">
                {" "}
                Your order has been received
              </p>
            </div>
            <div className="flex border-y-[2px] border-[#46A3580F] py-4 justify-between mt-5">
              <div className="flex flex-col items-center">
                <span className="text-[#727272]">Order ID</span>
                <span className="text-[#727272] font-semibold">
                  {(function (min: number, max: number): number {
                    if (min >= max)
                      throw new Error("Min must be less than max");

                    const seed = new Date().getTime();

                    const random = (seed ^ (seed << 5)) % (max - min + 1);

                    return Math.abs(random) + min;
                  })(1, 100)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#727272]">Date</span>
                <span className="text-[#727272] font-semibold">5/12/2024</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#727272]">Total</span>
                <span className="text-[#727272] font-semibold">
                  {productCount * Number(product?.cost) + 16}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#727272]">Payment</span>
                <span className="text-[#727272] font-semibold">
                  Cash on delivery
                </span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Order details</p>
              <div className="flex justify-between my-3">
                <p>{product?.product_name}</p>
                <div className="flex items-center gap-3">
                  <p className="text-[#727272]">({productCount} x)</p>
                  <p>{product?.cost}</p>
                </div>
              </div>
              <div className="mt-[20px] flex flex-col gap-5">
                <div className="flex justify-between">
                  <span className="font-semibold">Shipping</span>
                  <span>$16</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span> {productCount * Number(product?.cost) + 16}</span>
                </div>
              </div>
              <div className="mt-[20px]">
                <p className="text-center">
                  Your order is currently being processed. You will receive an
                  order confirmation email shortly with the expected delivery
                  date for your items.
                </p>
              </div>

              <div className="flex justify-center mt-[50px]">
                {ordered ? (
                  <CustomOrderButton extraClass={"animate"} />
                ) : (
                  <Button
                    title="Track order"
                    type="button"
                    onClick={() => {
                      if (token) {
                        setOrdered(true);
                        setTimeout(() => {
                          setOrdered(false);
                          setOpenModal(false);
                          toast.success("Your order is on the way.");
                        }, 8000);
                      } else {
                        toast.error(
                          "You have not signed up yet. Please register or login."
                        );
                        setOpenModal(true);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mt-[50px]">
            <p className="text-lg font-bold text-gray-900">
              Your cart is empty
            </p>
          </div>
        )}
      </ModalWrapper>
    </>
  );
};

export default ProductPage;
