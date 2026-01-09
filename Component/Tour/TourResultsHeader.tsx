"use client";

import type { SortOption } from "@/Types/Tour/Tour.types";

// ===============================Props Interface==============================
interface TourResultsHeaderProps {
  totalResults: number;
  displayedResults: number;
  currentPage: number;
  totalPages: number;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  showSortDropdown?: boolean;
}

// ===============================Component==============================
const TourResultsHeader = ({
  totalResults,
  displayedResults,
  currentPage,
  totalPages,
  sortBy,
  onSortChange,
  showSortDropdown = true,
}: TourResultsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {totalResults} Tours Found
        </h2>
        <p className="text-gray-600 mt-1">
          Showing {displayedResults} tours on page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Sort Dropdown */}
      {showSortDropdown && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="most-popular">Most Popular</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TourResultsHeader;
