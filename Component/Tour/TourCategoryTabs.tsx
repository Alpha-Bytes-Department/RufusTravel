"use client";

import type { TourCategory } from "@/Types/Tour/Tour.types";

// ===============================Props Interface==============================
interface TourCategoryTabsProps {
  categories: TourCategory[];
  activeCategory: TourCategory;
  onCategoryChange: (category: TourCategory) => void;
}

// ===============================Component==============================
const TourCategoryTabs = ({
  categories,
  activeCategory,
  onCategoryChange,
}: TourCategoryTabsProps) => {
  return (
    <div className="bg-white sticky top-[72px] z-30">
      <div className="lg:max-w-[80vw] max-w-[95vw] mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                activeCategory === category
                  ? "bg-yellow-400 text-black font-medium"
                  : "bg-white border border-yellow-500 text-gray-700 hover:border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourCategoryTabs;
