import { defineQuery } from "next-sanity";

export const NAV_QUERY = defineQuery(
  `*[_id=="NavigationCategoryList"]{OrderedNavigationCategories[] ->}`
);
