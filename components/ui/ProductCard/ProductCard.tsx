"use client";
import React, { useState } from "react";
import { ProductType } from "@/service/ShowProducts";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

import { useRouter } from "next/navigation";

import "./product.css";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";

const ProductCard: React.FC<{ product: ProductType }> = ({ product }) => {

  const router = useRouter()
  const token = localStorage.getItem("access_token");
  const axiosInstance = useAxios();

  const [liked, setLiked] = useState(product?.liked || false);

  const likeMutation = useMutation({
    mutationFn: async (id: string ) => {
      const response = await axiosInstance.post(`/like/${id}`,{}, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response?.data || null;
    },
    onSuccess: () => {
      setLiked(!liked);
    },
    onError: (error) => {
      console.error("Error liking product:", error);
    },
  });

  const handleLike = () => {
    likeMutation.mutate(product?.product_id ? product?.product_id : "");
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <Image
          priority
          src={product?.image_url ? product?.image_url[0] : "/logo.svg"}
          alt={product?.product_name ?? "Image"}
          width={250}
          height={250}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "250px",
            height: "250px",
          }}
          onClick={()=>{
            router.push(`/shop/${product?.product_id}`)
          }}
        />
        {product.discount && (
          <span className="discount-badge">
            {(
              (Number(product?.discount) /
                (Number(product.cost) + Number(product?.discount))) *
              100
            ).toFixed()}{" "}
            OFF
          </span>
        )}
        <div className="action-buttons">
          <button
            className={`action-button ${
              liked ? "text-green-600" : ""
            }`}
            onClick={() => handleLike()}
          >
            <Heart />
          </button>
          <button className="action-button">
            <ShoppingCart />
          </button>
        </div>
      </div>
      <h2>{product.product_name}</h2>
      <div className="flex space-x-4">
        <p className="text-[#46A358] font-semibold">
          ${product?.cost?.toFixed(2)}
        </p>
        {product.discount && (
          <p className="original-price">
            ${(Number(product.cost) + Number(product.discount)).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
