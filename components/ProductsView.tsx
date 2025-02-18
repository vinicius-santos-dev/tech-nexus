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
 * Manages product filtering logic and displays filtered products
 * @param {Category[]} categories - Available categories for filtering
 * @param {Product[]} products - Products to be filtered
 * 
 * Data Flow:
 * 1. Receives filter changes from Filter component
 * 2. Applies filters to product array
 * 3. Updates filtered products state
 * 4. Renders updated ProductGrid
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
