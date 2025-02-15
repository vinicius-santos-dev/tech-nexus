import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getCategoryById = async (id: string) => {
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