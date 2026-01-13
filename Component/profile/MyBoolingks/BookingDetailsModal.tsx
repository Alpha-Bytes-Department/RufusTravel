"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import {
  FlightBooking,
  HotelBooking,
  TripBooking,
  Booking,
} from "@/Types/Booking/MyBooking.types";

// ===============================Interface==============================
interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
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
const BookingDetailsModal = ({
  isOpen,
  onClose,
  booking,
}: BookingDetailsModalProps) => {
  // ===============================Render Flight Details==============================
  const renderFlightDetails = (flight: FlightBooking) => (
    <div className="space-y-6">
      {/* Flight Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Flight Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Airline</span>
            <span className="font-medium text-gray-900">{flight.airline}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Flight Number</span>
            <span className="font-medium text-gray-900">
              {flight.flightNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Class</span>
            <span className="font-medium text-gray-900">{flight.class}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium text-gray-900">{flight.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Passengers</span>
            <span className="font-medium text-gray-900">
              {flight.passengers}
            </span>
          </div>
        </div>
      </div>

      {/* Departure & Arrival */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Departure</h4>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              {flight.departureCity} ({flight.departureCode})
            </p>
            <p className="font-medium text-gray-900">{flight.departureDate}</p>
            <p className="text-gray-600">{flight.departureTime}</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Arrival</h4>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              {flight.arrivalCity} ({flight.arrivalCode})
            </p>
            <p className="font-medium text-gray-900">{flight.arrivalDate}</p>
            <p className="text-gray-600">{flight.arrivalTime}</p>
          </div>
        </div>
      </div>

      {/* Booking Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          Booking Information
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Reference</span>
            <span className="font-medium text-gray-900">
              {flight.bookingReference}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Date</span>
            <span className="font-medium text-gray-900">
              {new Date(flight.bookingDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                flight.status
              )}`}
            >
              {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-600 font-semibold">Total Price</span>
            <span className="font-bold text-lg text-gray-900">
              {flight.currency}
              {flight.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================Render Hotel Details==============================
  const renderHotelDetails = (hotel: HotelBooking) => (
    <div className="space-y-6">
      {/* Hotel Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Hotel Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Hotel Name</span>
            <span className="font-medium text-gray-900">{hotel.hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rating</span>
            <div className="flex items-center gap-1">
              {renderStars(hotel.rating)}
              <span className="font-medium text-gray-900">{hotel.rating}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location</span>
            <span className="font-medium text-gray-900">{hotel.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">City, Country</span>
            <span className="font-medium text-gray-900">
              {hotel.city}, {hotel.country}
            </span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs"
            >
              {amenity.label}
            </span>
          ))}
        </div>
      </div>

      {/* Check-in/out Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Check-In</h4>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-gray-900">{hotel.checkIn}</p>
            <p className="text-gray-600">{hotel.checkInTime}</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Check-Out</h4>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-gray-900">{hotel.checkOut}</p>
            <p className="text-gray-600">{hotel.checkOutTime}</p>
          </div>
        </div>
      </div>

      {/* Room Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Room Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Room Type</span>
            <span className="font-medium text-gray-900">{hotel.roomType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">View</span>
            <span className="font-medium text-gray-900">{hotel.view}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guests</span>
            <span className="font-medium text-gray-900">
              {hotel.guests} Adults
            </span>
          </div>
        </div>
      </div>

      {/* Booking Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          Booking Information
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Reference</span>
            <span className="font-medium text-gray-900">
              {hotel.bookingReference}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Date</span>
            <span className="font-medium text-gray-900">
              {new Date(hotel.bookingDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                hotel.status
              )}`}
            >
              {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-600 font-semibold">Price per Night</span>
            <span className="font-bold text-lg text-gray-900">
              {hotel.currency}
              {hotel.pricePerNight.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================Render Trip Details==============================
  const renderTripDetails = (trip: TripBooking) => (
    <div className="space-y-6">
      {/* Trip Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Trip Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Trip Name</span>
            <span className="font-medium text-gray-900">{trip.tripName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rating</span>
            <div className="flex items-center gap-1">
              {renderStars(trip.rating)}
              <span className="font-medium text-gray-900">{trip.rating}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location</span>
            <span className="font-medium text-gray-900">
              {trip.location}, {trip.country}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium text-gray-900">
              {trip.duration} Days
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Group Size</span>
            <span className="font-medium text-gray-900">{trip.groupSize}</span>
          </div>
        </div>
      </div>

      {/* Tour Inclusions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Tour Inclusions</h4>
        <div className="flex flex-wrap gap-2">
          {trip.inclusions.map((inclusion, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs"
            >
              {inclusion.label}
            </span>
          ))}
        </div>
      </div>

      {/* Trip Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Start Date</h4>
          <p className="font-medium text-gray-900">{trip.startDate}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">End Date</h4>
          <p className="font-medium text-gray-900">{trip.endDate}</p>
        </div>
      </div>

      {/* Booking Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          Booking Information
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Reference</span>
            <span className="font-medium text-gray-900">
              {trip.bookingReference}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Date</span>
            <span className="font-medium text-gray-900">
              {new Date(trip.bookingDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                trip.status
              )}`}
            >
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-600 font-semibold">
              Price per Person
            </span>
            <span className="font-bold text-lg text-gray-900">
              {trip.currency}
              {trip.pricePerPerson.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================Render Modal Content==============================
  const renderContent = () => {
    if (!booking) return null;

    if (booking.type === "flight") {
      return renderFlightDetails(booking as FlightBooking);
    }

    if (booking.type === "hotel") {
      return renderHotelDetails(booking as HotelBooking);
    }

    if (booking.type === "trip") {
      return renderTripDetails(booking as TripBooking);
    }

    return null;
  };

  // ===============================Render==============================
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Booking Details
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete information about your booking
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
