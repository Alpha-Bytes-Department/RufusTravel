"use client";

import { SlSpeedometer } from "react-icons/sl";
import { Users, Car as CarIcon, CheckCircle, Heart, Info } from "lucide-react";
import { CarCardData } from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarCardProps {
  car: CarCardData;
  onReserve: (car: CarCardData) => void;
}

// ===============================Component==============================
const CarCard = ({ car, onReserve }: CarCardProps) => {
  // ===============================Helper Functions==============================

  const isElectric = car.features.some(
    (f) =>
      f.name.toLowerCase().includes("electric") ||
      f.name.toLowerCase().includes("hybrid")
  );

  const ratingPercentage = Math.round((car.rating / 5) * 100);

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    return "Fair";
  };

  // ===============================Render==============================
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row">
        {/* ===============================Car Image============================== */}
        <div className="relative w-full lg:w-96 h-64 lg:h-auto shrink-0">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-4 left-4 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-colors">
            <Heart className="size-5 text-gray-600" />
          </button>
        </div>

        {/* ===============================Car Details============================== */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-600">{car.carType}</span>
                {isElectric && (
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                    Electric
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {car.name}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {car.currency}
                {car.totalPrice}
              </div>
              <div className="text-sm text-gray-500">total</div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="size-5 text-gray-400" />
              <span className="text-sm">{car.seats}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <SlSpeedometer className="size-5 text-gray-400" />
              <span className="text-sm">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CarIcon className="size-5 text-gray-400" />
              <span className="text-sm">{car.mileage} milage</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CarIcon className="size-5 text-gray-400" />
              <span className="text-sm">Shuttle service</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2 mb-4 flex-1">
            {car.features.slice(0, 4).map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                <CheckCircle className="size-4 text-green-600 shrink-0" />
                <span className="text-sm text-gray-700">{feature.name}</span>
                {feature.name.toLowerCase().includes("cancellation") && (
                  <button className="ml-auto">
                    <Info className="size-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold">
                {car.company.split(" ")[0]}
              </div>
              <div className="bg-yellow-500 text-white px-3 py-1 rounded text-sm font-semibold">
                {ratingPercentage}%
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {getRatingText(car.rating)}
                </div>
                <div className="text-xs text-gray-500">
                  {car.reviewCount} ratings
                </div>
              </div>
            </div>
            <button
              onClick={() => onReserve(car)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
