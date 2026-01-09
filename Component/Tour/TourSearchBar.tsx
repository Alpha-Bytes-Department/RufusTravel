"use client";

import { FaSearch, FaFilter } from "react-icons/fa";

// ===============================Props Interface==============================
interface TourSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
}

// ===============================Component==============================
const TourSearchBar = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
}: TourSearchBarProps) => {
  return (
    <div className="bg-white  sticky top-0 z-40">
      <div className="max-w-[80vw] mx-auto px-3 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours, destinations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaFilter className="text-gray-600" />
            <span className="hidden sm:inline font-medium">Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourSearchBar;
