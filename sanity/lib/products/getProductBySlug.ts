import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Helper function to fetch a product by slug from Sanity
 * @param slug - Product slug
 * @returns Product object
 * @throws Error if fetch fails
 */
export const getProductBySlug = async (slug: string) => {
  /**
   * Sanity GROQ query to fetch a product by slug
   *
   * Query details:
   * - Filters documents of type "product" matching slug
   * - Orders results by name ascending
   */
  const GET_PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug] | order(name asc) [0] 
    `);

  try {
    const product = await sanityFetch({
      query: GET_PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    return null;
  }
};
