"use client";

import { Category, Product } from "@/sanity.types";
import {
  FilterOptions,
  filterProducts,
} from "@/sanity/lib/products/filterProducts";
import { useState } from "react";
import Filter from "./Filter";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  categories: Category[];
  products: Product[];
}

/**
 * ProductsView Component:
 * A component that manages product filtering by categories and displays the filtered products.
 */
function ProductsView({ categories, products }: ProductsViewProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filters: FilterOptions) => {
    const filtered = filterProducts(products, filters);
    setFilteredProducts(filtered);
  };
  return (
    <div className="flex flex-col">
      <div className="w-full">
        <Filter categories={categories} onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1">
        <div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductsView;
