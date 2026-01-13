"use client";

import React from "react";
import { FiCalendar, FiUsers } from "react-icons/fi";
import { RiPlaneLine } from "react-icons/ri";
import { IoAirplaneOutline } from "react-icons/io5";
import { FlightBooking } from "@/Types/Booking/MyBooking.types";

// ===============================Interface==============================
interface FlightBookingCardProps {
  flight: FlightBooking;
  onViewMore: (flight: FlightBooking) => void;
}

// ===============================Helper Functions==============================
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
const FlightBookingCard = ({ flight, onViewMore }: FlightBookingCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-50 p-2 rounded-lg">
            <IoAirplaneOutline className="text-yellow-600 text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-500">
              {flight.flightNumber} • {flight.airline}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Booking Ref: {flight.bookingReference}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            flight.status
          )}`}
        >
          {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
        </span>
      </div>

      {/* Flight Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        {/* Departure */}
        <div className="text-left">
          <div className="font-bold text-2xl text-gray-900">
            {flight.departureCode}
          </div>
          <div className="text-sm text-gray-600">{flight.departureCity}</div>
          <div className="text-xs text-gray-500 mt-1">
            {flight.departureTime}
          </div>
        </div>

        {/* Flight Path */}
        <div className="flex-1 px-4 w-full sm:w-auto">
          <div className="relative">
            <div className="flex items-center justify-center">
              <div className="flex-1 h-0.5 bg-yellow-400"></div>
              <div className="bg-yellow-400 rounded-full p-2">
                <RiPlaneLine className="text-gray-900 text-base" />
              </div>
              <div className="flex-1 h-0.5 bg-yellow-400"></div>
            </div>
            <div className="text-center mt-2">
              <div className="text-sm font-semibold text-gray-900">
                {flight.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Arrival */}
        <div className="text-left sm:text-right">
          <div className="font-bold text-2xl text-gray-900">
            {flight.arrivalCode}
          </div>
          <div className="text-sm text-gray-600">{flight.arrivalCity}</div>
          <div className="text-xs text-gray-500 mt-1">{flight.arrivalTime}</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <FiCalendar className="text-gray-400" />
            <span>{flight.departureDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiUsers className="text-gray-400" />
            <span>{flight.passengers} passengers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
              {flight.class}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="text-right flex-1 sm:flex-initial">
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-bold text-xl text-gray-900">
              {flight.currency}
              {flight.totalPrice.toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => onViewMore(flight)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            View more →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingCard;
