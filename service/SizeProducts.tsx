"use client";
import { Context } from "@/context/Context";
import React, { useContext } from "react";

interface SizeTypes {
  id: number;
  size: string;
}

const SizeProducts = () => {
  const { size, setSize } = useContext(Context);

  const sizeArray: SizeTypes[] = [
    { id: 1, size: "Small" },
    { id: 2, size: "Medium" },
    { id: 3, size: "Large" },
  ];
  return (
    <div className="mt-[20px]">
      <h1>Sizes</h1>
      <ul className="p-3 space-y-3">
        {sizeArray.map((type: SizeTypes) => (
          <li
            key={type.id}
            onClick={() => {
              setSize(type.size);
            }}
          >
            <span
              className={`${
                type.size === size ? "text-green-600" : "text-gray-900"
              } cursor-pointer`}
            >
              {type.size}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeProducts;
