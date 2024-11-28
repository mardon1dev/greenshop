import Carousel from "@/components/Carousel/Carousel";
import MainImage from "../public/carousel-image1.png"
import { StaticImageData } from "next/image";

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
    <main className=" mt-[12px]">
      <div className="container">
        <Carousel data={DATA} />
      </div>
    </main>
  );
}
