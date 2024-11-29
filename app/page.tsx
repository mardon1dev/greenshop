"use client";
import Carousel from "@/components/Carousel/Carousel";
import MainImage from "../public/carousel-image1.png";
import { StaticImageData } from "next/image";
import Categories from "@/service/Categories";
import ShowProducts from "@/service/ShowProducts";
import RangeInput from "@/service/RangeInput/RangeInput";
import SizeProducts from "@/service/SizeProducts";

export interface SingleDatTypes {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

export default function Home() {
  const DATA = [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      image: MainImage,
    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      image: MainImage,
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 3",
      image: MainImage,
    },
  ];
  return (
    <main className="mt-[12px]">
      <div className="container">
        <Carousel data={DATA} />
        <div className="w-full mt-[46px] mb-[46px] flex gap-[50px]">
          <div className="bg-[#FBFBFB] p-3 rounded">
            <Categories />
            <RangeInput />
            <SizeProducts />
          </div>
          <div className="w-full">
            <ShowProducts />
          </div>
        </div>
      </div>
    </main>
  );
}
