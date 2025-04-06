"use client";

import { useRouter } from "next/navigation";
import { slugToTitle } from "@/src/sanity/lib/helpers";

export default function BreadCrumbs({ slug }: { slug: string[] }) {
  const router = useRouter();
  const capitalizedSlug = slug.map((segment) => slugToTitle(segment));

  return (
    <span className="font-light">
      <span onClick={() => router.push("/")} className="cursor-pointer">
        Home{" "}
      </span>
      {capitalizedSlug.map((segment, index) => {
        const path = `/collection/${slug.slice(0, index + 1).join("/")}`;
        return (
          <span
            key={segment}
            onClick={() => router.push(path)}
            className="cursor-pointer"
          >
            / <span className="last:font-medium last:underline">{segment}</span>
          </span>
        );
      })}
    </span>
  );
}
