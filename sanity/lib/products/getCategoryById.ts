import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Helper function to fetch a category by ID from Sanity
 * @param id - Category ID
 * @returns Category object
 * @throws Error if fetch fails
 */
export const getCategoryById = async (id: string) => {
  /**
   * Sanity GROQ query to fetch a category by ID
   * 
   * Query details:
   * - Filters documents of type "category" matching category ID
   * - Orders results by title ascending
   */
  const GET_CATEGORY_BY_ID_QUERY = defineQuery(`
    *[_type == "category" && _id == $id] | order(title asc) [0]
    `);

    try {
      const category = await sanityFetch({
        query: GET_CATEGORY_BY_ID_QUERY,
        params: { id },
      });

      return category.data || null;
    } catch (error) {
      console.error("Error fetching category by ID: ", error);
    }
}