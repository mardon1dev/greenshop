"use client";
import React, { useState, useEffect, useContext } from "react";

import "./inputrange.css";
import Button from "@/components/ui/Button";
import { Context } from "@/context/Context";

const RangeInput = () => {
  const { maxPrice, minPrice, setMaxPrice, setMinPrice } = useContext(Context);
  const [sliderOneValue, setSliderOneValue] = useState(minPrice);
  const [sliderTwoValue, setSliderTwoValue] = useState(maxPrice);

  const fillColor = () => {
    const percent1 = (sliderOneValue / 1000) * 100;
    const percent2 = (sliderTwoValue / 1000) * 100;

    return `linear-gradient(to right, #99e4a7 ${percent1}% , #46A358 ${percent1}% , #46A358 ${percent2}%, #99e4a7 ${percent2}%)`;
  };

  const handleSlideOne = (value: number) => {
    if (sliderTwoValue - value <= 5) {
      setSliderOneValue(sliderTwoValue - 5);
    } else {
      setSliderOneValue(value);
    }
  };

  const handleSlideTwo = (value: number) => {
    if (value - sliderOneValue <= 5) {
      setSliderTwoValue(sliderOneValue + 5);
    } else {
      setSliderTwoValue(value);
    }
  };

  useEffect(() => {
    fillColor();
  }, [sliderOneValue, sliderTwoValue]);

  const handleFilterData = () => {
    setMinPrice(sliderOneValue);
    setMaxPrice(sliderTwoValue);
  };

  return (
    <>
      <div className="wrapper mt-[20px]">
        <div className="values">
          <p className="text-green-600">
            <span className="text-black">Price: </span>
            <span id="range1">${sliderOneValue}</span> -
            <span id="range2"> ${sliderTwoValue}</span>
          </p>
        </div>
        <div>
          <div
            className="slider-track"
            style={{ background: fillColor() }}
          ></div>
          <input
            type="range"
            min={0}
            max={1000}
            value={sliderOneValue}
            id="slider-1"
            onChange={(e) => handleSlideOne(Number(e.target.value))}
          />
          <input
            type="range"
            min={0}
            max={1000}
            value={sliderTwoValue}
            id="slider-2"
            onChange={(e) => handleSlideTwo(Number(e.target.value))}
          />
        </div>
      </div>
      <div
        className=""
        style={{
          marginTop: "30px",
        }}
      >
        <Button
          title="Filter"
          type="button"
          extraStyle="w-[90px]"
          onClick={handleFilterData}
        />
      </div>
    </>
  );
};

export default RangeInput;
