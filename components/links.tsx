import { sanityClient } from "@/src/sanity/lib/client";
import { NAV_QUERY } from "@/src/sanity/lib/queries";
import { NavigationCategory } from "@/src/sanity/types";
import NavLinks from "./nav-links";

export default async function Links() {
  const navCategoryList = await sanityClient.fetch(NAV_QUERY);

  const navCategories: NavigationCategory[] =
    navCategoryList[0].OrderedNavigationCategories;

  return (
    <div className="bg-parchment-50 text-parchment-950 relative h-11 z-50">
      <NavLinks navCategories={navCategories} />
    </div>
  );
}
