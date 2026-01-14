"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FiltersSidebar from "@/Component/Hotels/FiltersSidebar";
import HotelList from "@/Component/Hotels/HotelList";
import Pagination from "@/Component/Hotels/Pagination";
import { mockHotels } from "@/lib/utils/mockHotels";
import { Hotel } from "@/Types/Hotel/hotel";
import { MdFlight } from "react-icons/md";
import { LuHotel } from "react-icons/lu";
import { IoCarOutline, IoLocationOutline } from "react-icons/io5";

export default function HotelSearchPage() {
  const router = useRouter();
  
  // ──── Add this line ──── (this fixes your error!)
  const [activeTab, setActiveTab] = useState<"flight" | "hotels" | "cars" | "tours">("hotels");

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

  const handleTabChange = (tab: "flight" | "hotels" | "cars" | "tours") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    
    const routes = {
      flight: "/flights",
      hotels: "/hotels",
      cars: "/cars",
      tours: "/tours",
    };
    
    router.push(routes[tab]);
  };

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
    <div className="min-h-screen bg-white">
      {/* Modern pill-style tab navigation – now working perfectly */}
      <nav className="flex justify-center py-6 bg-white border-b border-gray-200">
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-gray-100/80 backdrop-blur-sm p-2 rounded-full shadow-sm">
          <button
            onClick={() => handleTabChange("flight")}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all
              ${activeTab === 'flight' 
                ? 'bg-yellow-500 text-gray-900 shadow-md' 
                : 'text-gray-600 hover:bg-white/60'
              }
            `}
          >
            <MdFlight className="text-2xl" />
            Flight
          </button>

          <button
            onClick={() => handleTabChange("hotels")}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all
              ${activeTab === 'hotels' 
                ? 'bg-yellow-500 text-gray-900 shadow-md' 
                : 'text-gray-600 hover:bg-white/60'
              }
            `}
          >
            <LuHotel />
            Hotels
          </button>

          <button
            onClick={() => handleTabChange("cars")}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all
              ${activeTab === 'cars' 
                ? 'bg-yellow-500 text-gray-900 shadow-md' 
                : 'text-gray-600 hover:bg-white/60'
              }
            `}
          >
            <IoCarOutline />
            Cars
          </button>

          <button
            onClick={() => handleTabChange("tours")}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all
              ${activeTab === 'tours' 
                ? 'bg-yellow-500 text-gray-900 shadow-md' 
                : 'text-gray-600 hover:bg-white/60'
              }
            `}
          >
           <IoLocationOutline />
            Tours
          </button>
        </div>
      </nav>

      {/* Your existing search bar */}
      <div className="flex items-center justify-center gap-4 p-4 bg-white">
        {/* Check In */}
        <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-300 min-w-[240px]">
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

        {/* Check Out */}
        <div className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-300 min-w-[240px]">
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

        {/* Guests */}
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

        {/* Room */}
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

        {/* Confirm */}
        <button className="px-5 py-7 rounded-xl border border-slate-300 min-w-[200px] bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-semibold text-xl">
          Confirm
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
        <HotelList hotels={currentHotels} />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}