"use client";

import { useState, useMemo } from "react";
import type {
  Tour,
  TourCategory,
  TourFilterState,
  SortOption,
  DurationFilter,
  StarRating,
} from "@/Types/Tour/Tour.types";
import TourSearchBar from "./TourSearchBar";
import TourCategoryTabs from "./TourCategoryTabs";
import TourResultsHeader from "./TourResultsHeader";
import TourCard from "./TourCard";
import TourPagination from "./TourPagination";
import TourFilterSidebar from "./TourFilterSidebar";
import TourEmptyState from "./TourEmptyState";
import { SAMPLE_TOURS } from "@/public/SampleTour";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

// ===============================Tour Categories==============================
const TOUR_CATEGORIES: TourCategory[] = [
  "All",
  "Adventure",
  "Beach",
  "Nature",
  "Cultural",
  "Hill Tracts",
  "Wildlife",
  "Religious",
  "City Tours",
];

// ===============================Main Component==============================
const TourExplorer = () => {
  // ===============================State Management==============================
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TourFilterState>({
    searchQuery: "",
    category: "All",
    sortBy: "most-popular",
    duration: [],
    starRating: [],
    priceRange: { min: 1000, max: 20000 },
  });
  const router = useRouter();
  const ITEMS_PER_PAGE = 6;

  // ===============================Filter Logic==============================
  const filteredTours = useMemo(() => {
    let result = [...SAMPLE_TOURS];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(query) ||
          tour.description.toLowerCase().includes(query) ||
          tour.location.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== "All") {
      result = result.filter((tour) => tour.category === filters.category);
    }

    // Duration filter
    if (filters.duration.length > 0) {
      result = result.filter((tour) => {
        const totalDays = tour.duration.days;
        return filters.duration.some((dur) => {
          if (dur === "1-days") return totalDays === 1;
          if (dur === "2-3-days") return totalDays >= 2 && totalDays <= 3;
          if (dur === "4-6-days") return totalDays >= 4 && totalDays <= 6;
          if (dur === "1-week-plus") return totalDays >= 7;
          return false;
        });
      });
    }

    // Star rating filter
    if (filters.starRating.length > 0) {
      result = result.filter((tour) => {
        return filters.starRating.some((rating) => {
          const minRating = parseFloat(rating.replace("+", ""));
          return tour.rating >= minRating;
        });
      });
    }

    // Price range filter
    result = result.filter(
      (tour) =>
        tour.price >= filters.priceRange.min &&
        tour.price <= filters.priceRange.max
    );

    // Sorting
    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        result.sort((a, b) => a.duration.days - b.duration.days);
        break;
      case "most-popular":
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [filters]);

  // ===============================Pagination Logic==============================
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTours.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTours, currentPage]);

  // ===============================Event Handlers==============================
  const handleCategoryChange = (category: TourCategory) => {
    setFilters((prev) => ({ ...prev, category }));
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    setCurrentPage(1);
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const handleDurationToggle = (duration: DurationFilter) => {
    setFilters((prev) => ({
      ...prev,
      duration: prev.duration.includes(duration)
        ? prev.duration.filter((d) => d !== duration)
        : [...prev.duration, duration],
    }));
    setCurrentPage(1);
  };

  const handleStarRatingToggle = (rating: StarRating) => {
    setFilters((prev) => ({
      ...prev,
      starRating: prev.starRating.includes(rating)
        ? prev.starRating.filter((r) => r !== rating)
        : [...prev.starRating, rating],
    }));
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: { min, max } }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "All",
      sortBy: "most-popular",
      duration: [],
      starRating: [],
      priceRange: { min: 1000, max: 20000 },
    });
    setCurrentPage(1);
  };

  // ===============================Render==============================
  return (
    <div className="min-h-screen ">
      {/* ============================= Search Bar Section ============================= */}
      <TourSearchBar
        searchQuery={filters.searchQuery}
        onSearchChange={handleSearchChange}
        onFilterClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* ============================= Category Tabs ============================= */}
      <TourCategoryTabs
        categories={TOUR_CATEGORIES}
        activeCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />

      {/* ============================= Main Content Area ============================= */}
      <div className="lg:max-w-[80vw] max-w-[95vw] mx-auto px-4 sm:px-4 lg:px-4 py-6">
        <div className="flex gap-6">
          {" "}
          {/* ============================= Desktop Filter Sidebar ============================= */}
          <TourFilterSidebar
            isOpen={isSidebarOpen}
            filters={filters}
            onClose={() => setIsSidebarOpen(false)}
            onSortChange={handleSortChange}
            onDurationToggle={handleDurationToggle}
            onStarRatingToggle={handleStarRatingToggle}
            onPriceRangeChange={handlePriceRangeChange}
            onResetFilters={handleResetFilters}
          />
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <TourResultsHeader
              totalResults={filteredTours.length}
              displayedResults={paginatedTours.length}
              currentPage={currentPage}
              totalPages={totalPages}
              sortBy={filters.sortBy}
              onSortChange={handleSortChange}
              showSortDropdown={!isSidebarOpen}
            />

            {/* ============================= Tour Grid ============================= */}
            {paginatedTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedTours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onClick={() => router.push(`/tour/${tour.id}`)}
                  />
                ))}
              </div>
            ) : (
              <TourEmptyState onReset={handleResetFilters} />
            )}

            {/* ============================= Pagination ============================= */}
            <TourPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourExplorer;
