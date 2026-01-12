"use client";

import { FaStar, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import type { Tour } from "@/Types/Tour/Tour.types";

// ===============================Props Interface==============================
interface TourCardProps {
  tour: Tour;
  onClick?: (tour: Tour) => void;
}

// ===============================Component==============================
const TourCard = ({ tour, onClick }: TourCardProps) => {
  return (
    <div
      onClick={() => onClick?.(tour)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Tour Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-yellow-50 text-gray-500 px-3 py-1 rounded-lg text-sm font-medium">
          {tour.category}
        </div>
      </div>

      {/* Tour Details */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{tour.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {tour.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            <span className="font-medium text-gray-900">{tour.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({tour.reviewCount})</span>
        </div>

        {/* Price and Duration */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${tour.price.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm"> /person</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <FaCalendarAlt />
            <span>
              {tour.duration.days} Day
              {tour.duration.days > 1 ? "s" : ""}
              {tour.duration.nights > 0
                ? `, ${tour.duration.nights} Night${
                    tour.duration.nights > 1 ? "s" : ""
                  }`
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
