import React from "react";
import Image from "next/image";
import Button from "./ds/button";

interface HeroProps {
  className?: string;
  title?: string;
  imageURL: string;
  textAlignment?: "left" | "right";
}

export default function Hero({
  title,
  imageURL,
  className,
  textAlignment = "left",
}: HeroProps) {
  const alignmentClasses =
    textAlignment === "right"
      ? "right-1/2 translate-x-1/2 md:translate-x-3/4 lg:translate-x-full"
      : "left-1/2 -translate-x-1/2 md:-translate-x-3/4 lg:-translate-x-full";

  return (
    <div className={`${className} relative`}>
      <Image
        src={imageURL}
        alt=""
        fill
        className="object-cover object-center"
      />
      <div className="absolute z-10 h-full w-full bg-gradient-to-r from-black to-transparent opacity-75"></div>
      <div
        className={`absolute z-20 flex h-full w-[400px] ${alignmentClasses} flex-col justify-center text-3xl text-parchment-50 md:w-[600px] md:text-5xl`}
      >
        <div>{title}</div>
        <Button className="mt-6 w-72 border-none" intent="secondary">
          SHOP NOW
        </Button>
      </div>
    </div>
  );
}
