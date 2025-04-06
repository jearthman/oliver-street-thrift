import { HTMLInputTypeAttribute, useRef } from "react";

type InputProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: (value: string) => void;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
};

export default function Input({ type = "text", placeholder, onChange, prepend, append }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex min-w-28 cursor-text items-center gap-1 rounded-md border border-parchment-800 px-2 py-1 focus-within:border-parchment-600"
      onClick={handleWrapperClick}
    >
      {prepend}
      <input
        ref={inputRef}
        className="w-full border-none bg-transparent outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {append}
    </div>
  );
}
