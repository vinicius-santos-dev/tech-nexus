export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
