"use client";

import { ChevronDown } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown");
  }
  return context;
}

type DropdownProps = {
  children: React.ReactNode;
};

function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownRef]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Trigger = function Trigger({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useDropdown();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`flex appearance-none items-center gap-1 rounded-full border border-parchment-800 px-5 py-0.5 text-sm transition-colors duration-200 hover:bg-parchment-50 ${
        isOpen ? "bg-parchment-50" : "bg-white"
      }`}
    >
      {children}
      <ChevronDown size={20} className={`${isOpen ? "rotate-180" : ""} -mr-1 transition-transform duration-200`} />
    </button>
  );
};

Dropdown.Content = function Content({ children }: { children: React.ReactNode }) {
  const { isOpen } = useDropdown();

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full z-10 mt-1 w-fit rounded-md border border-parchment-800 bg-white p-1 text-sm shadow-md">
      {children}
    </div>
  );
};

export default Dropdown;
