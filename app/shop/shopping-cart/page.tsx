"use client";
import ModalWrapper from "@/components/Modal";
import Button from "@/components/ui/Button";
import CustomOrderButton from "@/components/ui/CustomOrderButton.tsx/CustomOrderButton";
import { Context } from "@/context/Context";
import { useAxios } from "@/hooks/useAxios";
import { useBasketMutation } from "@/hooks/useBasketMutation";
import { ProductType } from "@/service/ShowProducts";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface NewProductInterFace extends ProductType {
  quantity: number;
}

const ShoppingCart = () => {
  const { token } = useContext(Context);
  const [basketProducts, setBasketProducts] = useState<NewProductInterFace[]>(
    []
  );

  const [coupon, setCoupon] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [ordered, setOrdered] = useState<boolean>(false);

  const axiosInstance = useAxios();

  const { data: basket = [], refetch: refetchBasket } = useQuery({
    queryKey: ["basket"],
    queryFn: async () => {
      const response = await axiosInstance.get("/basket", {
        params: { page: 1, limit: 100 },
        headers: token ? { Authorization: `${token}` } : {},
      });
      return response?.data?.ProductId || [];
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (basket.length > 0) {
      setBasketProducts((prevProducts) => {
        const newProducts = basket.map((product: ProductType) => ({
          ...product,
          quantity: 1,
        }));

        const isSame =
          prevProducts.length === newProducts.length &&
          prevProducts.every(
            (prev, index) =>
              prev.product_id === newProducts[index].product_id &&
              prev.quantity === newProducts[index].quantity
          );

        return isSame ? prevProducts : newProducts;
      });
    } else if (basket.length === 0 && basketProducts.length > 0) {
      setBasketProducts([]);
    }
  }, [basket, basketProducts.length]);

  const basketMutation = useBasketMutation();

  const handleBasket = (id: string) => {
    basketMutation.mutate(id, {
      onSuccess: () => {
        const productExists = basketProducts.some(
          (product) => product?.product_id === id && product?.basket
        );
        toast[productExists ? "error" : "success"](
          productExists ? "Product removed." : "Product added."
        );
        refetchBasket();
      },
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setBasketProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === id
          ? { ...product, quantity: Math.max(product.quantity + delta, 1) }
          : product
      )
    );
  };

  const calculateTotal = () => {
    return basketProducts.reduce(
      (total, product) => total + Number(product.cost) * product.quantity,
      0
    );
  };

  const addCoupon = () => setCoupon(50);

  return (
    <>
      {basketProducts.length > 0 ? (
        <div className="flex lg:justify-between lg:items-start lg:flex-row flex-col items-end">
          <div className="overflow-y-scroll max-h-[500px] w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600">
                      Products
                    </th>
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600 hidden sm:table-cell">
                      Price
                    </th>
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600">
                      Quantity
                    </th>
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600 hidden md:table-cell">
                      Total
                    </th>
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {basketProducts.map((product) => (
                    <tr
                      key={product?.product_id}
                      className="border-b border-gray-200"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                            <Image
                              src={
                                product.image_url
                                  ? product?.image_url[0]
                                  : "/logo.svg"
                              }
                              alt={product?.product_name ?? "Product"}
                              className="object-cover h-full w-full"
                              width={70}
                              height={70}
                              style={{
                                objectFit: "contain",
                                objectPosition: "top ",
                                width: "70px",
                                height: "70px",
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm lg:text-base">
                              {product?.product_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm lg:text-base hidden md:table-cell">
                        ${product?.cost}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              if (product?.quantity > 1) {
                                updateQuantity(product?.product_id, -1);
                              } else if (product?.quantity == 1) {
                                if (product?.product_id) {
                                  handleBasket(product?.product_id);
                                }
                              }
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200"
                          >
                            <span>-</span>
                          </button>
                          <span className="w-8 text-center text-sm lg:text-base">
                            {product?.quantity}
                          </span>
                          <button
                            onClick={() => {
                              if (product?.product_id) {
                                updateQuantity(product?.product_id, 1);
                              }
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200"
                          >
                            <span>+</span>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-green-500 hidden sm:table-cell">
                        ${Number(product.cost) * product.quantity}
                      </td>
                      <td className="md:py-4 md:px-6 py-2 px-3">
                        <button
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          onClick={() => {
                            if (product?.product_id) {
                              handleBasket(product?.product_id);
                            }
                          }}
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full max-w-[400px] p-6 space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Cart Totals</h2>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Coupon Apply</p>
              <div className="flex relative">
                <input
                  type="text"
                  placeholder="Enter coupon code here..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 border border-green-400 text-sm w-full h-[40px] outline-none text-green-600"
                />
                <button
                  className="px-6 bg-green-500 text-white absolute right-0 h-[40px]"
                  onClick={() => {
                    if (couponCode) {
                      addCoupon();
                    }
                  }}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateTotal()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Coupon Discount</span>
                <span className="text-gray-600">
                  (-) {couponCode ? coupon : 0}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shiping</span>
                <div className="text-right">
                  <span className="block font-medium">$16.00</span>
                  <button className="text-sm text-green-500 hover:text-green-600">
                    View shipping charge
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-medium text-green-500">
                  {calculateTotal() > 0 ? (
                    <p>${calculateTotal() + 16 - coupon}</p>
                  ) : (
                    <p>0</p>
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full py-3 bg-green-500 text-white hover:bg-green-600 transition-colors font-medium"
                onClick={() => setOpenModal(true)}
              >
                Proceed To Checkout
              </button>
              <button className="w-full text-center text-green-500 hover:text-green-600 transition-colors">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            Your shopping cart is empty.
          </div>
        </div>
      )}

      <ModalWrapper openModal={openModal} setOpenModal={setOpenModal}>
        {basketProducts.length > 0 ? (
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
                  {calculateTotal() > 0 ? (
                    <p>${calculateTotal() + 16 - coupon}</p>
                  ) : (
                    <p>0</p>
                  )}
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
              <p className="text-[#3D3D3D] font-semibold">Order details</p>
              <table className="border-b-[2px] border-[#46A3580F]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600">
                      Products
                    </th>
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600">
                      Quantity
                    </th>
                    <th className="md:py-4 md:px-6 py-2 px-3 text-left font-semibold text-gray-600">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {basketProducts.map((product) => (
                    <tr
                      key={product?.product_id}
                      className="border-b border-gray-200"
                    >
                      <td className="md:py-4 md:px-6 py-2 px-3">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                            <Image
                              src={
                                product.image_url
                                  ? product?.image_url[0]
                                  : "/logo.svg"
                              }
                              alt={product?.product_name ?? "Product"}
                              className="object-cover h-full w-full"
                              width={70}
                              height={70}
                              style={{
                                objectFit: "contain",
                                objectPosition: "center",
                                width: "70px",
                                height: "70px",
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {product?.product_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="md:py-4 md:px-6 py-2 px-3 text-gray-600">
                        (x{product?.quantity})
                      </td>
                      <td className="md:py-4 md:px-6 py-2 px-3 font-medium text-green-500">
                        ${Number(product.cost) * product.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-[20px] flex flex-col gap-5">
                <div className="flex justify-between">
                  <span className="font-semibold">Shipping</span>
                  <span>$16</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span>{calculateTotal() + 16 - coupon}</span>
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
                      setOrdered(true);
                      setTimeout(() => {
                        basket.map((product: ProductType) => {
                          if (product?.product_id) {
                            basketMutation.mutate(product?.product_id);
                          }
                        });
                        setOrdered(false);
                        setBasketProducts([]);
                        setOpenModal(false);
                        toast.success("Your order is on the way.");
                      }, 8000);
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

export default ShoppingCart;
