"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./ds/button";
import { Collection } from "@/types/storefront.types";
import ArrowRightIcon from "./ds/icons/arrow-right";
import ArrowLeftIcon from "./ds/icons/arrow-left";
import { AnimatePresence, motion } from "framer-motion";

interface CollectionCarouselProps {
  className?: string;
  title?: string;
  subtitle?: string;
  collection: Collection;
}

export default function CollectionCarousel({
  title,
  subtitle,
  collection,
  className,
}: CollectionCarouselProps) {
  const [currentProducts, setCurrentProducts] = useState(
    collection.products.edges,
  );
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const imageSideLength = 240;

  const nextVariants = {
    initial: { x: imageSideLength + 32 },
    animate: { x: 0 },
    exit: { x: -imageSideLength - 32 },
  };

  const prevVariants = {
    initial: { x: -imageSideLength - 32 },
    animate: { x: 0 },
    exit: { x: imageSideLength + 32 },
  };

  const handlePrevClick = () => {
    setDirection("prev");
    const tempProducts = [...currentProducts];
    const poppedProduct = tempProducts.pop();
    if (poppedProduct) {
      tempProducts.unshift(poppedProduct);
    }
    setCurrentProducts(tempProducts);
  };

  const handleNextClick = () => {
    setDirection("next");
    const tempProducts = [...currentProducts];
    const shiftedProduct = tempProducts.shift();
    if (shiftedProduct) {
      tempProducts.push(shiftedProduct);
    }
    setCurrentProducts(tempProducts);
  };

  return (
    <div
      className={`${className} flex flex-col items-center bg-parchment-100 py-8`}
    >
      <h2 className="text-2xl font-semibold tracking-wider text-parchment-900">
        {title?.toLocaleUpperCase()}
      </h2>
      <p className="mb-8 text-sm tracking-wider text-parchment-900">
        {subtitle?.toLocaleUpperCase()}
      </p>
      <div className="relative my-auto flex w-[1240px] items-center justify-between">
        <Button
          intent="secondary"
          size="small-icon"
          className="group"
          onClick={handlePrevClick}
        >
          <ArrowLeftIcon
            className="text-parchment-900 group-hover:text-parchment-700"
            size="2em"
            strokeWidth={2.5}
          />
        </Button>
        <div className="hide-scroll-bar absolute left-1/2 flex -translate-x-1/2 gap-8 overflow-hidden px-8">
          <div className="absolute left-0 z-10 h-full w-8 bg-gradient-to-r from-parchment-100 to-transparent"></div>
          <div className="absolute right-0 z-10 h-full w-8 bg-gradient-to-l from-parchment-100 to-transparent"></div>
          <AnimatePresence mode="popLayout">
            {currentProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={`${product.node.id}-${direction}-${index}`}
                variants={direction === "next" ? nextVariants : prevVariants}
                initial="initial"
                animate="animate"
                exit={"exit"}
                transition={{ type: "spring", duration: 1, bounce: 0.1 }}
                className="group flex h-[340px] w-60 cursor-pointer flex-col"
              >
                <motion.div
                  layoutId={`image-${product.node.title}`}
                  className="overflow-hidden rounded shadow-md transition-shadow duration-500 ease-out group-hover:shadow-lg"
                >
                  <Image
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.title}
                    width={240}
                    height={240}
                  />
                </motion.div>
                <div className="mt-2 flex flex-grow flex-col">
                  <motion.h3
                    layoutId={`title-${product.node.title}`}
                    className="text-sm"
                  >
                    {product.node.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`price-${product.node.title}`}
                    className="mt-auto text-lg tracking-wide"
                  >
                    {product.node.priceRange.minVariantPrice.amount}{" "}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <Button
          intent="secondary"
          size="small-icon"
          className="group"
          onClick={handleNextClick}
        >
          <ArrowRightIcon
            className="text-parchment-900 group-hover:text-parchment-700"
            size="2em"
            strokeWidth={2.5}
          />
        </Button>
      </div>
      <button className="mt-8 rounded bg-red-600 px-4 py-2 text-white">
        VIEW ALL
      </button>
    </div>
  );
}
