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

// ===============================Sample Tour Data==============================
const SAMPLE_TOURS: Tour[] = [
  {
    id: "1",
    title: "Old Dhaka Heritage Walk",
    description: "Explore 400 years of history",
    location: "Dhaka, Bangladesh",
    city: "Dhaka",
    country: "Bangladesh",
    category: "Cultural",
    image:
      "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&h=600&fit=crop",
    price: 2500,
    currency: "BDT",
    rating: 4.7,
    reviewCount: 391,
    duration: { days: 1, nights: 0 },
    features: ["Guide", "Food", "Transport"],
  },
  {
    id: "2",
    title: "Cox's Bazar Beach Paradise",
    description: "Relax on the world's longest beach",
    location: "Cox's Bazar, Bangladesh",
    city: "Cox's Bazar",
    country: "Bangladesh",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    price: 8500,
    currency: "BDT",
    rating: 4.6,
    reviewCount: 243,
    duration: { days: 2, nights: 1 },
    features: ["Hotel", "Meals", "Beach Access"],
  },
  {
    id: "3",
    title: "Bandarban Hill Tracts Expedition",
    description: "Adventure in the hills",
    location: "Bandarban, Bangladesh",
    city: "Bandarban",
    country: "Bangladesh",
    category: "Hill Tracts",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    price: 11500,
    currency: "BDT",
    rating: 4.8,
    reviewCount: 243,
    duration: { days: 4, nights: 3 },
    features: ["Trekking", "Local Guide", "Camping"],
  },
  {
    id: "4",
    title: "Sylhet Tea Garden Retreat",
    description: "Discover tea gardens and natural wonders",
    location: "Sylhet, Bangladesh",
    city: "Sylhet",
    country: "Bangladesh",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=600&fit=crop",
    price: 9800,
    currency: "BDT",
    rating: 4.8,
    reviewCount: 391,
    duration: { days: 3, nights: 2 },
    features: ["Tea Estate", "Waterfall", "Boat Ride"],
  },
  {
    id: "5",
    title: "Sundarbans Mangrove Adventure",
    description: "Experience the wild beauty of Sundarbans",
    location: "Khulna, Bangladesh",
    city: "Khulna",
    country: "Bangladesh",
    category: "Wildlife",
    image:
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&h=600&fit=crop",
    price: 12500,
    currency: "BDT",
    rating: 4.9,
    reviewCount: 321,
    duration: { days: 3, nights: 2 },
    features: ["Wildlife Safari", "Boat Tour", "Expert Guide"],
  },
  {
    id: "6",
    title: "Ancient Buddhist Vihara Discovery",
    description: "Ancient Buddhist heritage",
    location: "Naogaon, Bangladesh",
    city: "Naogaon",
    country: "Bangladesh",
    category: "Religious",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
    price: 4500,
    currency: "BDT",
    rating: 4.9,
    reviewCount: 321,
    duration: { days: 3, nights: 2 },
    features: ["Historical Sites", "Guide", "Museum"],
  },
  {
    id: "7",
    title: "Rangamati Lake Adventure",
    description: "Explore crystal blue lakes and tribal culture",
    location: "Rangamati, Bangladesh",
    city: "Rangamati",
    country: "Bangladesh",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    price: 7500,
    currency: "BDT",
    rating: 4.7,
    reviewCount: 187,
    duration: { days: 2, nights: 1 },
    features: ["Boat Ride", "Tribal Village", "Lake View"],
  },
  {
    id: "8",
    title: "Srimangal Tea Capital Tour",
    description: "Seven-layer tea and lush green gardens",
    location: "Srimangal, Bangladesh",
    city: "Srimangal",
    country: "Bangladesh",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1564516344729-5e3e2b7b2e3f?w=800&h=600&fit=crop",
    price: 6800,
    currency: "BDT",
    rating: 4.6,
    reviewCount: 156,
    duration: { days: 2, nights: 1 },
    features: ["Tea Tasting", "Nature Walk", "Bird Watching"],
  },
  {
    id: "9",
    title: "Saint Martin Island Escape",
    description: "Bangladesh's only coral island",
    location: "Saint Martin, Bangladesh",
    city: "Saint Martin",
    country: "Bangladesh",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop",
    price: 15000,
    currency: "BDT",
    rating: 4.9,
    reviewCount: 412,
    duration: { days: 3, nights: 2 },
    features: ["Coral Reef", "Beach Resort", "Seafood"],
  },
  {
    id: "10",
    title: "Paharpur Buddhist Monastery",
    description: "UNESCO World Heritage archaeological site",
    location: "Naogaon, Bangladesh",
    city: "Naogaon",
    country: "Bangladesh",
    category: "Cultural",
    image:
      "https://images.unsplash.com/photo-1512581192389-49c0f7a0d5a7?w=800&h=600&fit=crop",
    price: 3500,
    currency: "BDT",
    rating: 4.5,
    reviewCount: 98,
    duration: { days: 1, nights: 0 },
    features: ["UNESCO Site", "Archaeology", "Photography"],
  },
  {
    id: "11",
    title: "Chittagong Hill Tracts Explorer",
    description: "Discover tribal culture and mountain beauty",
    location: "Chittagong, Bangladesh",
    city: "Chittagong",
    country: "Bangladesh",
    category: "Hill Tracts",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
    price: 10500,
    currency: "BDT",
    rating: 4.7,
    reviewCount: 234,
    duration: { days: 4, nights: 3 },
    features: ["Tribal Culture", "Mountain Trek", "Local Food"],
  },
  {
    id: "12",
    title: "Kuakata Sea Beach Retreat",
    description: "Watch both sunrise and sunset",
    location: "Patuakhali, Bangladesh",
    city: "Patuakhali",
    country: "Bangladesh",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    price: 7200,
    currency: "BDT",
    rating: 4.5,
    reviewCount: 176,
    duration: { days: 2, nights: 1 },
    features: ["Sunrise", "Sunset", "Beach Activities"],
  },
  {
    id: "13",
    title: "Ratargul Swamp Forest Tour",
    description: "Bangladesh's only swamp forest",
    location: "Sylhet, Bangladesh",
    city: "Sylhet",
    country: "Bangladesh",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",
    price: 5500,
    currency: "BDT",
    rating: 4.6,
    reviewCount: 203,
    duration: { days: 1, nights: 0 },
    features: ["Boat Ride", "Wildlife", "Photography"],
  },
  {
    id: "14",
    title: "Dhaka City Tours Package",
    description: "Explore the vibrant capital city",
    location: "Dhaka, Bangladesh",
    city: "Dhaka",
    country: "Bangladesh",
    category: "City Tours",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    price: 3200,
    currency: "BDT",
    rating: 4.4,
    reviewCount: 289,
    duration: { days: 1, nights: 0 },
    features: ["City Tour", "Food Tasting", "Shopping"],
  },
  {
    id: "15",
    title: "Nijhum Dwip Wildlife Sanctuary",
    description: "Remote island with spotted deer",
    location: "Noakhali, Bangladesh",
    city: "Noakhali",
    country: "Bangladesh",
    category: "Wildlife",
    image:
      "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?w=800&h=600&fit=crop",
    price: 8900,
    currency: "BDT",
    rating: 4.7,
    reviewCount: 145,
    duration: { days: 2, nights: 1 },
    features: ["Wildlife Spotting", "Island Stay", "Nature Walk"],
  },
  {
    id: "16",
    title: "Sajek Valley Paradise",
    description: "Queen of hills with cloud views",
    location: "Rangamati, Bangladesh",
    city: "Rangamati",
    country: "Bangladesh",
    category: "Hill Tracts",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    price: 13500,
    currency: "BDT",
    rating: 4.9,
    reviewCount: 387,
    duration: { days: 3, nights: 2 },
    features: ["Mountain View", "Cloud Experience", "Tribal Culture"],
  },
  {
    id: "17",
    title: "Boga Lake Trek",
    description: "Adventurous trek to mountain lake",
    location: "Bandarban, Bangladesh",
    city: "Bandarban",
    country: "Bangladesh",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",
    price: 9500,
    currency: "BDT",
    rating: 4.8,
    reviewCount: 167,
    duration: { days: 2, nights: 1 },
    features: ["Trekking", "Mountain Lake", "Camping"],
  },
  {
    id: "18",
    title: "Mahasthangarh Ancient City",
    description: "Oldest archaeological site in Bangladesh",
    location: "Bogra, Bangladesh",
    city: "Bogra",
    country: "Bangladesh",
    category: "Cultural",
    image:
      "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800&h=600&fit=crop",
    price: 4200,
    currency: "BDT",
    rating: 4.5,
    reviewCount: 124,
    duration: { days: 1, nights: 0 },
    features: ["Ancient Ruins", "Museum", "History Tour"],
  },
];

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
                  <TourCard key={tour.id} tour={tour} />
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
