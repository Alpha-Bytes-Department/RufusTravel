"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
import { CarCardData, CarFilterState } from "@/Types/Booking/CarBooking.types";
import CarCard from "./CarCard";
import CarFilterSidebar from "./CarFilterSidebar";
import CarBookingSummary from "./CarBookingSummary";
import { SAMPLE_CARS } from "@/public/SampleCars";

// ===============================Interface==============================
interface CarResultsProps {
  searchData?: any;
}

// ===============================Component==============================
const CarResults = ({ searchData }: CarResultsProps) => {
  const router = useRouter();

  // ===============================State==============================
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-low" | "price-high"
  >("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarCardData | null>(null);
  const [filters, setFilters] = useState<CarFilterState>({
    priceRange: [0, 300],
    carType: [],
    transmission: [],
    seats: [],
    company: [],
    features: [],
  });

  const itemsPerPage = 6;

  // ===============================Filtered Data==============================
  /**
   * Filters and sorts cars based on current filter state
   */
  const filteredCars = useMemo(() => {
    let filtered = [...SAMPLE_CARS];

    // Filter by price range
    filtered = filtered.filter(
      (car) =>
        car.totalPrice >= filters.priceRange[0] &&
        car.totalPrice <= filters.priceRange[1]
    );

    // Filter by car type
    if (filters.carType.length > 0) {
      filtered = filtered.filter((car) =>
        filters.carType.includes(car.carType)
      );
    }

    // Filter by transmission
    if (filters.transmission.length > 0) {
      filtered = filtered.filter((car) =>
        filters.transmission.includes(car.transmission)
      );
    }

    // Filter by seats
    if (filters.seats.length > 0) {
      filtered = filtered.filter((car) => {
        if (filters.seats.includes(5)) {
          return car.seats <= 5;
        }
        if (filters.seats.includes(6)) {
          return car.seats >= 6;
        }
        return true;
      });
    }

    // Filter by company
    if (filters.company.length > 0) {
      filtered = filtered.filter((car) =>
        filters.company.some((company) =>
          car.company.toLowerCase().includes(company.toLowerCase())
        )
      );
    }

    // Filter by features
    if (filters.features.length > 0) {
      filtered = filtered.filter((car) =>
        filters.features.some(
          (feature) =>
            car.features.some((carFeature) =>
              carFeature.name.toLowerCase().includes(feature.toLowerCase())
            ) ||
            (feature.toLowerCase().includes("unlimited") &&
              car.mileage.toLowerCase().includes("unlimited"))
        )
      );
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case "recommended":
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [SAMPLE_CARS, filters, sortBy]);

  // ===============================Paginated Data==============================
 
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCars.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCars, currentPage]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  // ===============================Event Handlers==============================
 
  const handleFilterChange = (newFilters: CarFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  
  const handleCarReserve = (car: CarCardData) => {
    setSelectedCar(car);
    setShowBookingSummary(true);
  };

  
  const handleContinueToCheckout = () => {
    if (selectedCar) {
      // Store selected car and search data in sessionStorage
      sessionStorage.setItem("selectedCar", JSON.stringify(selectedCar));
      sessionStorage.setItem(
        "carSearchData",
        JSON.stringify(
          searchData || {
            pickupLocation: "Abuja",
            dropoffLocation: "Lbadan",
            pickupDate: "Dec 1, 2024",
            pickupTime: "5:00 PM",
            dropoffDate: "Dec 4, 2024",
            dropoffTime: "11:00 AM",
          }
        )
      );

      // Navigate to checkout
      router.push("/bookings/checkout/car");
    }
  };

  // ===============================Render==============================
  return (
    <div className="max-w-[95vw] lg:max-w-[80vw] lg:p-6 mx-auto">
      <div className="flex gap-6 items-start relative">
        {/* ===============================Filter Sidebar (Desktop)============================== */}
        <div className="hidden lg:block w-80 shrink-0 sticky top-24">
          <CarFilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* ===============================Main ContReserve={handleCarReserve========== */}
        <div className="flex-1 min-w-0">
          {/* ===============================Results Header============================== */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredCars.length} cars available
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {paginatedCars.length} of {filteredCars.length} results
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* ===============================Car List============================== */}
          {paginatedCars.length > 0 ? (
            <>
              <div className="space-y-4">
                {paginatedCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onReserve={handleCarReserve}
                  />
                ))}
              </div>

              {/* ===============================Pagination============================== */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`size-10 rounded-full font-semibold transition-colors ${
                          currentPage === page
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="text-6xl mb-4">🚗</div>
              <p className="text-xl font-semibold text-gray-900 mb-2">
                No cars found
              </p>
              <p className="text-gray-500">
                Try adjusting your filters to see more results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ===============================Mobile Filter Button============================== */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold pl-6 pr-5 py-4 rounded-full shadow-lg z-40 flex items-center gap-2 transition-colors"
      >
        <Filter className="size-5" />
        Filters ({filteredCars.length})
      </button>

      {/* ===============================Mobile Filter Sidebar============================== */}
      {showMobileFilters && (
        <CarFilterSidebar
          onFilterChange={handleFilterChange}
          onClose={() => setShowMobileFilters(false)}
          isMobile={true}
        />
      )}

      {/* ===============================Booking Summary Sidebar============================== */}
      {showBookingSummary && selectedCar && (
        <CarBookingSummary
          car={selectedCar}
          pickupLocation={searchData?.pickupLocation || "Abuja"}
          dropoffLocation={searchData?.dropoffLocation || "Lbadan"}
          pickupDate={searchData?.pickupDate || "Dec 1, 2024"}
          dropoffDate={searchData?.dropoffDate || "Dec 4, 2024"}
          onClose={() => setShowBookingSummary(false)}
          onContinue={handleContinueToCheckout}
        />
      )}
    </div>
  );
};

export default CarResults;
