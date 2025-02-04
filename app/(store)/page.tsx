import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const categories = await getAllCategories();
  const products = await getAllProducts();

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <ProductsView categories={categories} products={products} />
      </div>
    </>
  );
}
