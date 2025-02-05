import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

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
