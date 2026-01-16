"use client";

import { useState, useEffect } from "react";
import FiltersSidebar from "@/Component/Hotels/FiltersSidebar";
import HotelList from "@/Component/Hotels/HotelList";
import Pagination from "@/Component/Hotels/Pagination";
import { mockHotels } from "@/lib/utils/mockHotels";
import { Hotel } from "@/Types/Hotel/hotel";

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
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
  const hotelsPerPage = 5;

  useEffect(() => {
    // Simulate API fetch
    setHotels(mockHotels);
    setFilteredHotels(mockHotels);
  }, []);

  useEffect(() => {
    let results = hotels;

    if (filters.search) {
      results = results.filter((h) =>
        h.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.priceRanges.length > 0) {
      results = results.filter((h) =>
        filters.priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return h.price >= min && h.price <= (max || Infinity);
        })
      );
    }
    // Extend for other filters similarly...

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
    <div className="min-h-screen  max-w-[95vw] lg:max-w-[80vw] mx-auto bg-white">
      {/* Your existing search bar */}
      {/* <div className="flex items-center justify-center gap-4 p-4 bg-white flex-wrap">
        <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-300 min-w-60">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Check in</p>
            <p className="text-sm font-semibold text-yellow-700">Nov 28, 2025</p>
            <p className="text-xs text-gray-500">Friday</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-300 min-w-60">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Check out</p>
            <p className="text-sm font-semibold text-yellow-700">Nov 28, 2025</p>
            <p className="text-xs text-gray-500">Friday</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-300 min-w-[200px]">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Guests</p>
            <p className="text-sm font-semibold text-yellow-700">01</p>
            <p className="text-xs text-gray-500">Person</p>
          </div>
        </div>

        <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-300 min-w-[200px]">
          <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <rect x="3" y="10" width="18" height="7" rx="2" />
            <path d="M7 10V7a2 2 0 012-2h6a2 2 0 012 2v3" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Room</p>
            <p className="text-sm font-semibold text-yellow-700">02</p>
            <p className="text-xs text-gray-500">Economy</p>
          </div>
        </div>

        <button className="px-5 py-7 rounded-xl border border-slate-300 min-w-[200px] bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-semibold text-xl">
          Confirm
        </button>
      </div> */}

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
        <HotelList hotels={currentHotels} />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}