import { Product } from "@/sanity.types";

type FilterOptions = {
  categoryId?: string;
  sort?: "newest" | "oldest";
};

export function filterProducts(products: Product[], options: FilterOptions) {
  let filteredProducts = [...products];

  // Filter by category
  if (options.categoryId) {
    if(options.categoryId === "all") return filteredProducts; 

    filteredProducts = filteredProducts.filter((product) =>
      product.categories?.some((category) => category._ref === options.categoryId)
    );
  }

  // Sort by date
  if (options.sort) {
    filteredProducts.sort((a, b) => {
      const dateA = new Date(a._createdAt).getTime();
      const dateB = new Date(b._createdAt).getTime();
      return options.sort === "newest" ? dateB - dateA : dateA - dateB;
    });
  }

  return filteredProducts;
}