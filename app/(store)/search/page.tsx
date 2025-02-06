import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white py-16">
        <div className="p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            No results found for &quot;{query}&quot;
          </h1>
          <p className="text-gray-500">
            Try searching with different keywords.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen mt-4 gap-6">
      <h1 className="text-2xl sm:text-3xl font-bold">
        Search results for &quot;{query}&quot;
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}

export default SearchPage;
