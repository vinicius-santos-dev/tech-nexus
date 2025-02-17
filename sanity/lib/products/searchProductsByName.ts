import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Helper function to fetch products by name from Sanity
 * @param searchParam - Search parameter (product name)
 * @returns Array of products
 * @throws Error if fetch fails
 */
export const searchProductsByName = async (searchParam: string) => {
  /**
   * Sanity GROQ query to fetch products by name
   * 
   * Query details:
   * - Filters documents of type "product" matching search parameter
   * - Orders results by name ascending
   * - Uses wildcard (*) to match partial names
   */
  const SEARCH_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && name match $searchParam] | order(name asc)
  `);

  try {
    const products = await sanityFetch({ query: SEARCH_PRODUCTS_QUERY, params: {
      searchParam: `${searchParam}*` // Append wildcard for partial matches
    } });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by name: ", error);
    return [];
  }
};
