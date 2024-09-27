import Hero from "@/components/hero";
import Links from "../components/links";
import Nav from "../components/nav";
import { Collection } from "@/types/storefront.types";

import { sanityClient } from "@/src/sanity/lib/client";
import { HOME_PAGE_QUERY } from "@/src/sanity/lib/queries";
import { HomePage } from "@/src/sanity/types";
import { getSanityImageURL } from "@/src/sanity/lib/helpers";
import { shopifyClient } from "@/src/shopify/shopify";
import { HOME_PAGE_COLLECTION_PRODUCTS_QUERY } from "@/src/shopify/queries";
import CollectionCarousel from "@/components/collection-carousel";
import FeatureSection from "@/components/featured-section";

export default async function Home() {
  const homePageContent: HomePage = (
    await sanityClient.fetch(HOME_PAGE_QUERY)
  )[0];

  // console.log(homePageContent);
  const collectionOneShopifyName =
    homePageContent.CollectionOneShopifyCollection;
  const collectionOneResponse = await shopifyClient.request(
    HOME_PAGE_COLLECTION_PRODUCTS_QUERY,
    {
      variables: {
        query: collectionOneShopifyName,
      },
    },
  );

  const collectionOne: Collection =
    collectionOneResponse.data.collections.edges[0].node;

  console.log(collectionOne.products.edges[0].node.id);

  return (
    <main className="flex min-h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div className="fixed top-0 z-50 flex h-28 w-full flex-col">
        <Nav />
        <Links />
      </div>
      <Hero
        className="mt-28 min-h-[550px] w-full md:h-1/2"
        title={homePageContent.HeroTitle}
        imageURL={getSanityImageURL(homePageContent.HeroImage)}
      />
      <CollectionCarousel
        className="min-h-[550px] w-full md:h-1/2"
        title={homePageContent.CollectionOneTitle}
        subtitle={homePageContent.CollectionOneSubtitle}
        collection={collectionOne}
      ></CollectionCarousel>
      <FeatureSection
        className="h-[300px] w-full"
        title={homePageContent.SectionOneTitle || "Default Title"}
        subtitle={homePageContent.SectionOneSubtitle || "Default Subtitle"}
        collectionName={
          homePageContent.SectionOneShopifyCollection || "Collection Name"
        }
      />
    </main>
  );
}
