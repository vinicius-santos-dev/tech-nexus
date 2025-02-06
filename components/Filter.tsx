"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/sanity.types";
import { useState } from "react";

interface FilterProps {
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
}

type SortOption = "newest" | "oldest";

export type FilterState = {
  categoryId?: string;
  sort?: "newest" | "oldest";
};

function Filter({ categories, onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({ 
    categoryId: "",
    sort: "newest" 
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value } as FilterState;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex gap-4">
      <Select defaultValue="" onValueChange={(value) => handleFilterChange("categoryId", value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category._id} value={category._id || ""}>
              {category.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange("sort", value as SortOption)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
