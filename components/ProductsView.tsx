"use client";

import { Category, Product } from "@/sanity.types";
import { filterProducts } from "@/sanity/lib/products/filterProducts";
import { useState } from "react";
import Filter, { FilterState } from "./Filter";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  categories: Category[];
  products: Product[];
}

function ProductsView({ categories, products }: ProductsViewProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = filterProducts(products, filters);
    setFilteredProducts(filtered);
  };
  return (
    <div className="flex flex-col">
      {/* CATEGORIES */}
      <div className="w-full sm:w-[200px]">
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
