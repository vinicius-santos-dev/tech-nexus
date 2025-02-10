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

function ProductsView({ categories, products }: ProductsViewProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filters: FilterOptions) => {
    const filtered = filterProducts(products, filters);
    setFilteredProducts(filtered);
  };
  return (
    <div className="flex flex-col">
      {/* CATEGORIES */}
      <div className="w-full">
        <Filter categories={categories} onFilterChange={handleFilterChange} />
      </div>
      {/* PRODUCTS */}
      <div className="flex-1">
        <div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductsView;
