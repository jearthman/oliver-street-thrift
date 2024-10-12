export interface ArrowLeftIconProps {
  className?: string;
  strokeWidth?: number;
  size?: string;
}

export default function ArrowLeftIcon({
  className,
  strokeWidth = 1.5,
  size = "1em",
}: ArrowLeftIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      width={size}
      height={size}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
}
