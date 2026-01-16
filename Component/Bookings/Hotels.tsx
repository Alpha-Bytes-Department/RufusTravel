"use client";

import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { SlidersHorizontal } from "lucide-react";
import FiltersSidebar from "@/Component/Hotels/FiltersSidebar";
import HotelList from "@/Component/Hotels/HotelList";
import Pagination from "@/Component/Hotels/Pagination";
import { mockHotels } from "@/lib/utils/mockHotels";
import { Hotel } from "@/Types/Hotel/hotel";

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    priceRanges: [] as string[],
    accessibility: [] as string[],
    mealPlans: [] as string[],
    propertyTypes: [] as string[],
    travelerExperience: [] as string[],
    starRatings: [] as number[],
    amenities: [] as string[],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 20;

  useEffect(() => {
    // Simulate API fetch
    setHotels(mockHotels);
    setFilteredHotels(mockHotels);
  }, []);

  useEffect(() => {
    let results = hotels;

    // Search by hotel name
    if (filters.search) {
      results = results.filter((h) =>
        h.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by price range
    if (filters.priceRanges.length > 0) {
      results = results.filter((h) =>
        filters.priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return h.price >= min && h.price <= (max || Infinity);
        })
      );
    }

    // Filter by accessibility features
    if (filters.accessibility.length > 0) {
      results = results.filter((h) =>
        filters.accessibility.some((feature) =>
          h.accessibility?.includes(feature)
        )
      );
    }

    // Filter by meal plans
    if (filters.mealPlans.length > 0) {
      results = results.filter((h) =>
        filters.mealPlans.some((plan) => h.mealPlans?.includes(plan))
      );
    }

    // Filter by property type
    if (filters.propertyTypes.length > 0) {
      results = results.filter((h) =>
        filters.propertyTypes.includes(h.propertyType || "")
      );
    }

    // Filter by traveler experience
    if (filters.travelerExperience.length > 0) {
      results = results.filter((h) =>
        filters.travelerExperience.some((exp) =>
          h.travelerExperience?.includes(exp)
        )
      );
    }

    // Filter by star rating
    if (filters.starRatings.length > 0) {
      results = results.filter((h) =>
        filters.starRatings.includes(h.starRating || 0)
      );
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      results = results.filter((h) =>
        filters.amenities.every((amenity) => h.amenities?.includes(amenity))
      );
    }

    setFilteredHotels(results);
    setCurrentPage(1);
  }, [filters, hotels]);

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen max-w-[95vw] lg:max-w-[80vw] mx-auto bg-white">
      <div className="container mx-auto lg:p-4 flex flex-col lg:flex-row gap-4">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FiltersSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Hotel List */}
        <HotelList hotels={currentHotels} />
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#FFC107] hover:bg-[#FFD54F] text-gray-900 font-bold px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 transition-all"
      >
        <SlidersHorizontal className="size-5" />
        Filters
      </button>

      {/* Mobile Filter Drawer */}
      <Drawer
        title="Filter Hotels"
        placement="left"
        onClose={() => setIsFilterOpen(false)}
        open={isFilterOpen}
        width={320}
        styles={{
          header: {
            background: "linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)",
            borderBottom: "2px solid #D4A60A",
          },
          body: {
            padding: "16px",
          },
        }}
      >
        <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
      </Drawer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
