"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { CarBookingData } from "@/Types/Booking/CarBooking.types";
import CarETicket from "@/Component/Bookings/CarETicket";

// ===============================Component==============================
const CarBookingSuccess = () => {
  const router = useRouter();

  // ===============================State==============================
  const [showETicket, setShowETicket] = useState(false);
  const [bookingData, setBookingData] = useState<CarBookingData | null>(null);

  // ===============================Effects==============================
  /**
   * Load booking data from sessionStorage
   */
  useEffect(() => {
    const data = sessionStorage.getItem("carBooking");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // Redirect if no booking data
      router.push("/bookings");
    }
  }, [router]);

  // ===============================Handlers==============================
  /**
   * Handles view e-ticket button click
   */
  const handleViewETicket = () => {
    setShowETicket(true);
  };

  /**
   * Handles go to home button click
   */
  const handleGoToHome = () => {
    sessionStorage.removeItem("carBooking");
    router.push("/");
  };

  // ===============================Render==============================
  if (!bookingData) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* ===============================Success Icon============================== */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              {/* Icon */}
              <div className="relative bg-yellow-400 rounded-full p-6">
                <CheckCircle className="size-12 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* ===============================Message============================== */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Congratulations!
            </h1>
            <p className="text-gray-600 leading-relaxed">
              You Have Successfully reserved your car . Thank you
              <br />
              For using Tripbank . Have a safe trip and Enjoy
            </p>
          </div>

          {/* ===============================Actions============================== */}
          <div className="space-y-3">
            <Button
              onClick={handleViewETicket}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 text-lg rounded-xl"
            >
              View E-Ticket
            </Button>

            <Button
              onClick={handleGoToHome}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold py-6 text-lg rounded-xl"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>

      {/* ===============================E-Ticket Sidebar============================== */}
      {showETicket && bookingData && (
        <CarETicket
          booking={bookingData}
          onClose={() => setShowETicket(false)}
        />
      )}
    </>
  );
};

export default CarBookingSuccess;
