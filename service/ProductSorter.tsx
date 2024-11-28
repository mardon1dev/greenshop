"use client"
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductSorterProps {
  products: Product[];
  onSort: (sortedProducts: Product[]) => void;
}

const ProductSorter: React.FC<ProductSorterProps> = ({ products, onSort }) => {
  const [sortOption, setSortOption] = useState<"price" | "alphabetical" | "">(
    ""
  );

  const handleSort = (option: "price" | "alphabetical") => {
    let sortedProducts = [...products];

    if (option === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "alphabetical") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setSortOption(option);
    onSort(sortedProducts);
  };

  return (
    <div className="product-sorter">
      <label htmlFor="sort-options" className="mr-2">
        Sort By:
      </label>
      <select
        id="sort-options"
        value={sortOption}
        onChange={(e) =>
          handleSort(e.target.value as "price" | "alphabetical")
        }
        className="border rounded-md px-2 py-1"
      >
        <option value="">Default</option>
        <option value="price">Price</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
    </div>
  );
};

export default ProductSorter;
