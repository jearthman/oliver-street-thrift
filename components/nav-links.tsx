"use client";

import { useState } from "react";
import { NavigationCategory } from "@/src/sanity/types";
import Image from "next/image";

interface NavLinkProps {
  navCategories: NavigationCategory[];
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const chunkArray = (array: Array<any>, chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export default function NavLinks({ navCategories }: NavLinkProps) {
  const [activeCategory, setActiveCategory] =
    useState<NavigationCategory | null>(null);
  const [expandFlyout, setExpandFlyout] = useState(false);

  const handleMouseEnter = (category: NavigationCategory | null) => {
    setExpandFlyout(!!category);
    setTimeout(() => {
      setActiveCategory(category);
    }, 200);
  };

  return (
    <>
      <ul className="mx-auto flex items-center justify-between tracking-wider md:w-3/4 lg:w-2/3">
        {navCategories.map((category, index) => (
          <li
            id="nav-link"
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={() => handleMouseEnter(null)}
            className="cursor-pointer font-light relative uppercase leading-tight py-3"
            key={index}
          >
            <span
              className={`border-b transition-colors ${activeCategory?.name === category.name ? "border-parchment-950" : "border-transparent"}`}
            >
              {category.name}
            </span>
          </li>
        ))}
      </ul>
      <div
        onMouseEnter={() => handleMouseEnter(activeCategory!)}
        onMouseLeave={() => handleMouseEnter(null)}
        className={`absolute flex justify-center items-center top-11 bg-parchment-50 w-full overflow-hidden transition-height ease-in-out duration-500 ${
          expandFlyout ? "h-[300px]" : "delay-100 h-0"
        }`}
      >
        <div
          className={`flex md:w-2/3 lg:w-1/2 transition-opacity duration-200 ${expandFlyout ? "opacity-100 delay-300" : "opacity-0"}`}
        >
          {navCategories.map((category, index) => (
            <div
              key={index}
              className={`${
                activeCategory?.name === category.name ? "w-full" : "hidden"
              }`}
            >
              <div className={`flex w-full `}>
                <div>
                  <h1 className="font-bold tracking-wider mb-5">
                    SHOP ALL {category.name?.toUpperCase()}
                  </h1>
                  <div className="flex">
                    {chunkArray(category.Collections || [], 5).map(
                      (chunk, chunkIndex) => (
                        <ul key={chunkIndex} className="mr-5 last:mr-0">
                          {chunk.map((collection, index) => (
                            <li className="mb-3" key={index}>
                              <a className="border-b opacity-75 cursor-pointer border-transparent hover:border-parchment-950 hover:opacity-100">
                                {collection.displayName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )
                    )}
                  </div>
                </div>
                <div className="flex ml-auto">
                  {category?.navigationCards?.map((card, index) => (
                    <div key={index}>
                      <a href={card.shopifyCategory}></a>
                      <Image
                        priority
                        src={`https://cdn.sanity.io/images/${projectId}/${dataset}/${card.cardImage?.asset?._ref.replace(/^image-/, "").replace(/-(\w+)$/, ".$1")}`}
                        alt=""
                        width={150}
                        height={150}
                      ></Image>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
