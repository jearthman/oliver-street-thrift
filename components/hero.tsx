import React from "react";
import Image from "next/image";
import Button from "./ds/button";

interface HeroProps {
  className?: string;
  title?: string;
  imageURL: string;
}

export default function Hero({ title, imageURL, className }: HeroProps) {
  return (
    <div className={`${className} relative`}>
      <Image
        src={imageURL}
        alt=""
        fill
        className="object-cover object-center"
      />
      <div className="absolute z-10 h-full w-full bg-gradient-to-r from-black to-transparent opacity-75"></div>
      <div className="absolute left-1/2 z-20 flex h-full w-[400px] -translate-x-1/2 flex-col justify-center text-3xl text-parchment-50 md:w-[600px] md:-translate-x-3/4 md:text-5xl lg:-translate-x-full">
        <div>{title}</div>
        <Button className="mt-6 w-1/2 border-none" intent="secondary">
          SHOP NOW
        </Button>
      </div>
    </div>
  );
}
