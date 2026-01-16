"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Download,
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarBookingData } from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarETicketProps {
  booking: CarBookingData;
  onClose: () => void;
}

// ===============================Component==============================
const CarETicket = ({ booking, onClose }: CarETicketProps) => {
  const router = useRouter();

  // ===============================State==============================
  const [isVisible, setIsVisible] = useState(false);

  // ===============================Handlers==============================
  /**
   * Handles closing with animation
   */
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  /**
   * Handles download details
   */
  const handleDownload = () => {
    console.log("Downloading ticket details...");
    // Implement download logic here
  };

  /**
   * Handles view my journey
   */
  const handleViewJourney = () => {
    router.push("/profile/mybookings");
    handleClose();
  };

  /**
   * Handles back to home
   */
  const handleBackToHome = () => {
    sessionStorage.removeItem("carBooking");
    router.push("/");
  };

  /**
   * Initialize slide-in animation
   */
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // ===============================Render==============================
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="min-h-full flex flex-col">
          {/* ===============================Header============================== */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Booking Reference
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {booking.bookingReference}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-600" />
            </button>
          </div>

          {/* ===============================Content============================== */}
          <div className="flex-1 p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold text-sm">
                <span className="size-2 bg-green-500 rounded-full"></span>
                {booking.status === "confirmed" ? "Confirmed" : booking.status}
              </span>
            </div>

            {/* Car Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                {booking.car.name}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={booking.car.companyLogo}
                  alt={booking.car.company}
                  className="h-6 object-contain"
                />
                <span className="text-sm text-gray-600">
                  {booking.car.company}
                </span>
              </div>
              <div className="relative w-full h-32 rounded-lg overflow-hidden bg-white mb-3">
                <img
                  src={booking.car.image}
                  alt={booking.car.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div>
                  <span className="block text-gray-400">Type</span>
                  <span className="font-medium text-gray-900">
                    {booking.car.carType}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-400">Transmission</span>
                  <span className="font-medium text-gray-900">
                    {booking.car.transmission}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-400">Seats</span>
                  <span className="font-medium text-gray-900">
                    {booking.car.seats}
                  </span>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">
                {booking.car.name}
              </h3>

              <div className="space-y-4">
                {/* Pick up */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="size-4" />
                      <span className="font-medium">
                        Pick up, {booking.pickupLocation}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-700 ml-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>{booking.pickupDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>{booking.pickupTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drop off */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-3 bg-yellow-400 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="size-4" />
                      <span className="font-medium">
                        Drop off, {booking.dropoffLocation}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-700 ml-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        <span>{booking.dropoffDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        <span>{booking.dropoffTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">
                Passenger Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="size-4 text-gray-400" />
                  <span>
                    {booking.passenger.firstName} {booking.passenger.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="size-4 text-gray-400" />
                  <span>{booking.passenger.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="size-4 text-gray-400" />
                  <span>{booking.passenger.phone}</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">Payment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ${booking.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes & fees</span>
                  <span className="font-medium">
                    ${booking.taxes.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>AIT & VAT</span>
                  <span className="font-medium">$0</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Other charges</span>
                  <span className="font-medium">$0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">
                    Total Paid
                  </span>
                  <span className="font-bold text-yellow-600 text-xl">
                    ${booking.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===============================Footer============================== */}
          <div className="p-6 border-t border-gray-200 space-y-3 bg-gray-50">
            <Button
              onClick={handleDownload}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 text-lg flex items-center justify-center gap-2"
            >
              <Download className="size-5" />
              Download Details
            </Button>

            <Button
              onClick={handleViewJourney}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold py-6 text-lg"
            >
              View My Journey
            </Button>

            <Button
              onClick={handleBackToHome}
              variant="ghost"
              className="w-full text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 font-semibold py-6 text-lg"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarETicket;
