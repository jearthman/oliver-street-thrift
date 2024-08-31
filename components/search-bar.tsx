"use client";

import { useEffect, useState, useRef } from "react";
import Button from "./ds/button";
import ArrowRightIcon from "./ds/icons/arrow-right";
import SearchIcon from "./ds/icons/search-icon";
import XMarkIcon from "./ds/icons/x-mark-icon";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  return (
    <div
      className={`flex w-64 items-center rounded-full border-2 border-parchment-800 bg-parchment-50 transition-width duration-500 focus-within:w-96 ${query && "w-96"}`}
    >
      <SearchIcon className="mx-2 opacity-50" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="peer h-full py-1.5 bg-parchment-50 placeholder:text-parchment-950 placeholder:opacity-75 focus:outline-none focus:ring-0"
        placeholder="Search for Items"
      />

      <div
        className={`ml-auto mr-2 flex gap-2 ${query ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      >
        {isVisible && (
          <>
            <Button
              intent="icon"
              size="small-icon"
              onClick={(e) => {
                e.preventDefault();
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <XMarkIcon />
            </Button>
            <Button intent="icon" size="small-icon">
              <ArrowRightIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
