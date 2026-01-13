"use client";

import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { TripBooking } from "@/Types/Booking/MyBooking.types";

// ===============================Interface==============================
interface TripBookingCardProps {
  trip: TripBooking;
  onViewMore: (trip: TripBooking) => void;
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
const TripBookingCard = ({ trip, onViewMore }: TripBookingCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-900">{trip.tripName}</h3>
            <div className="flex items-center gap-0.5">
              {renderStars(trip.rating)}
            </div>
            <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">
              {trip.rating}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MdLocationOn className="text-gray-400" />
            <span>
              {trip.location}, {trip.country}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Booking Ref: {trip.bookingReference}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            trip.status
          )}`}
        >
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </span>
      </div>

      {/* Tour Includes */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Tour Include</p>
        <div className="flex flex-wrap gap-2">
          {trip.inclusions.map((inclusion, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-yellow-50 text-gray-700 rounded-lg text-xs flex items-center gap-1.5"
            >
              {inclusion.label}
            </span>
          ))}
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-1">Duration</p>
          <p className="font-semibold text-gray-900">{trip.duration} Days</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Group Size</p>
          <p className="font-semibold text-gray-900">{trip.groupSize}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">Start Date</p>
          <p className="font-semibold text-gray-900">{trip.startDate}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-1">End Date</p>
          <p className="font-semibold text-gray-900">{trip.endDate}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          <span className="text-gray-500">Booked on:</span>{" "}
          <span className="font-medium">
            {new Date(trip.bookingDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="text-right flex-1 sm:flex-initial">
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-bold text-xl text-gray-900">
              {trip.currency}
              {trip.totalPrice.toLocaleString()}
              <span className="text-sm text-gray-500 font-normal">/person</span>
            </div>
          </div>
          <button
            onClick={() => onViewMore(trip)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            View more →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripBookingCard;
