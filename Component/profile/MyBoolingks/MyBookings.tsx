"use client";

import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineHotel } from "react-icons/md";
import { IoAirplaneOutline } from "react-icons/io5";
import { Booking } from "@/Types/Booking/MyBooking.types";
import {
  SAMPLE_FLIGHT_BOOKINGS,
  SAMPLE_HOTEL_BOOKINGS,
  SAMPLE_TRIP_BOOKINGS,
} from "@/public/SampleBookings";
import FlightBookingCard from "./FlightBookingCard";
import HotelBookingCard from "./HotelBookingCard";
import TripBookingCard from "./TripBookingCard";
import BookingDetailsModal from "./BookingDetailsModal";

// ===============================Component==============================
const MyBookings = () => {
  // ===============================State==============================
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const flightBookings = SAMPLE_FLIGHT_BOOKINGS;
  const hotelBookings = SAMPLE_HOTEL_BOOKINGS;
  const tripBookings = SAMPLE_TRIP_BOOKINGS;

  // ===============================Event Handlers==============================
  const handleViewMore = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // ===============================Render==============================
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ===============================Page Header============================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Track and manage all your travel bookings in one place
          </p>
        </div>

        {/* ===============================Flights Section============================== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <IoAirplaneOutline className="text-gray-900 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Flights</h2>
          </div>
          <div className="space-y-4">
            {flightBookings.length > 0 ? (
              flightBookings.map((flight) => (
                <FlightBookingCard
                  key={flight.id}
                  flight={flight}
                  onViewMore={handleViewMore}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No flight bookings found</p>
              </div>
            )}
          </div>
        </section>

        {/* ===============================Hotels Section============================== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <MdOutlineHotel className="text-gray-900 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Hotels</h2>
          </div>
          <div className="space-y-4">
            {hotelBookings.length > 0 ? (
              hotelBookings.map((hotel) => (
                <HotelBookingCard
                  key={hotel.id}
                  hotel={hotel}
                  onViewMore={handleViewMore}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No hotel bookings found</p>
              </div>
            )}
          </div>
        </section>

        {/* ===============================Trips Section============================== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <FiMapPin className="text-gray-900 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Trips</h2>
          </div>
          <div className="space-y-4">
            {tripBookings.length > 0 ? (
              tripBookings.map((trip) => (
                <TripBookingCard
                  key={trip.id}
                  trip={trip}
                  onViewMore={handleViewMore}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No trip bookings found</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ===============================Booking Details Modal============================== */}
      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
      />
    </div>
  );
};

export default MyBookings;
