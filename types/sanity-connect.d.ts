export type Product = {
  id: `gid://shopify/ProductVariant/${string}`;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage?: ProductImage;
  handle: string;
  images: ProductImage[];
  options: ProductOption[];
  priceRange: ProductPriceRange;
  productType: string;
  tags: string[];
  variants: ProductVariant[];
  vendor: string;
  status: "active" | "archived" | "draft" | "unknown";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};
export type ProductImage = {
  id: `gid://shopify/ProductImage/${string}`;
  altText?: string;
  height?: number;
  width?: number;
  src: string;
};
export type ProductOption = {
  id: `gid://shopify/ProductOption/${string}`;
  name: string;
  position: number;
  values: string[];
};
export type ProductPriceRange = {
  minVariantPrice?: number;
  maxVariantPrice?: number;
};
export type ProductVariant = {
  id: `gid://shopify/ProductVariant/${string}`;
  title: string;
  compareAtPrice?: number;
  barcode?: string;
  inventoryPolicy: string;
  inventoryQuantity: number;
  inventoryManagement: string;
  position: number;
  requiresShipping: boolean;
  sku: string;
  taxable: boolean;
  weight: number;
  weightUnit: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  image?: ProductImage;
  product: {
    id: `gid://shopify/Product/${string}`;
    status: "active" | "archived" | "draft" | "unknown";
  };
  selectedOptions: {
    name: string;
    values: string[];
  }[];
};
export type Collection = {
  id: `gid://shopify/Collection/${string}`;
  createdAt: string;
  handle: string;
  descriptionHtml: string;
  image?: CollectionImage;
  rules?: {
    column: string;
    condition: string;
    relation: string;
  }[];
  disjunctive?: boolean;
  sortOrder: string;
  title: string;
  updatedAt: string;
};
export type CollectionImage = {
  altText: string;
  height?: number;
  width?: number;
  src: string;
};

// When products are created, updated or manually synced
export type payloadProductsSync = {
  action: "create" | "update" | "sync";
  products: Product[];
};

// When products are deleted
export type payloadProductsDelete = {
  action: "delete";
  productIds: number[];
};

// When collections are created, updated or manually synced
export type payloadCollectionsSync = {
  action: "create" | "update" | "sync";
  collections: Collection[];
};

// When collections are deleted
export type payloadCollectionsDelete = {
  action: "delete";
  collectionIds: number[];
};

export type requestPayload =
  | payloadProductsDelete
  | payloadProductsSync
  | payloadCollectionsDelete
  | payloadCollectionsSync;
