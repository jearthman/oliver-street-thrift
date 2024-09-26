import { SanityImageCrop, SanityImageHotspot } from "../types";
import { internalGroqTypeReferenceTo } from "../types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

type SanityImage =
  | {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    }
  | undefined;

export function getSanityImageURL(image: SanityImage) {
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${image?.asset?._ref.replace(/^image-/, "").replace(/-(\w+)$/, ".$1")}`;
}
