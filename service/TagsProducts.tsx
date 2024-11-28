"use client";
import { Context } from "@/context/Context";
import React, { useContext } from "react";

interface TagTypes {
  id: number;
  name: string;
  tag: string | null;
}

const TagsProducts = () => {
  const { tagName, setTagName } = useContext(Context);
  const tags: TagTypes[] = [
    { id: 1, name: "All plants", tag: null },
    { id: 2, name: "New Arrivals", tag: "new-arrivals" },
    { id: 3, name: "Sale", tag: "sale" },
  ];
  return (
    <div className="w-full py-5">
      <ul
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {tags.map((tag) => (
          <li key={tag.id} onClick={() => setTagName(tag.tag)}>
            <p
              className={`${
                tag.tag === tagName
                  ? "text-green-600 border-green-600"
                  : "text-gray-900 border-transparent"
              } cursor-pointer border-b-[2px] pb-2`}
            >
              {tag.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsProducts;
