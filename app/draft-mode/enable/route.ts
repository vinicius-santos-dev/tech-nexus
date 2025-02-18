import { client } from "@/sanity/lib/client";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const token = process.env.SANITY_API_READ_TOKEN;

/**
 * Draft Mode Enable Route Handler
 * 
 * Enables preview mode for Sanity Studio content editing.
 * Validates preview URLs and manages draft mode state.
 * 
 * Security:
 * - Validates preview URL using Sanity token
 * - Requires valid API read token
 * - Returns 401 for invalid requests
 * 
 * Flow:
 * 1. Validates preview URL with Sanity client
 * 2. Enables draft mode if valid
 * 3. Redirects to preview content
 */
export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url
  );

  if (!isValid) return new Response("Invalid secret", { status: 401 });

  (await draftMode()).enable();

  redirect(redirectTo);
}
