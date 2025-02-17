import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Helper function to fetch all products from Sanity
 * @returns Array of products
 * @throws Error if fetch fails
 */
export const getAllProducts = async () => {

  /**
   * Sanity GROQ query to fetch all products
   * 
   * Query details:
   * - Filters documents of type "product"
   * - Orders results by product name ascending
   */
  const ALL_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product"] | order(name asc)`
  );

  try {
    const products = await sanityFetch({ query: ALL_PRODUCTS_QUERY });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products: ", error);
    return [];
  }
};
