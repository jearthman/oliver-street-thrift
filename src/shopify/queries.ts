import gql from "graphql-tag";
import { print } from "graphql";

export const HOME_PAGE_COLLECTION_PRODUCTS_QUERY = print(gql`
  #graphql
  query HomePageCollectionProductsQuery($query: String!) {
    collections(first: 1, query: $query) {
      edges {
        node {
          id
          title
          products(first: 10) {
            edges {
              node {
                id
                title
                description
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                productType
              }
            }
          }
        }
      }
    }
  }
`);
