"use client";

import { Grid3x3, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsHeaderProps {
  category: string;
  resultCount: number;
  viewMode: "grid" | "list";
  sortBy: string;
  onViewModeChange?: (mode: "grid" | "list") => void;
  onSortChange?: (sortBy: string) => void;
}

const ResultsHeader = ({
  category,
  resultCount,
  viewMode,
  sortBy,
  onViewModeChange,
  onSortChange,
}: ResultsHeaderProps) => {
  const sortOptions = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
    "Most Popular",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Section - Category and Count */}
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">{category}</h2>
          <span className="text-gray-500 text-sm">
            Showing {resultCount} results
          </span>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="h-10 pl-3 pr-10 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 font-medium focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 cursor-pointer appearance-none min-w-40"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange?.("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="size-5" />
            </button>
            <button
              onClick={() => onViewModeChange?.("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label="List view"
            >
              <List className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
