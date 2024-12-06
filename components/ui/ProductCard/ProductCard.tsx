"use client";
import { ProductType } from "@/service/ShowProducts";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

import { useRouter } from "next/navigation";

import { useLikeMutation } from "@/hooks/useLikeMutation";
import { useBasketMutation } from "@/hooks/useBasketMutation";
import "./product.css";
import toast from "react-hot-toast";

interface ProductInterface {
  product: ProductType;
  width: number;
  height: number;
}

const ProductCard: React.FC<ProductInterface> = ({
  product,
  width,
  height,
}) => {
  const router = useRouter();

  const likeMutation = useLikeMutation();
  const basketMutation = useBasketMutation();

  const handleLike = () => {
    if (product?.product_id) {
      likeMutation.mutate(product.product_id, {
        onSuccess: () => {
          if (product?.liked) {
            toast.error("Product disliked.");
          } else {
            toast.success("Product liked.");
          }
        },
      });
    }
  };

  const handleBasket = () => {
    if (product?.product_id) {
      basketMutation.mutate(product.product_id, {
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
    <div
      className={`product-card`}
      style={{
        width: "100%",
      }}
    >
      <div className="product-image-wrapper">
        <Image
          priority
          src={product?.image_url ? product?.image_url[0] : "/logo.svg"}
          alt={product?.product_name || "Image"}
          width={width}
          height={height}
          style={{
            objectFit: "contain",
            width: `${width}px`,
            height: `${height}px`,
          }}
          layout="responsive"
          onClick={() => {
            router.push(`/shop/${product?.product_id}`);
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
            className={`${
              product?.liked ? "bg-white" : "bg-green-600"
            } action-button`}
            onClick={() => handleLike()}
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
          <button
            className={`action-button ${
              product?.basket ? "bg-white" : "bg-green-600"
            }`}
            onClick={() => handleBasket()}
          >
            {product?.basket ? (
              <ShoppingCart
                style={{ fill: "currentColor" }}
                className={"text-blue-800"}
              />
            ) : (
              <ShoppingCart
                style={{ fill: "currentColor" }}
                className={"text-white"}
              />
            )}
          </button>
        </div>
      </div>
      <div>
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
    </div>
  );
};

export default ProductCard;
