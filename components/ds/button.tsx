import { cva, VariantProps } from "cva";
import React from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  "flex items-center justify-center rounded-lg shadow border font-medium transition duration-50 ease-out enabled:active:shadow disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
  {
    variants: {
      intent: {
        primary:
          "border-cinnabar-600 bg-cinnabar-500 text-cinnabar-50 enabled:hover:bg-cinnabar-400 enabled:hover:text-white enabled:active:bg-cinnabar-500  dark:bg-cinnabar-300 dark:text-cinnabar-800 dark:enabled:hover:bg-cinnabar-400",
        secondary:
          "border-parchment-200 bg-parchment-50 text-parchment-950 enabled:hover:bg-white enabled:hover:text-parchment-900 enabled:active:bg-parchment-100",
        neutral: "bg-gray-400 text-gray-900 enabled:hover:bg-gray-400",
        link: "bg-transparent text-parchment-600 shadow-none enabled:hover:bg-transparent",
        icon: "bg-transparent border-none text-parchment-900 shadow-none enabled:hover:text-parchment-700 enabled:active:text-black enabled:active:shadow-none",
        "primary-outline":
          "border-2 border-cinnabar-500 bg-transparent text-cinnabar-600 enabled:hover:bg-cinnabar-50",
        "secondary-outline":
          "bg-transparent text-parchment-300 enabled:hover:bg-parchment-300 enabled:hover:bg-opacity-10",
        "neutral-outline":
          "bg-transparent text-white enabled:hover:bg-gray-300 enabled:hover:bg-opacity-10",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        small: "px-2 py-1 text-base enabled:hover:shadow-md",
        medium: "px-3 py-1.5 text-lg enabled:hover:shadow-md",
        large: "px-4 py-2 text-xl enabled:hover:shadow-md",
        xlarge: "px-5 py-2.5 text-2xl enabled:hover:shadow-lg",
        xxlarge: "px-6 py-3 text-3xl enabled:hover:shadow-lg",
        "xsmall-icon": "p-1 text-sm",
        "small-icon": "p-2 text-base",
        "medium-icon": "p-3 text-lg",
        "large-icon": "p-4 text-xl",
        "xlarge-icon": "p-5 text-2xl",
        "xxlarge-icon": "p-6 text-3xl",
      },
    },
    defaultVariants: {
      intent: "primary",
      fullWidth: false,
      size: "medium",
    },
  },
);

export interface Props
  extends VariantProps<typeof buttonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  intent,
  fullWidth,
  size,
  children,
  className = "",
  ...rest
}: Props) {
  const computedClassNames = twMerge(
    `${buttonStyles({
      intent,
      fullWidth,
      size,
    })}`,
    `${className}`,
  );
  return (
    <button className={computedClassNames} {...rest}>
      {children}
    </button>
  );
}
