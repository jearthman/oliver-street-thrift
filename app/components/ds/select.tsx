"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type SelectProps = {
  placeholder: string;
  options: string[];
};

export default function Select({ placeholder, options }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex appearance-none items-center gap-1 rounded-full border border-parchment-800 px-5 py-0.5 text-sm transition-colors duration-200 hover:bg-parchment-50 ${
          isOpen ? "bg-parchment-50" : "bg-white"
        }`}
      >
        <span>{selectedOption || placeholder}</span>
        <ChevronDown size={20} className={`${isOpen ? "rotate-180" : ""} -mr-1 transition-transform duration-200`} />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 flex w-full flex-col gap-1 rounded-md border border-parchment-800 bg-white p-1 text-sm shadow-md">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="w-full cursor-pointer rounded-md px-1 hover:bg-parchment-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
