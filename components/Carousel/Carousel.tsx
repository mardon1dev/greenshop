"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { SingleDatTypes } from "@/app/page";
import Image from "next/image";
import Button from "../ui/Button";

interface CarouselTypes {
  data: Array<SingleDatTypes>;
}

const Carousel: React.FC<CarouselTypes> = ({ data }) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}    
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="swiper-slide flex justify-between w-full ">
              <div className="max-w-[655px] text-left text-sm font-medium leading-4 tracking-widest">
                <span className="uppercase">Welcome to Greenshop</span>
                <p className="font-black text-[70px] leading-[70px] uppercase mt-2">
                  Let's Make Better <span className="text-green-700">Planet</span>
                </p>
                <p className="text-[#727272] mt-2">
                  We are an online plant shop offering a wide range of cheap and
                  trendy plants. Use our plants to create an unique Urban
                  Jungle. Order your favorite plants!
                </p>
                <Button title="SHOP NOW" type="button" extraStyle="mt-[42px]" />
              </div>
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  priority
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "400px",
                    height: "400px",
                  }}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
