import { Collection } from "@/types/storefront.types";

interface FeatureSectionProps {
  className?: string;
  title: string;
  subtitle: string;
  collectionName: string;
}

export default function FeatureSection({
  className,
  title,
  subtitle,
  collectionName,
}: FeatureSectionProps) {
  return (
    <div className={`${className} flex`}>
      <div className="h-full w-1/2"></div>
      <div className="bg-cinnabar-500 h-full w-1/2"></div>
    </div>
  );
}
