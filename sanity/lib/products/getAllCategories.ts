import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Helper function to fetch all categories from Sanity
 * @returns Array of categories
 * @throws Error if fetch fails
 */
export const getAllCategories = async () => {

  /**
   * Sanity GROQ query to fetch all categories
   * 
   * Query details:
   * - Filters documents of type "category"
   * - Orders results by category name ascending
   */
  const ALL_CATEGORIES_QUERY = defineQuery(
    `*[_type == "category"] | order(name asc)`
  );

  try {
    const categories = await sanityFetch({ query: ALL_CATEGORIES_QUERY });

    return categories.data || [];
  } catch (error) {
    console.error("Error fetching all categories: ", error);
    return [];
  }
};
