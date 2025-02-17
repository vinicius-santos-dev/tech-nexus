import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { CouponCode } from "./couponCodes";

/** 
 * Helper function to fetch an active sale by coupon code from Sanity
 * @param couponCode - Sale coupon code
 * @returns Sale object
 * @throws Error if fetch fails
*/
export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {

  /**
   * Sanity GROQ query to fetch an active sale by coupon code
   * 
   * Query details:
   * - Filters documents of type "sale" matching coupon code
   * - Orders results by validFrom descending
   * - Returns the first result
   */
  const ACTIVE_SALE_BY_COUPON_CODE_QUERY = defineQuery(`
    *[_type == "sale" && couponCode == $couponCode && isActive == true] | order(validFrom desc)[0]
    `);

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_CODE_QUERY,
      params: { couponCode },
    });

    return activeSale.data || null;
  } catch (error) {
    console.error("Error fetching active sale by coupon code: ", error);
    return null;
  }
};
