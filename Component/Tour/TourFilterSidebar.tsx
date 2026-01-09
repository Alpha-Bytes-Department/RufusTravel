"use client";

import { IoClose } from "react-icons/io5";
import type {
  SortOption,
  DurationFilter,
  StarRating,
  TourFilterState,
} from "@/Types/Tour/Tour.types";
import { Slider } from "@/components/ui/slider";

// ===============================Props Interface==============================
interface TourFilterSidebarProps {
  isOpen: boolean;
  filters: TourFilterState;
  onClose: () => void;
  onSortChange: (sortBy: SortOption) => void;
  onDurationToggle: (duration: DurationFilter) => void;
  onStarRatingToggle: (rating: StarRating) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  onResetFilters: () => void;
}

// ===============================Component==============================
const TourFilterSidebar = ({
  isOpen,
  filters,
  onClose,
  onSortChange,
  onDurationToggle,
  onStarRatingToggle,
  onPriceRangeChange,
  onResetFilters,
}: TourFilterSidebarProps) => {
  return (
    <>
      {/* ============================= Mobile Overlay ============================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#87f70873] bg-opacity-20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ============================= Mobile Sidebar - Fixed positioning ============================= */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-[75vw] sm:w-72 overflow-y-auto`}
      >
        <div className="p-6">
          {/*======================= Header =======================*/}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoClose className="text-2xl text-gray-600" />
            </button>
          </div>

          {/*======================= Sort By =======================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="most-popular">Most Popular</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>

          {/*======================= Duration =======================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Duration</h4>
            <div className="space-y-2">
              {[
                { value: "1-days", label: "1 days" },
                { value: "2-3-days", label: "2-3 days" },
                { value: "4-6-days", label: "4-6 days" },
                { value: "1-week-plus", label: "1 week +" },
              ].map((duration) => (
                <label
                  key={duration.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.duration.includes(
                      duration.value as DurationFilter
                    )}
                    onChange={() =>
                      onDurationToggle(duration.value as DurationFilter)
                    }
                    className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-gray-700">{duration.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/*======================= Star Rating =======================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Star rating</h4>
            <div className="space-y-2">
              {[
                { value: "4.5+", label: "4.5+ Stars" },
                { value: "4+", label: "4+ Stars" },
                { value: "3.5+", label: "3.5+ Stars" },
                { value: "3+", label: "3+ Stars" },
                { value: "2.5+", label: "2.5+ Stars" },
              ].map((rating) => (
                <label
                  key={rating.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.starRating.includes(
                      rating.value as StarRating
                    )}
                    onChange={() =>
                      onStarRatingToggle(rating.value as StarRating)
                    }
                    className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-gray-700">{rating.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/*======================= Price Range =======================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${filters.priceRange.min.toLocaleString()}</span>
                <span>${filters.priceRange.max.toLocaleString()}</span>
              </div>
              <Slider
                min={1000}
                max={20000}
                step={500}
                value={[filters.priceRange.min, filters.priceRange.max]}
                onValueChange={(values) =>
                  onPriceRangeChange(values[0], values[1])
                }
                className="w-full "
              />
            </div>
          </div>

          {/*======================= Reset Button =======================*/}
          <button
            onClick={onResetFilters}
            className="w-full py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* ============================= Desktop Sidebar - Collapsible (Left Side) ============================= */}
      <div
        className={`hidden lg:block transition-all duration-700 ease-in-out ${
          isOpen ? "w-90 opacity-100" : "w-0 opacity-0"
        }`}
        style={{
          transitionDelay: isOpen ? "100ms" : "0ms",
        }}
      >
        <div className="bg-white  p-6 ">
          {/*======================= Header =======================*/}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoClose className="text-xl text-gray-600" />
            </button>
          </div>

          {/*======================= Sort By =======================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="most-popular">Most Popular</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>

          {/*======================= Duration =======================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Duration</h4>
            <div className="space-y-2">
              {[
                { value: "1-days", label: "1 days" },
                { value: "2-3-days", label: "2-3 days" },
                { value: "4-6-days", label: "4-6 days" },
                { value: "1-week-plus", label: "1 week +" },
              ].map((duration) => (
                <label
                  key={duration.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.duration.includes(
                      duration.value as DurationFilter
                    )}
                    onChange={() =>
                      onDurationToggle(duration.value as DurationFilter)
                    }
                    className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-gray-700">{duration.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/*======================= Star Rating =======================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Star rating</h4>
            <div className="space-y-2">
              {[
                { value: "4.5+", label: "4.5+ Stars" },
                { value: "4+", label: "4+ Stars" },
                { value: "3.5+", label: "3.5+ Stars" },
                { value: "3+", label: "3+ Stars" },
                { value: "2.5+", label: "2.5+ Stars" },
              ].map((rating) => (
                <label
                  key={rating.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.starRating.includes(
                      rating.value as StarRating
                    )}
                    onChange={() =>
                      onStarRatingToggle(rating.value as StarRating)
                    }
                    className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-gray-700">{rating.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/*================ Price Range ========================*/}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>${filters.priceRange.min.toLocaleString()}</span>
                <span>${filters.priceRange.max.toLocaleString()}</span>
              </div>
              <Slider
                min={1000}
                max={20000}
                step={500}
                value={[filters.priceRange.min, filters.priceRange.max]}
                onValueChange={(values) =>
                  onPriceRangeChange(values[0], values[1])
                }
                className="w-full "
              />
            </div>
          </div>

          {/*================ Reset Button ========================*/}
          <button
            onClick={onResetFilters}
            className="w-full py-3 bg-yellow-400 text-black font-medium rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default TourFilterSidebar;
