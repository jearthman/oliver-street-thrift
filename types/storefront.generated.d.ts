/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type HomePageCollectionProductsQueryQueryVariables = StorefrontTypes.Exact<{
  query: StorefrontTypes.Scalars['String']['input'];
}>;


export type HomePageCollectionProductsQueryQuery = { collections: { edges: Array<{ node: (
        Pick<StorefrontTypes.Collection, 'id' | 'title'>
        & { products: { edges: Array<{ node: (
              Pick<StorefrontTypes.Product, 'id' | 'title' | 'description' | 'productType'>
              & { priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'url'> }> } }
            ) }> } }
      ) }> } };

interface GeneratedQueryTypes {
  "\n  #graphql\n  query HomePageCollectionProductsQuery($query: String!) {\n    collections(first: 1, query: $query) {\n      edges {\n        node {\n          id\n          title\n          products(first: 10) {\n            edges {\n              node {\n                id\n                title\n                description\n                priceRange {\n                  minVariantPrice {\n                    amount\n                    currencyCode\n                  }\n                }\n                images(first: 1) {\n                  edges {\n                    node {\n                      url\n                    }\n                  }\n                }\n                productType\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: HomePageCollectionProductsQueryQuery, variables: HomePageCollectionProductsQueryQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
