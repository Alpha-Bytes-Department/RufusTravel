"use client";

import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

interface TourCardProps {
  id: string;
  image: string;
  badge: {
    text: string;
    icon: "hotel" | "tour";
  };
  location: string;
  title: string;
  description: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  price: number;
  coordinates: [number, number];
  onBookNow?: (id: string) => void;
}

const TourCard = ({
  id,
  image,
  badge,
  location,
  title,
  description,
  amenities,
  rating,
  reviewCount,
  price,
  coordinates,
  onBookNow,
}: TourCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getBadgeIcon = () => {
    if (badge.icon === "hotel") {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9h18v12H3z" />
          <path d="M9 21V9" />
          <path d="M3 9l9-6 9 6" />
        </svg>
      );
    }
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
      </svg>
    );
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium">
          {getBadgeIcon()}
          <span>{badge.text}</span>
        </div>
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`size-5 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-700 hover:text-red-500"
            } transition-colors`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="size-4" />
          <span className="text-sm font-medium">{location}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-1">{description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1 border border-yellow-600 text-yellow-700 rounded-full text-xs font-medium"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="size-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-900">
            {rating.toFixed(1)}
          </span>
          <span className="text-gray-500 text-sm">({reviewCount})</span>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-gray-600">From</span>
            <span className="text-2xl font-bold text-yellow-600">${price}</span>
          </div>
          <Button
            onClick={() => onBookNow?.(id)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2.5 h-auto rounded-lg"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
