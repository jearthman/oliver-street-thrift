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
        <Image
          src={imgUrl}
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="bg-cinnabar-500 flex h-full w-1/2 flex-col justify-center">
        <div className="ml-40">
          <h1 className="text-4xl font-semibold tracking-wider text-white">
            {title.toLocaleUpperCase()}
          </h1>
          <p className="mb-6 text-white">{subtitle}</p>
          <span className="hover:text-cinnabar-200 hover:border-cinnabar-200 mt-2 cursor-pointer border-b-2 border-white text-white transition-colors">
            SHOP {collectionName.toLocaleUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
