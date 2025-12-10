"use client";

import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ResultsHeader from "./ResultsHeader";
import TourCard from "./TourCard";
import Pagination from "./Pagination";

interface FilterState {
  priceRange: [number, number];
  propertyTypes: string[];
  experiences: string[];
  starRatings: number[];
  amenities: string[];
}

interface Tour {
  id: string;
  image: string;
  badge: { text: string; icon: "hotel" | "tour" };
  location: string;
  title: string;
  description: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  price: number;
  coordinates: [number, number];
}

// Sample data - replace with your API data
const sampleTours: Tour[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    badge: { text: "Hotel", icon: "hotel" as const },
    location: "Maldives",
    title: "Tropical Paradise Getaway",
    description: "5-star beachfront resort with overwater villas",
    amenities: ["Pool", "Spa", "Restaurant", "Wi-fi"],
    rating: 4.8,
    reviewCount: 234,
    price: 1599,
    coordinates: [73.2207, 3.2028], // [longitude, latitude]
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop",
    badge: { text: "Tour", icon: "tour" as const },
    location: "Swiss Alps, Switzerland",
    title: "Mountain Adventure Package",
    description: "5-Day guided hiking and adventure tour",
    amenities: ["Guide", "Meal", "Experiment", "Wi-fi"],
    rating: 4.8,
    reviewCount: 234,
    price: 1599,
    coordinates: [8.2275, 46.8182],
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
    badge: { text: "Hotel", icon: "hotel" as const },
    location: "Paris, France",
    title: "Luxury Hotel in Paris",
    description: "5-star hotel near Eiffel Tower with city views",
    amenities: ["Pool", "Spa", "Restaurant", "Wi-fi"],
    rating: 4.9,
    reviewCount: 456,
    price: 2500,
    coordinates: [2.3522, 48.8566],
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop",
    badge: { text: "Tour", icon: "tour" as const },
    location: "Bali, Indonesia",
    title: "Island Exploration Tour",
    description: "7-Day cultural and beach adventure",
    amenities: ["Guide", "Meal", "Experiment", "Wi-fi"],
    rating: 4.7,
    reviewCount: 189,
    price: 899,
    coordinates: [115.092, -8.4095],
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    badge: { text: "Hotel", icon: "hotel" as const },
    location: "Dubai, UAE",
    title: "Desert Luxury Resort",
    description: "Ultra-luxury resort with private pools",
    amenities: ["Pool", "Spa", "Restaurant", "Wi-fi", "Gym"],
    rating: 5.0,
    reviewCount: 567,
    price: 3200,
    coordinates: [55.2708, 25.2048],
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
    badge: { text: "Tour", icon: "tour" as const },
    location: "Santorini, Greece",
    title: "Greek Island Sunset Tour",
    description: "3-Day romantic getaway with wine tasting",
    amenities: ["Guide", "Meal", "Wi-fi"],
    rating: 4.6,
    reviewCount: 312,
    price: 750,
    coordinates: [25.4615, 36.3932],
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    badge: { text: "Hotel", icon: "hotel" as const },
    location: "New York, USA",
    title: "Manhattan Boutique Hotel",
    description: "Modern hotel in the heart of NYC",
    amenities: ["Restaurant", "Wi-fi", "Gym"],
    rating: 4.5,
    reviewCount: 423,
    price: 450,
    coordinates: [-74.006, 40.7128],
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&h=600&fit=crop",
    badge: { text: "Tour", icon: "tour" as const },
    location: "Tokyo, Japan",
    title: "Tokyo City Discovery",
    description: "4-Day cultural immersion experience",
    amenities: ["Guide", "Meal", "Experiment", "Wi-fi"],
    rating: 4.9,
    reviewCount: 678,
    price: 1200,
    coordinates: [139.6917, 35.6762],
  },
  {
    id: "9",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
    badge: { text: "Hotel", icon: "hotel" as const },
    location: "Barcelona, Spain",
    title: "Beachfront Resort Barcelona",
    description: "4-star resort with Mediterranean views",
    amenities: ["Pool", "Restaurant", "Wi-fi", "Gym"],
    rating: 4.4,
    reviewCount: 289,
    price: 650,
    coordinates: [2.1734, 41.3851],
  },
  {
    id: "10",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    badge: { text: "Tour", icon: "tour" as const },
    location: "Iceland",
    title: "Northern Lights Adventure",
    description: "6-Day aurora viewing and glacier tour",
    amenities: ["Guide", "Meal", "Experiment"],
    rating: 5.0,
    reviewCount: 445,
    price: 2100,
    coordinates: [-19.0208, 64.9631],
  },
  {
    id: "11",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    badge: { text: "Hotel", icon: "hotel" as const },
    location: "London, UK",
    title: "Historic London Hotel",
    description: "Classic hotel near Big Ben and Thames",
    amenities: ["Restaurant", "Wi-fi", "Spa"],
    rating: 4.3,
    reviewCount: 534,
    price: 380,
    coordinates: [-0.1276, 51.5074],
  },
  {
    id: "12",
    image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop",
    badge: { text: "Tour", icon: "tour" as const },
    location: "Peru",
    title: "Machu Picchu Expedition",
    description: "8-Day trek to ancient Incan ruins",
    amenities: ["Guide", "Meal", "Experiment"],
    rating: 4.8,
    reviewCount: 234,
    price: 1850,
    coordinates: [-72.545, -13.1631],
  },
];

