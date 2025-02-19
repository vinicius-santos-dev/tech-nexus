import { DisableDraftMode } from "@/components/DisableDraftMode";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { Exo_2, Poppins, Roboto } from "next/font/google";
import { draftMode } from "next/headers";
import "../globals.css";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Tech Nexus",
  description: "E-commerce store for tech products",
};

/**
 * Root Store Layout Component
 * 
 * Provides the foundational layout structure for the store group route.
 * Handles authentication, fonts, draft mode, and common UI elements.
 *
 * Features:
 * - Authentication via ClerkProvider
 * - Custom font variables (Poppins, Roboto, Exo2)
 * - Sanity draft mode integration
 * - Toast notifications
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${poppins.variable} ${roboto.variable} ${exo2.variable} antialiased`}
        >
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}

          <main>
            <Header />
            <div className="min-h-screen px-3 sm:px-6 max-w-7xl mx-auto">
              {children}
            </div>
            <Toaster />
            <Footer />
          </main>

          <SanityLive />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
