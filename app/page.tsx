import Hero from "@/components/hero";
import Links from "../components/links";
import Nav from "../components/nav";
import { Girassol } from "next/font/google";
import { Collection } from "@/types/storefront.types";

import { sanityClient } from "@/src/sanity/lib/client";
import { HOME_PAGE_QUERY } from "@/src/sanity/lib/queries";
import { HomePage } from "@/src/sanity/types";
import { getSanityImageURL } from "@/src/sanity/lib/helpers";
import { shopifyClient } from "@/src/shopify/shopify";
import {
  BASIC_COLLECTION_IMAGE_QUERY,
  HOME_PAGE_COLLECTION_PRODUCTS_QUERY,
} from "@/src/shopify/queries";
import CollectionCarousel from "@/components/collection-carousel";
import FeatureSection from "@/components/feature-section";
import CategorySection from "@/components/category-section";
import YoutubeSection from "@/components/youtube-section";
import Button from "@/components/ds/button";
import ArrowRightIcon from "@/components/ds/icons/arrow-right";
import Footer from "@/components/footer";

const girassol = Girassol({ weight: "400", subsets: ["latin"] });

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
    collectionOneResponse.data?.collections.edges[0].node;

  const collectionTwoShopifyName =
    homePageContent.CollectionTwoShopifyCollection;
  const collectionTwoResponse = await shopifyClient.request(
    HOME_PAGE_COLLECTION_PRODUCTS_QUERY,
    {
      variables: {
        query: collectionTwoShopifyName,
      },
    },
  );

  const collectionTwo: Collection =
    collectionTwoResponse.data?.collections.edges[0].node;

  const featureSectionCollectionImageResponse = await shopifyClient.request(
    BASIC_COLLECTION_IMAGE_QUERY,
    {
      variables: {
        query: homePageContent.SectionOneShopifyCollection,
      },
    },
  );

  const featureSectionCollectionImageUrl =
    featureSectionCollectionImageResponse.data.collections.nodes[0].image.url;

  const collectionInfoList: Array<{
    name: string;
    imgUrl: string;
  }> = [];

  if (homePageContent.CategoryCollectionList) {
    const promises = homePageContent.CategoryCollectionList.map(
      async (category) => {
        const basicCollectionResponse = await shopifyClient.request(
          BASIC_COLLECTION_IMAGE_QUERY,
          {
            variables: {
              query: category.name,
            },
          },
        );

        const basicCollectionImageUrl =
          basicCollectionResponse.data.collections.nodes[0].image.url;

        return {
          name: category.name,
          imgUrl: basicCollectionImageUrl,
        };
      },
    );

    const results = await Promise.all(promises);
    collectionInfoList.push(...results);
  }

  const defaultVideoUrl: string =
    "https://www.youtube.com/embed/X_AxE1obuCc?si=JfQcOqw8grBBK32U";

  console.log(homePageContent);

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
        imgUrl={featureSectionCollectionImageUrl}
      />
      <CategorySection
        className="min-h-[550px] w-full"
        collectionInfoList={collectionInfoList}
      />
      <YoutubeSection
        className="min-h-[550px] w-full"
        videoUrl={homePageContent.VideoSectionLink || defaultVideoUrl}
      ></YoutubeSection>
      <CollectionCarousel
        className="min-h-[550px] w-full md:h-1/2"
        title={homePageContent.CollectionTwoTitle}
        subtitle={homePageContent.CollectionTwoSubtitle}
        collection={collectionTwo}
      ></CollectionCarousel>
      <Hero
        textAlignment="right"
        className="min-h-[550px] w-full md:h-1/2"
        title={homePageContent.HeroTwoTitle}
        imageURL={getSanityImageURL(homePageContent.HeroTwoImage)}
      />
      <div className="flex items-center justify-center gap-28 bg-cinnabar-500 py-8">
        <div className={`text-4xl font-bold text-white ${girassol.className}`}>
          SIGN UP FOR OUR NEWSLETTER
        </div>
        <div
          className={`flex w-64 items-center border-2 border-white bg-cinnabar-500 duration-500`}
        >
          <input
            type="text"
            className="peer h-full bg-cinnabar-500 py-1.5 pl-2 text-white placeholder:text-white placeholder:opacity-50 focus:outline-none focus:ring-0"
            placeholder="Enter Email"
          />
          <div className={`ml-auto flex transition-opacity duration-500`}>
            <Button intent="icon" size="small-icon">
              <ArrowRightIcon className="text-white" />
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
