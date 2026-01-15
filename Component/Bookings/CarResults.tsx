"use client";

import React, { useState, useMemo } from "react";
import { Users, Briefcase, Settings, Fuel, Star } from "lucide-react";
import { CarCardData } from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarResultsProps {
  searchData?: any;
}

// ===============================Component==============================
const CarResults = ({ searchData }: CarResultsProps) => {
  // ===============================State==============================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ===============================Sample Data==============================
  
  const allCars: CarCardData[] = [
    {
      id: "1",
      name: "Toyota Camry",
      carType: "Standard",
      image:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
      transmission: "Automatic",
      seats: 5,
      luggage: 3,
      features: [
        { id: "1", name: "Air Conditioning", icon: "ac" },
        { id: "2", name: "Bluetooth", icon: "bluetooth" },
        { id: "3", name: "GPS", icon: "gps" },
      ],
      fuelPolicy: "Full to Full",
      mileage: "Unlimited",
      rating: 4.5,
      reviewCount: 234,
      pricePerDay: 45,
      totalPrice: 135,
      currency: "$",
      company: "Toyota Rental",
      companyLogo:
        "https://via.placeholder.com/80x80/10B981/FFFFFF?text=TOYOTA",
      isAvailable: true,
    },
    {
      id: "2",
      name: "BMW X5",
      carType: "SUV",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop",
      transmission: "Automatic",
      seats: 7,
      luggage: 5,
      features: [
        { id: "1", name: "Premium Sound", icon: "sound" },
        { id: "2", name: "Leather Seats", icon: "seat" },
        { id: "3", name: "Sunroof", icon: "sunroof" },
        { id: "4", name: "4WD", icon: "4wd" },
      ],
      fuelPolicy: "Full to Full",
      mileage: "Unlimited",
      rating: 4.8,
      reviewCount: 156,
      pricePerDay: 120,
      totalPrice: 360,
      currency: "$",
      company: "BMW Rental",
      companyLogo: "https://via.placeholder.com/80x80/0066B2/FFFFFF?text=BMW",
      isAvailable: true,
    },
    {
      id: "3",
      name: "Honda Civic",
      carType: "Compact",
      image:
        "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop",
      transmission: "Manual",
      seats: 5,
      luggage: 2,
      features: [
        { id: "1", name: "Air Conditioning", icon: "ac" },
        { id: "2", name: "Bluetooth", icon: "bluetooth" },
      ],
      fuelPolicy: "Full to Full",
      mileage: "Unlimited",
      rating: 4.3,
      reviewCount: 189,
      pricePerDay: 35,
      totalPrice: 105,
      currency: "$",
      company: "Honda Rental",
      companyLogo: "https://via.placeholder.com/80x80/CC0000/FFFFFF?text=HONDA",
      isAvailable: true,
    },
    {
      id: "4",
      name: "Mercedes-Benz S-Class",
      carType: "Luxury",
      image:
        "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop",
      transmission: "Automatic",
      seats: 5,
      luggage: 3,
      features: [
        { id: "1", name: "Premium Sound", icon: "sound" },
        { id: "2", name: "Massage Seats", icon: "massage" },
        { id: "3", name: "Ambient Lighting", icon: "light" },
        { id: "4", name: "Advanced Safety", icon: "safety" },
      ],
      fuelPolicy: "Full to Full",
      mileage: "Limited (300km/day)",
      rating: 4.9,
      reviewCount: 98,
      pricePerDay: 250,
      totalPrice: 750,
      currency: "$",
      company: "Mercedes-Benz Rental",
      companyLogo: "https://via.placeholder.com/80x80/00305C/FFFFFF?text=MB",
      isAvailable: true,
    },
  ];

  // ===============================Paginated Data==============================

  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allCars.slice(startIndex, startIndex + itemsPerPage);
  }, [allCars, currentPage]);

  const totalPages = Math.ceil(allCars.length / itemsPerPage);

  // ===============================Helper Functions==============================

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="size-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="size-4 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }

    return stars;
  };


  const getCarTypeColor = (carType: string) => {
    switch (carType) {
      case "Luxury":
        return "bg-purple-100 text-purple-700";
      case "SUV":
        return "bg-blue-100 text-blue-700";
      case "Standard":
      case "Midsize":
        return "bg-green-100 text-green-700";
      case "Compact":
      case "Economy":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ===============================Event Handlers==============================
  const handleCarDetails = (carId: string) => {
    console.log("View details for car:", carId);
  };

  // ===============================Render==============================
  return (
    <div>
      {/* ===============================Car List============================== */}
      <div className="flex-1 min-w-0">
        {/* Results Count */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Showing {paginatedCars.length} of {allCars.length} cars
          </h2>
        </div>

        {/* Car Cards */}
        {paginatedCars.length > 0 ? (
          <>
            <div className="space-y-4">
              {paginatedCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Car Image */}
                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getCarTypeColor(
                          car.carType
                        )}`}
                      >
                        {car.carType}
                      </span>
                    </div>

                    {/* Car Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {car.name}
                          </h3>
                          <p className="text-sm text-gray-600">{car.company}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(car.rating)}
                          <span className="ml-1 text-sm font-semibold text-gray-900">
                            {car.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({car.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="size-4" />
                          <span>{car.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Briefcase className="size-4" />
                          <span>{car.luggage} Bags</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Settings className="size-4" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Fuel className="size-4" />
                          <span>{car.fuelPolicy}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.features.map((feature) => (
                          <span
                            key={feature.id}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                          >
                            {feature.name}
                          </span>
                        ))}
                      </div>

                      {/* Mileage and Company */}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">
                          Mileage:{" "}
                          <span className="font-medium text-gray-900">
                            {car.mileage}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-between min-w-[200px]">
                      <div>
                        <div className="text-right mb-2">
                          <div className="text-sm text-gray-500">
                            {car.currency}
                            {car.pricePerDay}/day
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            {car.currency}
                            {car.totalPrice}
                          </div>
                          <div className="text-xs text-gray-500">
                            Total for 3 days
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCarDetails(car.id)}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
                      >
                        Select Car
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
            <p className="text-gray-500 text-lg">No cars found.</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarResults;
