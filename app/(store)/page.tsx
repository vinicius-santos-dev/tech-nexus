import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 86400;

/**
 * Home Page Component
 * 
 * Main landing page of the store that displays products and promotional banner.
 * Uses static generation with daily revalidation for optimal performance.
 * 
 * Configuration:
 * @property {string} dynamic - Forces static generation
 * @property {number} revalidate - Revalidates content daily (86400 seconds)
 * 
 * Features:
 * - Static page generation
 * - Daily content revalidation
 * - Promotional banner display
 * - Filterable product catalog
 */
export default async function Home() {
  const categories = await getAllCategories();
  const products = await getAllProducts();

  return (
    <>
      <BlackFridayBanner />
      <div className="flex flex-col items-center min-h-screen py-8">
        <ProductsView categories={categories} products={products} />
      </div>
    </>
  );
}
