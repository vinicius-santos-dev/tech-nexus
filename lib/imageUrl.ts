import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Initialize image URL builder with Sanity client
const builder = imageUrlBuilder(client);

/**
 * Creates an image URL builder instance for a Sanity image
 * 
 * Features:
 * - Generates CDN URLs for Sanity images
 * - Supports image transformations (resize, crop, etc.)
 * - Optimizes image delivery
 * 
 * @param source - Sanity image reference object
 * @returns ImageUrlBuilder with transformation methods (example: .width(200), .height(200), .fit("crop"))
 */
export function imageUrl(source: SanityImageSource) {
  return builder.image(source);
}