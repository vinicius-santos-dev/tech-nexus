import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Draft Mode Disable Route Handler
 * 
 * Disables preview mode and redirects to home page.
 * Used when exiting Sanity Studio preview.
 */
export async function GET(request: NextRequest) {
  await (await draftMode()).disable();

  return NextResponse.redirect(new URL("/", request.url));
}
