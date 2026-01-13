"use client";

import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { HotelBooking } from "@/Types/Booking/MyBooking.types";

// ===============================Interface==============================
interface HotelBookingCardProps {
  hotel: HotelBooking;
  onViewMore: (hotel: HotelBooking) => void;
}

// ===============================Helper Functions==============================
/**
 * Renders star rating
 */
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <BsStarFill key="half" className="text-yellow-400 text-sm opacity-50" />
    );
  }

  return stars;
};

/**
 * Gets status badge color based on booking status
 */
const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    case "completed":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

// ===============================Component==============================
const HotelBookingCard = ({ hotel, onViewMore }: HotelBookingCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-900">
              {hotel.hotelName}
            </h3>
            <div className="flex items-center gap-0.5">
              {renderStars(hotel.rating)}
            </div>
            <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">
              {hotel.rating}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MdLocationOn className="text-gray-400" />
            <span>{hotel.location}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Booking Ref: {hotel.bookingReference}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            hotel.status
          )}`}
        >
          {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
        </span>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 mb-4">
        {hotel.amenities.slice(0, 6).map((amenity, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-yellow-50 text-gray-700 rounded-lg text-xs flex items-center gap-1.5"
          >
            {amenity.label}
          </span>
        ))}
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-1">Check-In</p>
          <p className="font-semibold text-gray-900">{hotel.checkIn}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Check-Out</p>
          <p className="font-semibold text-gray-900">{hotel.checkOut}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Room Type</p>
          <p className="font-semibold text-gray-900">{hotel.roomType}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Guests</p>
          <p className="font-semibold text-gray-900">{hotel.guests} Adults</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          <span className="text-gray-500">View:</span>{" "}
          <span className="font-medium">{hotel.view}</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="text-right flex-1 sm:flex-initial">
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-bold text-xl text-gray-900">
              {hotel.currency}
              {hotel.totalPrice.toLocaleString()}
              <span className="text-sm text-gray-500 font-normal">
                /room/night
              </span>
            </div>
          </div>
          <button
            onClick={() => onViewMore(hotel)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            View more →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingCard;
