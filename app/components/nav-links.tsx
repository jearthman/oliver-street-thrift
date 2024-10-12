/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { NavigationCategory } from "@/src/sanity/types";
import Image from "next/image";
import ArrowRightIcon from "./ds/icons/arrow-right";
import { getSanityImageURL } from "@/src/sanity/lib/helpers";
import Link from "next/link";

interface NavLinkProps {
  navCategories: NavigationCategory[];
}

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
  const [isContentVisible, setIsContentVisible] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(
    (category: NavigationCategory | null) => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      setExpandFlyout(true);
      setActiveCategory(category);
      setTimeout(() => {
        setIsContentVisible(true);
      }, 0);
    },
    [],
  );

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const { clientX, clientY } = e;
      const { left, right, top, bottom } = containerRect;

      // Check if the mouse is within the expanded area or moving towards it
      if (
        clientX >= left &&
        clientX <= right &&
        clientY >= top - 20 &&
        clientY <= bottom // Added tolerance above the container
      ) {
        return; // Mouse is still within the component or moving towards it, don't close
      }
    }

    setIsContentVisible(false);
    closeTimeoutRef.current = setTimeout(() => {
      setExpandFlyout(false);
      setActiveCategory(null);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <ul className="mx-auto flex items-center justify-between tracking-wider md:w-3/4 lg:w-2/3">
        {navCategories.map((category, index) => (
          <li
            id="nav-link"
            onMouseEnter={() => handleMouseEnter(category)}
            className="relative cursor-pointer py-3 font-light uppercase leading-tight"
            key={index}
          >
            <Link
              href={`/${category.slug?.current}`}
              className={`border-b transition-colors ${activeCategory?.name === category.name ? "border-parchment-950" : "border-transparent"}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <div
        onMouseEnter={() => handleMouseEnter(activeCategory)}
        onMouseLeave={handleMouseLeave}
        className={`top-[2.75rem - 1px] absolute flex w-full items-center justify-center overflow-hidden bg-parchment-50 transition-all duration-300 ease-in-out ${
          expandFlyout ? "h-[300px]" : "h-0"
        }`}
      >
        <div
          className={`flex transition-opacity duration-300 ease-in-out ${
            isContentVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {navCategories.map((category, index) => (
            <div
              key={index}
              className={`${
                activeCategory?.name === category.name ? "w-full" : "hidden"
              }`}
            >
              <div className={`flex w-full`}>
                <div>
                  <h1 className="mb-5 font-bold tracking-wider">
                    SHOP ALL {category.name?.toUpperCase()}
                  </h1>
                  <div className="flex">
                    {chunkArray(category.Collections || [], 5).map(
                      (chunk, chunkIndex) => (
                        <ul key={chunkIndex} className="mr-5 last:mr-0">
                          {chunk.map((collection, index) => (
                            <li className="mb-3" key={index}>
                              <a className="cursor-pointer underline decoration-transparent opacity-75 transition-colors duration-500 ease-out hover:decoration-parchment-950 hover:opacity-100">
                                {collection.displayName}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </div>
                <div className="ml-24 flex gap-10">
                  {category?.navigationCards?.map((card, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative h-[200px] w-[200px] overflow-hidden rounded-sm shadow transition-shadow duration-500 ease-out group-hover:shadow-lg">
                        <img
                          src={getSanityImageURL(card.cardImage)}
                          alt=""
                          width={200}
                          height={200}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <span className="underline decoration-transparent transition-colors duration-500 ease-out group-hover:decoration-parchment-950">
                          {card.title}
                        </span>
                        <ArrowRightIcon strokeWidth={3} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
