"use client";

import { Context } from "@/context/Context";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import TagsProducts from "./TagsProducts";

interface ProductType {
  basket?: boolean;
  category_id?: string | null;
  cost?: number | undefined;
  count?: number;
  discount?: number;
  image_url?: string[];
  liked?: boolean;
  product_description?: string;
  product_id?: string;
  product_name?: string | undefined;
  product_statu?: string;
  short_description?: string;
  size?: string[];
  tags?: string[];
}

const ShowProducts = () => {
  const { categoryName, tagName, maxPrice, minPrice } = useContext(Context);

  const axiosInstance = useAxios();

  const fetchProducts = async () => {
    const response = await axiosInstance.get(`/products`, {
      params: {
        page: 1,
        limit: 100,
        category: categoryName,
        tags: tagName,
        min_price: minPrice,
        max_price: maxPrice,
      },
    });
    return response?.data?.products || [];
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", categoryName, tagName, maxPrice, minPrice],
    queryFn: fetchProducts,
  });

  // Sorting state and logic
  const [sortedProducts, setSortedProducts] = useState<ProductType[] | []>(
    products
  );
  const [sortOption, setSortOption] = useState<"price" | "alphabetical" | "">(
    ""
  );

  const handleSort = (option: "price" | "alphabetical") => {
    const sorted = [...products];

    if (option === "price") {
      sorted.sort((a, b) => (a.cost ?? 0) - (b.cost ?? 0));
    } else if (option === "alphabetical") {
      sorted.sort((a, b) =>
        (a.product_name ?? "").localeCompare(b.product_name ?? "")
      );
    }

    setSortOption(option);
    setSortedProducts(sorted);
  };

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <TagsProducts />
        <div className="flex items-center" style={{
            gap: "10px",
        }}>
          <label htmlFor="sort-options" className="mr-2">
            Sort:
          </label>
          <select
            id="sort-options"
            value={sortOption}
            onChange={(e) =>
              handleSort(e.target.value as "price" | "alphabetical")
            }
            className="rounded-md px-2 py-1"
          >
            <option value="">Default</option>
            <option value="price">Price</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        {isLoading ? (
          <div>Loading...</div>
        ) : sortedProducts.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: "70px",
              justifyContent: "space-between",
            }}
          >
            {sortedProducts.map((product: ProductType) => (
              <div key={product.product_id}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    priority
                    src={
                      product?.image_url ? product?.image_url[0] : "/logo.svg"
                    }
                    alt={product?.product_name ?? "Image"}
                    width={250}
                    height={250}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "250px",
                      height: "250px",
                    }}
                  />
                  {product.discount && (
                    <span className="absolute top-0 py-2 px-4 text-[16px] bg-green-600 text-white">
                      {(
                        (Number(product?.discount) /
                          (Number(product.cost) + Number(product?.discount))) *
                        100
                      ).toFixed()}{" "}
                      OFF
                    </span>
                  )}
                  <div className="absolute bottom-0 w-full flex items-center justify-center gap-3">
                    <button
                      style={{
                        padding: "8px",
                      }}
                      className="bg-white rounded"
                    >
                      <Heart />
                    </button>
                    <button
                      style={{
                        padding: "8px",
                      }}
                      className="bg-white rounded"
                    >
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
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#CBCBCB",
                        marginLeft: "16px",
                      }}
                    >
                      $
                      {(
                        Number(product.cost) + Number(product.discount)
                      ).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProducts;
