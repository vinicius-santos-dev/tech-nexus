"use client";

import { SearchIcon } from "@sanity/icons";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

/**
 * Search Component
 * 
 * A responsive search input component with debounced query handling and route management.
 * 
 * Features:
 * - Debounced search (500ms) to prevent excessive API calls
 * - URL-based search state management
 * - Automatic navigation to search results page
 * - Returns to home when query is cleared
 * - Responsive design with mobile optimization
 */
function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearch = useDebouncedCallback((query: string) => {
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`); // encodeURIComponent to handle special characters
    } else if (pathname === "/search") {
      router.push("/");
    }
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative max-w-md w-full mt-3 sm:mt-0">
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 w-7 h-7 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for products..."
          className="w-full py-2 px-4 pl-10 bg-gray-100 border border-gray-200 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 
                    focus:border-transparent transition-all duration-200 
                    placeholder-gray-400"
        />
      </div>
    </div>
  );
}

export default Search;
