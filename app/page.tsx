"use client";
import Carousel from "@/components/Carousel/Carousel";
import MainImage from "../public/carousel-image1.png";
import Image, { StaticImageData } from "next/image";
import Categories from "@/service/Categories";
import ShowProducts from "@/service/ShowProducts";
import RangeInput from "@/service/RangeInput/RangeInput";
import SizeProducts from "@/service/SizeProducts";
import { Toaster } from "react-hot-toast";

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
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <Carousel data={DATA} />
        <div className="w-full mt-[46px] mb-[46px] flex gap-[50px]">
          <div className="bg-[#FBFBFB] p-3 rounded md:block hidden">
            <Categories />
            <RangeInput />
            <SizeProducts />
            <div className="super-sale flex flex-col items-center rounded">
              <Image
                src={"/super-sale-top.png"}
                priority
                alt="Super-sale-top"
                width={266}
                height={65}
                style={{
                  objectFit: "contain",
                  width: "266px",
                  height: "65px",
                }}
                className="w-full max-w-[266px] h-[65px]"
              />
              <p className="uppercase">up to 70% off</p>
              <Image
                src={"/super-sale.png"}
                priority
                alt="Super-sale-top"
                width={266}
                height={370}
                style={{
                  objectFit: "cover",
                  width: "266px",
                  height: "370px",
                }}
              />
            </div>
          </div>
          <div className="w-full px-3">
            <ShowProducts />
          </div>
        </div>
      </div>
    </main>
  );
}
