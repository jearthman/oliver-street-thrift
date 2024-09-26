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
    <main className="flex h-screen w-screen flex-col">
      <Nav />
      <Links />
      <Hero
        className="h-1/3 w-full md:h-1/2"
        title={homePageContent.HeroTitle}
        imageURL={getSanityImageURL(homePageContent.HeroImage)}
      />
      <CollectionCarousel
        className="h-1/3 w-full md:h-1/2"
        title={homePageContent.CollectionOneTitle}
        subtitle={homePageContent.CollectionOneSubtitle}
        collection={collectionOne}
      ></CollectionCarousel>
    </main>
  );
}
