/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface FeatureSectionProps {
  className?: string;
  title: string;
  subtitle: string;
  collectionName: string;
  imgUrl: string;
}

export default function FeatureSection({
  className,
  title,
  subtitle,
  collectionName,
  imgUrl,
}: FeatureSectionProps) {
  return (
    <div className={`${className} flex`}>
      <div className="relative h-full w-1/2">
        <img
          loading="lazy"
          src={imgUrl}
          alt=""
          className="absolute h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex h-full w-1/2 flex-col justify-center bg-cinnabar-500">
        <div className="ml-40">
          <h1 className="text-4xl font-semibold tracking-wider text-white">
            {title.toLocaleUpperCase()}
          </h1>
          <p className="mb-6 text-white">{subtitle}</p>
          <span className="mt-2 cursor-pointer border-b-2 border-white text-white transition-colors hover:border-cinnabar-200 hover:text-cinnabar-200">
            SHOP {collectionName.toLocaleUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
