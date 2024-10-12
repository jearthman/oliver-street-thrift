/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";

type CategorySectionProps = {
  className: string;
  collectionInfoList: {
    name: string;
    imgUrl: string;
  }[];
};

export default function CategorySection({
  className,
  collectionInfoList,
}: CategorySectionProps) {
  return (
    <div
      className={`${className} relative flex flex-col items-center bg-parchment-100 py-16`}
    >
      <h2 className="text-3xl font-semibold tracking-wider text-parchment-900">
        SHOP BY CATEGORY
      </h2>
      <div className="hide-scroll-bar absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-8 overflow-hidden px-8">
        {collectionInfoList.map((collection) => (
          <div
            className="group flex w-60 cursor-pointer flex-col"
            key={collection.name}
          >
            <div className="overflow-hidden rounded shadow transition-shadow duration-500 ease-out group-hover:shadow-lg">
              <img
                loading="lazy"
                src={collection.imgUrl}
                alt={collection.name}
                width={240}
                height={240}
                className="object-cover object-center"
              />
            </div>
            <h3 className="mt-2 text-center font-semibold tracking-wide underline decoration-transparent transition-colors duration-500 ease-out group-hover:decoration-parchment-900">
              SHOP {collection.name.toLocaleUpperCase()}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
