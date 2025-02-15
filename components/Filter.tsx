"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/sanity.types";
import { FilterOptions } from "@/sanity/lib/products/filterProducts";
import { useState } from "react";

interface FilterProps {
  categories: Category[];
  onFilterChange: (filters: FilterOptions) => void;
}

function Filter({ categories, onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    categoryId: "",
    sort: "nameAsc",
  });

  const selectedCategory = categories.find(
    (category) => category._id === filters.categoryId
  );

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value } as FilterOptions;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4 justify-end mb-4">
      <Select
        defaultValue=""
        onValueChange={(value) => handleFilterChange("categoryId", value)}
        name="category"
      >
        <SelectTrigger
          name="category"
          className="w-full sm:w-[150px] rounded-xl focus:ring-0"
        >
          <SelectValue placeholder="All Categories">
            {selectedCategory ? selectedCategory.title : "All Categories"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {filters.categoryId && filters.categoryId !== "all" && (
            <SelectItem value="all">All Categories</SelectItem>
          )}
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id || ""}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleFilterChange("sort", value)}
        name="sort"
      >
        <SelectTrigger
          className="w-full sm:w-[150px] rounded-xl focus:ring-0"
          name="sort"
        >
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nameAsc">A to Z</SelectItem>
          <SelectItem value="nameDesc">Z to A</SelectItem>
          <SelectItem value="priceAsc">Lowest Price</SelectItem>
          <SelectItem value="priceDesc">Highest Price</SelectItem>
          <SelectItem value="newest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