const Explore = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("All Types");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    propertyTypes: [],
    experiences: [],
    starRatings: [],
    amenities: [],
  });

  const itemsPerPage = 6;

  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query.toLowerCase());
    setSearchType(type);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleBookNow = (id: string) => {
    console.log("Book now:", id);
    // Implement booking logic here
  };

  // Filter and sort tours
  const filteredAndSortedTours = useMemo(() => {
    let result = [...sampleTours];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchQuery) ||
          tour.location.toLowerCase().includes(searchQuery) ||
          tour.description.toLowerCase().includes(searchQuery)
      );
    }

    // Apply type filter
    if (searchType !== "All Types") {
      result = result.filter(
        (tour) => tour.badge.text.toLowerCase() === searchType.toLowerCase()
      );
    }

    // Apply price filter
    result = result.filter(
      (tour) =>
        tour.price >= filters.priceRange[0] &&
        tour.price <= filters.priceRange[1]
    );

    // Apply property type filter
    if (filters.propertyTypes.length > 0) {
      // For demo, filter by badge text
      result = result.filter((tour) =>
        filters.propertyTypes.some((type) =>
          tour.badge.text.toLowerCase().includes(type)
        )
      );
    }

    // Apply star rating filter
    if (filters.starRatings.length > 0) {
      result = result.filter((tour) =>
        filters.starRatings.some((rating) => Math.floor(tour.rating) === rating)
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      result = result.filter((tour) =>
        filters.amenities.every((amenity) =>
          tour.amenities.some((tourAmenity) =>
            tourAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Rating: High to Low":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Most Popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Recommended - keep original order
        break;
    }

    return result;
  }, [searchQuery, searchType, filters, sortBy]);

  // Paginate tours
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedTours.slice(startIndex, endIndex);
  }, [filteredAndSortedTours, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTours.length / itemsPerPage);

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              tours={filteredAndSortedTours}
            />
          </aside>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="lg:hidden fixed bottom-6 right-6 z-50 bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg flex items-center gap-2 font-semibold"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="6" x2="16" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="16" y2="18" />
              <circle cx="19" cy="6" r="2" />
              <circle cx="19" cy="12" r="2" />
              <circle cx="19" cy="18" r="2" />
            </svg>
            Filters
          </button>

          {/* Mobile Filter Sidebar */}
          {showMobileFilter && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white overflow-y-auto">
                <div className="p-4">
                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="mb-4 text-gray-600 hover:text-gray-900"
                  >
                    ✕ Close
                  </button>
                  <FilterSidebar
                    onFilterChange={handleFilterChange}
                    tours={filteredAndSortedTours}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="space-y-6">
            {/* Results Header */}
            <ResultsHeader
              category={searchType === "All Types" ? "All Results" : searchType}
              resultCount={filteredAndSortedTours.length}
              viewMode={viewMode}
              sortBy={sortBy}
              onViewModeChange={setViewMode}
              onSortChange={setSortBy}
            />

            {/* Tour Cards Grid */}
            {paginatedTours.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {paginatedTours.map((tour) => (
                  <TourCard key={tour.id} {...tour} onBookNow={handleBookNow} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="text-6xl">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Explore;
