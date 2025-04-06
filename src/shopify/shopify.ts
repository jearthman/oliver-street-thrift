import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_CLIENT_VERSION;

export const shopifyClient = createStorefrontApiClient({
  storeDomain: storeDomain || "oliverstreetthrift.myshopify.com",
  apiVersion: apiVersion || "2025-04",
  privateAccessToken: storefrontAccessToken,
  customFetchApi: fetch,
});
