"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCardData } from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarBookingSummaryProps {
  car: CarCardData;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  onClose: () => void;
  onContinue: () => void;
  isMobile?: boolean;
}

// ===============================Component==============================
const CarBookingSummary = ({
  car,
  pickupLocation,
  dropoffLocation,
  pickupDate,
  dropoffDate,
  onClose,
  onContinue,
  isMobile = false,
}: CarBookingSummaryProps) => {
  // ===============================State==============================
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // ===============================Calculations==============================
  const baseFare = car.totalPrice;
  const taxAmount = baseFare * 0.05; // 5% tax
  const vatAmount = baseFare * 0.05; // 5% VAT
  const otherCharges = 0;
  const total = baseFare + taxAmount + vatAmount + otherCharges;

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
        className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* ===============================Header============================== */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{car.name}</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-600" />
            </button>
          </div>

          {/* ===============================Content============================== */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Price Display */}
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-gray-900">
                ${total.toFixed(0)}
              </div>
            </div>

            {/* Fare Details Accordion */}
            <div className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">
                  Fare Details
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {showDetails ? "Hide" : "Show"}
                  </span>
                  {showDetails ? (
                    <ChevronUp className="size-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="size-5 text-gray-600" />
                  )}
                </div>
              </button>

              {showDetails && (
                <div className="px-4 pb-4 space-y-3 text-sm border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-700">
                    <span>1 x Base fare (ADULT)</span>
                    <span>USD ${baseFare.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>1 x Tax (ADULT)</span>
                    <span>USD ${taxAmount.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Charges */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>AIT & VAT</span>
                <span>USD ${vatAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Other charges</span>
                <span>USD ${otherCharges}</span>
              </div>
            </div>

            <hr className="my-4" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900 text-lg">Total</span>
              <span className="font-bold text-yellow-600 text-2xl">
                ${total.toFixed(3)}
              </span>
            </div>

            {/* Trip Details */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Pick up:</span>
                <span className="font-medium text-gray-900">
                  {pickupLocation}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drop off:</span>
                <span className="font-medium text-gray-900">
                  {dropoffLocation}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pick up date:</span>
                <span className="font-medium text-gray-900">{pickupDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drop off date:</span>
                <span className="font-medium text-gray-900">{dropoffDate}</span>
              </div>
            </div>
          </div>

          {/* ===============================Footer============================== */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button
              onClick={onContinue}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 text-lg"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarBookingSummary;
