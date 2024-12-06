"use client";

import { Context } from "@/context/Context";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import TagsProducts from "./TagsProducts";
import Pagination from "./Pagination/Pagination";
import ProductCard from "@/components/ui/ProductCard/ProductCard";

export interface ProductType {
  basket?: boolean;
  category_id?: string | null;
  cost?: number | undefined;
  count?: number;
  discount?: number;
  image_url?: string[];
  liked?: boolean;
  product_description?: string;
  product_id?: string | undefined;
  product_name?: string | undefined;
  product_statu?: string;
  short_description?: string;
  size?: string[];
  tags?: string[];
}

let PageSize: number = 9;

const ShowProducts = () => {
  const { categoryName, tagName, maxPrice, minPrice, size, token } =
    useContext(Context);

  const axiosInstance = useAxios();

  const fetchProducts = async () => {
    const response = await axiosInstance.get(`/products`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params: {
        page: 1,
        limit: 100,
        category: categoryName,
        tags: tagName,
        min_price: minPrice,
        max_price: maxPrice,
        size: size,
      },
    });
    return response?.data?.products || [];
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: [
      "products",
      "basket",
      "product",
      categoryName,
      tagName,
      maxPrice,
      minPrice,
      size,
    ],
    queryFn: fetchProducts,
    enabled: true,
  });

  const [sortOption, setSortOption] = useState<"price" | "alphabetical" | "">(
    ""
  );

  const sortedProducts = useMemo(() => {
    if (sortOption === "price") {
      return [...products].sort((a, b) => (a.cost ?? 0) - (b.cost ?? 0));
    }
    if (sortOption === "alphabetical") {
      return [...products].sort((a, b) =>
        (a.product_name ?? "").localeCompare(b.product_name ?? "")
      );
    }
    return products;
  }, [products, sortOption]);

  const handleSort = (option: "price" | "alphabetical") => {
    setSortOption(option);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedProducts]);

  return (
    <div className="w-full">
      <div className="w-full md:flex justify-between hidden">
        <TagsProducts />
        <div
          className="flex items-center"
          style={{
            gap: "10px",
          }}
        >
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
        ) : currentTableData.length > 0 ? (
          <>
            <div className="grid-container">
              {currentTableData.map((product: ProductType) => (
                <ProductCard
                  key={product?.product_id}
                  product={product}
                  height={250}
                  width={250}
                />
              ))}
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={sortedProducts.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
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
