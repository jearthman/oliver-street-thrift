import { createClient, Transaction } from "@sanity/client";
import type {
  requestPayload,
  payloadProductsSync,
  payloadProductsDelete,
  payloadCollectionsDelete,
  payloadCollectionsSync,
  Product,
} from "@/types/sanity-connect";
import { NextRequest, NextResponse } from "next/server";

// Document type for all incoming synced Shopify products
const SHOPIFY_PRODUCT_DOCUMENT_TYPE = "shopify.product";

// Prefix added to all Sanity product document ids
const SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX = "product-";

// Enter your Sanity studio details here.
// You will also need to provide an API token with write access in order for this
// handler to be able to create documents on your behalf.
// Read more on auth, tokens and securing them: https://www.sanity.io/docs/http-auth
const sanityClient = createClient({
  apiVersion: "2021-10-21",
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_ADMIN_AUTH_TOKEN,
  useCdn: false,
});

/**
 * Sanity Connect sends POST requests and expects both:
 * - a 200 status code
 * - a response header with `content-type: application/json`
 *
 * Remember that this may be run in batches when manually syncing.
 */

export async function POST(req: NextRequest) {
  const request = await req.json();
  const payload: requestPayload = JSON.parse(request).body;
  const method = req.method;

  // Ignore non-POST requests
  if (method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const transaction = sanityClient.transaction();

    if (isPayloadProductsSync(payload)) {
      // Handle products sync logic
      const products = payload.products;
      console.log("Products Sync:", products);
      createOrUpdateProducts(transaction, products);
    } else if (isPayloadProductsDelete(payload)) {
      // Handle products delete logic
      const productIds = payload.productIds;
      console.log("Products Delete:", productIds);
      const documentIds = productIds.map((id) => getDocumentProductId(id));
      await deleteProducts(transaction, documentIds);
    } else if (isPayloadCollectionsSync(payload)) {
      // Handle collections sync logic
      const collections = payload.collections;
      console.log("Collections Sync:", collections);
    } else if (isPayloadCollectionsDelete(payload)) {
      // Handle collections delete logic
      const collectionIds = payload.collectionIds;
      console.log("Collections Delete:", collectionIds);
    } else {
      NextResponse.json({ message: "Invalid payload" }, { status: 400 });
      return;
    }

    await transaction.commit();
  } catch (error: any) {
    console.error("Transaction failed: ", error.message);
  }

  return NextResponse.json({ message: "OK" }, { status: 200 });
}

/**
 * Creates (or updates if already existing) Sanity documents of type `shopify.product`.
 * Patches existing drafts too, if present.
 *
 * All products will be created with a deterministic _id in the format `product-${SHOPIFY_ID}`
 */
async function createOrUpdateProducts(
  transaction: Transaction,
  products: Product[],
) {
  // Extract draft document IDs from current update
  const draftDocumentIds = products.map((product) => {
    const productId = extractIdFromGid(product.id);
    return `drafts.${getDocumentProductId(productId)}`;
  });

  // Determine if drafts exist for any updated products
  const existingDrafts = await sanityClient.fetch(`*[_id in $ids]._id`, {
    ids: draftDocumentIds,
  });

  products.forEach((product) => {
    if (product.status === "archived") {
      deleteProduct(transaction, getDocumentProductId(product.id));
      return;
    }

    // Build Sanity product document
    const document = buildProductDocument(product);
    const draftId = `drafts.${document._id}`;

    // Create (or update) existing published document
    transaction
      .createIfNotExists(document)
      .patch(document._id, (patch: any) => patch.set(document));

    // Check if this product has a corresponding draft and if so, update that too.
    if (existingDrafts.includes(draftId)) {
      transaction.patch(draftId, (patch: any) =>
        patch.set({
          ...document,
          _id: draftId,
        }),
      );
    }
  });
}

/**
 * Delete corresponding Sanity documents of type `shopify.product`.
 * Published and draft documents will be deleted.
 */
async function deleteProducts(transaction: Transaction, documentIds: string[]) {
  documentIds.forEach((id) => {
    transaction.delete(id).delete(`drafts.${id}`);
  });
}

async function deleteProduct(transaction: Transaction, documentId: string) {
  transaction.delete(documentId).delete(`drafts.${documentId}`);
}

/**
 * Build Sanity document from product payload
 */
function buildProductDocument(product: Product) {
  const {
    featuredImage,
    id,
    options,
    productType,
    priceRange,
    status,
    title,
    variants,
  } = product;
  const productId = extractIdFromGid(id);
  return {
    _id: getDocumentProductId(productId),
    _type: SHOPIFY_PRODUCT_DOCUMENT_TYPE,
    image: featuredImage?.src,
    options: options?.map((option, index) => ({
      _key: String(index),
      name: option.name,
      position: option.position,
      values: option.values,
    })),
    priceRange,
    productType,
    status,
    title,
    variants: variants?.map((variant, index) => {
      const variantId = extractIdFromGid(variant.id);
      return {
        _key: String(index),
        compareAtPrice: Number(variant.compareAtPrice || 0),
        id: variantId,
        inStock: !!variant.inventoryManagement
          ? variant.inventoryPolicy === "continue" ||
            variant.inventoryQuantity > 0
          : true,
        inventoryManagement: variant.inventoryManagement,
        inventoryPolicy: variant.inventoryPolicy,
        option1: variant?.selectedOptions?.[0]?.values,
        option2: variant?.selectedOptions?.[1]?.values,
        option3: variant?.selectedOptions?.[2]?.values,
        price: Number(variant.price || 0),
        sku: variant.sku,
        title: variant.title,
      };
    }),
  };
}

/**
 * Extract ID from Shopify GID string (all values after the last slash)
 * e.g. gid://shopify/Product/12345 => 12345
 */
function extractIdFromGid(gid: string) {
  return gid?.match(/[^\/]+$/i)?.[0] ?? null;
}

/**
 * Map Shopify product ID number to a corresponding Sanity document ID string
 * e.g. 12345 => product-12345
 */
function getDocumentProductId(productId: string | number | null) {
  if (productId === null) {
    return ""; // Provide a default value or handle the null case accordingly
  }
  return `${SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX}${productId}`;
}

// Define type guards for each payload type

function isPayloadProductsSync(
  payload: requestPayload,
): payload is payloadProductsSync {
  return (payload as payloadProductsSync).products !== undefined;
}

function isPayloadProductsDelete(
  payload: requestPayload,
): payload is payloadProductsDelete {
  return (payload as payloadProductsDelete).productIds !== undefined;
}

function isPayloadCollectionsSync(
  payload: requestPayload,
): payload is payloadCollectionsSync {
  return (payload as payloadCollectionsSync).collections !== undefined;
}

function isPayloadCollectionsDelete(
  payload: requestPayload,
): payload is payloadCollectionsDelete {
  return (payload as payloadCollectionsDelete).collectionIds !== undefined;
}
