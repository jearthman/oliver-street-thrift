import React from "react";
import { sanityClient } from "@/src/sanity/lib/client";
import { shopifyClient } from "@/src/shopify/shopify";
import { NAVIGATION_CATEGORY_QUERY } from "@/src/sanity/lib/queries";
import { HOME_PAGE_COLLECTION_PRODUCTS_QUERY } from "@/src/shopify/queries";
import { NavigationCategory } from "@/src/sanity/types";
import { getCollectionFromCollectionQueryResponse, slugToTitle } from "@/src/sanity/lib/helpers";
import { ProductEdge } from "@/types/storefront.types";
import Image from "next/image";
import Button from "@/app/components/ds/button";
import BreadCrumbs from "@/app/components/ds/bread-crumbs";
import Select from "@/app/components/ds/select";
import RangeDropdown from "@/app/components/ds/range-dropdown";

export default async function CollectionPage({ params }: { params: { slug: string[] } }) {
  console.log("CollectionPage rendered with params:", params);
  const routeParams = await params;
  const slugParams = routeParams.slug;
  const capitalizedSlug = slugParams.map((segment) => slugToTitle(segment));

  let products: ProductEdge[] = [];
  if (slugParams.length === 1) {
    const navigationCategoryResponse = await sanityClient.fetch(NAVIGATION_CATEGORY_QUERY, {
      collectionName: capitalizedSlug[0],
    });

    const navCategory: NavigationCategory = navigationCategoryResponse[0];

    const collections = [];
    if (navCategory.Collections) {
      const collectionPromises = navCategory.Collections.map((collection) =>
        shopifyClient.request(HOME_PAGE_COLLECTION_PRODUCTS_QUERY, {
          variables: {
            query: collection.shopifyCategory?.replace(/[\u2018\u2019]/g, "'"),
            first: 10,
          },
        }),
      );

      const collectionResults = await Promise.all(collectionPromises);
      collections.push(...collectionResults.map(getCollectionFromCollectionQueryResponse));
    }

    // Use a Set to store unique product IDs
    const uniqueProductIds = new Set<string>();
    products = collections
      .flatMap((collection) => collection?.products?.edges ?? [])
      .filter((product) => {
        if (uniqueProductIds.has(product.node.id)) {
          return false;
        }
        uniqueProductIds.add(product.node.id);
        return true;
      })
      .sort((a, b) => new Date(b.node.createdAt).getTime() - new Date(a.node.createdAt).getTime());
  } else {
    const collectionResponse = await shopifyClient.request(HOME_PAGE_COLLECTION_PRODUCTS_QUERY, {
      variables: {
        query: slugToTitle(params.slug[1]).replace(/[\u2018\u2019]/g, "'"),
        first: 10,
      },
    });
    products = getCollectionFromCollectionQueryResponse(collectionResponse)?.products?.edges ?? [];
  }

  // Update the item count
  const itemCount = products.length;

  return (
    <div className="bg-parchment-100 pt-28">
      <div className="w-full bg-white text-parchment-950">
        <div className="m-auto flex flex-col gap-4 py-4 md:w-3/4 lg:w-2/3">
          <BreadCrumbs slug={slugParams} />
          <div className="mx-auto text-center">
            <h1 className="text-3xl">{capitalizedSlug[capitalizedSlug.length - 1].toUpperCase()}</h1>
            <span className="text-center">{itemCount} Items</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Filters:</span>
            <Select placeholder="Size" options={["Small", "Medium", "Large"]} />
            <RangeDropdown />
            <Select placeholder="Material" options={["Cotton", "Wool", "Silk"]} />
          </div>
        </div>
      </div>
      <div className="mx-auto my-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:w-3/4 md:grid-cols-4 lg:w-2/3">
        {products.map((product) => (
          <div key={product.node.id} className="flex flex-col">
            <div className="relative aspect-square w-full">
              <Image
                src={product.node.images.edges[0].node.url}
                alt={product.node.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="rounded object-cover object-center"
              />
            </div>
            <div className="mt-2">{product.node.title}</div>
            <div className="font-semibold">
              $
              {product.node.priceRange.minVariantPrice.amount.endsWith(".0")
                ? product.node.priceRange.minVariantPrice.amount + "0"
                : product.node.priceRange.minVariantPrice.amount}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center">
        <Button className="m-4 w-72" intent="primary">
          LOAD MORE
        </Button>
      </div>
    </div>
  );
}
