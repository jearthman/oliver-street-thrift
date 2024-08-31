import "@shopify/shopify-api/adapters/node";
import {
  shopifyApi,
  LATEST_API_VERSION,
  ApiVersion,
} from "@shopify/shopify-api";

const shopify = shopifyApi({
  // The next 6 values are typically read from environment variables for added security
  apiKey: process.env.SHOPIFY_API_KEY || "APIKeyFromPartnersDashboard",
  apiSecretKey:
    process.env.SHOPIFY_API_SECRET_KEY || "APISecretFromPartnersDashboard",
  scopes: ["read_products"],
  hostName: process.env.SHOPIFY_HOST_NAME || "ngrok-tunnel-address",
  apiVersion: ApiVersion.July24, // Example version, use the version you need
  isEmbeddedApp: true, // Set this based on your app's configuration
});
