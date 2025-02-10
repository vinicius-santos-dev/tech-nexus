import { Product } from "@/sanity.types";

type SortOption =
  | "newest"
  | "oldest"
  | "nameAsc"
  | "nameDesc"
  | "priceAsc"
  | "priceDesc";

export type FilterOptions = {
  categoryId?: string;
  sort?: SortOption;
};

export function filterProducts(products: Product[], options: FilterOptions) {
  let filteredProducts = [...products];

  // Filter by category
  if (options.categoryId && options.categoryId !== "all") {
    filteredProducts = filteredProducts.filter((product) =>
      product.categories?.some((category) => category._ref === options.categoryId)
    );
  }

  // Sort products
  if (options.sort) {
    switch (options.sort) {
      case "newest":
        filteredProducts.sort((a, b) => 
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
        );
        break;
      case "oldest":
        filteredProducts.sort((a, b) => 
          new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
        );
        break;
      case "nameAsc":
        filteredProducts.sort((a, b) => 
          a.name!.localeCompare(b.name!)
        );
        break;
      case "nameDesc":
        filteredProducts.sort((a, b) => 
          b.name!.localeCompare(a.name!)
        );
        break;
      case "priceAsc":
        filteredProducts.sort((a, b) => a.price! - b.price!);
        break;
      case "priceDesc":
        filteredProducts.sort((a, b) => b.price! - a.price!);
        break;
    }
  }

  return filteredProducts;
}