import Carousel from "@/components/Carousel/Carousel";
import MainImage from "../public/carousel-image1.png"
import { ReactNode } from "react";

export interface SingleDatTypes {
  id: number;
  title: string;
  description: string;
  image: ReactNode;
}

export default function Home() {
  const DATA = [
    {
      id: 1,
      title: "Title 1",
      description: "Description 1",
      image: "https://picsum.photos/200/300",  

    },
    {
      id: 2,
      title: "Title 2",
      description: "Description 2",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      title: "Title 3",
      description: "Description 3",
      image: "https://picsum.photos/200/300",
    },
  ];
  return (
    <main className="flex flex-col items-center justify-center text-center hero-background mt-3">
      <div className="container">
        <Carousel data={DATA} />
      </div>
    </main>
  );
}
