"use client";

import React, { useState, useMemo } from "react";
import FlightCard, { FlightCardData } from "./FlightCard";
import BookingFilterSidebar, { FilterState } from "./BookingFilterSidebar";
import DateSelector from "./DateSelector";

// ===============================Interface==============================
interface FlightResultsProps {
  searchData?: any;
}

// ===============================Component==============================
const FlightResults = ({ searchData }: FlightResultsProps) => {
  // ===============================State==============================
  const [selectedDate, setSelectedDate] = useState("19 Dec");
  const [filters, setFilters] = useState<FilterState>({
    stops: [1],
    airlines: ["All"],
    priceRange: [1000, 10000],
    departureTime: [],
    arrivalTime: [],
    preferredClass: [],
    travelAndBaggage: [],
    maxTravelTime: 28,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ===============================Sample Data==============================
  /**
   * Sample dates for date selector
   */
  const dates = [
    { day: "Tue", date: 16, month: "Dec", price: 1684 },
    { day: "Wed", date: 17, month: "Dec", price: 1684 },
    { day: "Thu", date: 18, month: "Dec", price: 1699 },
    { day: "Fri", date: 19, month: "Dec", price: 1761, isBestPrice: true },
    { day: "Sat", date: 20, month: "Dec", price: 1742 },
    { day: "Sun", date: 21, month: "Dec", price: 1511 },
    { day: "Mon", date: 22, month: "Dec", price: 1557 },
  ];


  const allFlights: FlightCardData[] = [
    {
      id: "1",
      outbound: {
        id: "out1",
        airline: "British Airways",
        airlineLogo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png",
        departureCode: "ABJ",
        departureName: "Dhaka",
        departureTime: "15:50",
        departureDate: "Thu 04 Dec",
        arrivalCode: "LND",
        arrivalName: "Dhaka",
        arrivalTime: "16:55",
        arrivalDate: "Wed 05 Dec",
        duration: "12h 5m",
        stops: 0,
        flightNumber: "VQ-931",
        class: "Economy (B)",
        baggage: "Baggage (per PAX): Adult-20KGS",
      },
      return: {
        id: "ret1",
        airline: "British Airways",
        airlineLogo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png",
        departureCode: "LND",
        departureName: "Dhaka",
        departureTime: "15:50",
        departureDate: "Wed 05 Dec",
        arrivalCode: "ABJ",
        arrivalName: "Dhaka",
        arrivalTime: "16:55",
        arrivalDate: "Wed 05 Dec",
        duration: "12h 5m",
        stops: 0,
        flightNumber: "VQ-931",
        class: "Economy (B)",
        baggage: "Baggage (per PAX): Adult-20KGS",
      },
      price: 5955,
      isRefundable: true,
      totalTravelers: 1,
    },
    {
      id: "2",
      outbound: {
        id: "out2",
        airline: "British Airways",
        airlineLogo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png",
        departureCode: "ABJ",
        departureName: "Dhaka",
        departureTime: "15:50",
        departureDate: "Thu 04 Dec",
        arrivalCode: "LND",
        arrivalName: "Dhaka",
        arrivalTime: "16:55",
        arrivalDate: "Wed 05 Dec",
        duration: "12h 5m",
        stops: 0,
        flightNumber: "VQ-931",
        class: "Economy (B)",
        baggage: "Baggage (per PAX): Adult-20KGS",
      },
      return: {
        id: "ret2",
        airline: "British Airways",
        airlineLogo:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/British_Airways_Logo.svg/200px-British_Airways_Logo.svg.png",
        departureCode: "LND",
        departureName: "Dhaka",
        departureTime: "16:55",
        departureDate: "Wed 05 Dec",
        arrivalCode: "ABJ",
        arrivalName: "Dhaka",
        arrivalTime: "16:55",
        arrivalDate: "Wed 05 Dec",
        duration: "12h 5m",
        stops: 0,
        flightNumber: "VQ-931",
        class: "Economy (B)",
        baggage: "Baggage (per PAX): Adult-20KGS",
      },
      price: 5955,
      isRefundable: true,
      totalTravelers: 1,
    },
    {
      id: "3",
      outbound: {
        id: "out3",
        airline: "Fly Emirates",
        airlineLogo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png",
        departureCode: "ABJ",
        departureName: "Dhaka",
        departureTime: "10:30",
        departureDate: "Thu 04 Dec",
        arrivalCode: "LND",
        arrivalName: "Dhaka",
        arrivalTime: "14:45",
        arrivalDate: "Thu 04 Dec",
        duration: "15h 15m",
        stops: 1,
        flightNumber: "EK-102",
        class: "Business (J)",
        baggage: "Baggage (per PAX): Adult-30KGS",
      },
      return: {
        id: "ret3",
        airline: "Fly Emirates",
        airlineLogo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png",
        departureCode: "LND",
        departureName: "Dhaka",
        departureTime: "18:20",
        departureDate: "Wed 05 Dec",
        arrivalCode: "ABJ",
        arrivalName: "Dhaka",
        arrivalTime: "08:35",
        arrivalDate: "Thu 06 Dec",
        duration: "15h 15m",
        stops: 1,
        flightNumber: "EK-103",
        class: "Business (J)",
        baggage: "Baggage (per PAX): Adult-30KGS",
      },
      price: 8750,
      isRefundable: true,
      totalTravelers: 1,
    },
    {
      id: "4",
      outbound: {
        id: "out4",
        airline: "Asky Airlines",
        airlineLogo:
          "https://via.placeholder.com/80x80/4B5563/FFFFFF?text=ASKY",
        departureCode: "ABJ",
        departureName: "Dhaka",
        departureTime: "08:15",
        departureDate: "Thu 04 Dec",
        arrivalCode: "LND",
        arrivalName: "Dhaka",
        arrivalTime: "20:30",
        arrivalDate: "Thu 04 Dec",
        duration: "13h 15m",
        stops: 0,
        flightNumber: "KP-567",
        class: "Economy (Y)",
        baggage: "Baggage (per PAX): Adult-23KGS",
      },
      return: {
        id: "ret4",
        airline: "Asky Airlines",
        airlineLogo:
          "https://via.placeholder.com/80x80/4B5563/FFFFFF?text=ASKY",
        departureCode: "LND",
        departureName: "Dhaka",
        departureTime: "09:00",
        departureDate: "Wed 05 Dec",
        arrivalCode: "ABJ",
        arrivalName: "Dhaka",
        arrivalTime: "21:15",
        arrivalDate: "Wed 05 Dec",
        duration: "13h 15m",
        stops: 0,
        flightNumber: "KP-568",
        class: "Economy (Y)",
        baggage: "Baggage (per PAX): Adult-23KGS",
      },
      price: 4890,
      isRefundable: false,
      totalTravelers: 1,
    },
  ];

  // ===============================Filtered and Paginated Data==============================
  
  const filteredFlights = useMemo(() => {
    return allFlights.filter((flight) => {
      // Filter by stops
      if (!filters.stops.includes(flight.outbound.stops)) {
        return false;
      }

      // Filter by airlines
      if (
        !filters.airlines.includes("All") &&
        !filters.airlines.includes(flight.outbound.airline)
      ) {
        return false;
      }

      // Filter by price range
      if (
        flight.price < filters.priceRange[0] ||
        flight.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Filter by departure time
      if (filters.departureTime.length > 0) {
        const departureHour = parseInt(
          flight.outbound.departureTime.split(":")[0]
        );
        let matchesTime = false;

        if (
          filters.departureTime.includes("earlyMorning") &&
          departureHour >= 0 &&
          departureHour < 5
        ) {
          matchesTime = true;
        }
        if (
          filters.departureTime.includes("morning") &&
          departureHour >= 5 &&
          departureHour < 12
        ) {
          matchesTime = true;
        }
        if (
          filters.departureTime.includes("afternoon") &&
          departureHour >= 12 &&
          departureHour < 18
        ) {
          matchesTime = true;
        }
        if (
          filters.departureTime.includes("evening") &&
          departureHour >= 18 &&
          departureHour < 24
        ) {
          matchesTime = true;
        }

        if (!matchesTime) return false;
      }

      // Filter by arrival time
      if (filters.arrivalTime.length > 0) {
        const arrivalHour = parseInt(flight.outbound.arrivalTime.split(":")[0]);
        let matchesTime = false;

        if (
          filters.arrivalTime.includes("earlyMorning") &&
          arrivalHour >= 0 &&
          arrivalHour < 5
        ) {
          matchesTime = true;
        }
        if (
          filters.arrivalTime.includes("morning") &&
          arrivalHour >= 5 &&
          arrivalHour < 12
        ) {
          matchesTime = true;
        }
        if (
          filters.arrivalTime.includes("afternoon") &&
          arrivalHour >= 12 &&
          arrivalHour < 18
        ) {
          matchesTime = true;
        }
        if (
          filters.arrivalTime.includes("evening") &&
          arrivalHour >= 18 &&
          arrivalHour < 24
        ) {
          matchesTime = true;
        }

        if (!matchesTime) return false;
      }

      // Filter by travel time
      const durationHours = parseInt(flight.outbound.duration.split("h")[0]);
      if (durationHours > filters.maxTravelTime) {
        return false;
      }

      return true;
    });
  }, [allFlights, filters]);

  
  const paginatedFlights = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFlights.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFlights, currentPage]);

  const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);

  // ===============================Event Handlers==============================
  const handleFlightDetails = (flightId: string) => {
    console.log("View details for flight:", flightId);
  };

  // ===============================Render==============================
  return (
    <div className=" max-w-[95vw] lg:max-w-[80vw] mx-auto">
      {/* ===============================Date Selector============================== */}
      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      <div className="flex gap-6 items-start">
        {/* ===============================Filter Sidebar============================== */}
        <div className="hidden lg:block w-80 shrink-0">
          <BookingFilterSidebar onFilterChange={setFilters} />
        </div>

        {/* ===============================Flight List============================== */}
        <div className="flex-1 min-w-0">
          {/* Results Count */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Showing {paginatedFlights.length} of {filteredFlights.length}{" "}
              results
            </h2>
          </div>

          {/* Flight Cards */}
          {paginatedFlights.length > 0 ? (
            <>
              {paginatedFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onDetailsClick={handleFlightDetails}
                />
              ))}

              {/* ===============================Pagination============================== */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No flights found matching your filters.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
 
      {/* ===============================Mobile Filter Button============================== */}
      <button className="lg:hidden fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-4 rounded-full shadow-lg z-50">
        Filters ({filteredFlights.length})
      </button>
    </div>
  );
};

export default FlightResults;
