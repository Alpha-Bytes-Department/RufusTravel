"use client";

import { FaSearch } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";

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
      <div className="lg:max-w-[80vw] max-w-[95vw] mx-auto px-3 sm:px-3 lg:px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours, destinations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-gray-100 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={onFilterClick}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <GiSettingsKnobs className="text-gray-900" />
            <span className="hidden sm:inline font-medium">Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourSearchBar;
