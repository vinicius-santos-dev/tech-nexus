import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Helper function to fetch orders for a specific user from Sanity
 * @param userId - Clerk authentication user ID
 * @returns Array of orders with expanded product references
 * @throws Error if userId is missing or fetch fails
 */
export const getMyOrders = async (userId: string) => {
  if (!userId) throw new Error("User ID is required");

  /**
   * Sanity GROQ query to fetch user orders
   *
   * Query details:
   * - Filters documents of type "order" matching user ID
   * - Sorts results by orderDate descending (newest first)
   * - Expands product references into full objects
   */
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      products[]{
        ...,
        product-> // Expand product reference to full product document
      }
    }`);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders", error);
    throw new Error("Error fetching orders");
  }
};
