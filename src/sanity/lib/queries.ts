import { defineQuery } from "next-sanity";

export const NAV_QUERY = defineQuery(
  `*[_id=="NavigationCategoryList"]{OrderedNavigationCategories[] ->}`,
);

export const NAVIGATION_CATEGORY_QUERY = defineQuery(`
  *[_type == "NavigationCategory" && name == $collectionName]{
  ...
}`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "HomePage"]{
    ...,
    CategoryCollectionList[]->{name}
  }
`);
