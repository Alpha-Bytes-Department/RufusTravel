"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import CarPassengerForm from "./CarPassengerForm";
import CarPaymentMethod from "./CarPaymentMethod";
import {
  CarCardData,
  CarPassengerInfo,
  PaymentMethodType,
} from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarCheckoutProps {
  car: CarCardData;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
}

// ===============================Component==============================
const CarCheckout = ({
  car,
  pickupLocation,
  dropoffLocation,
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
}: CarCheckoutProps) => {
  const router = useRouter();

  // ===============================State==============================
  const [passengerInfo, setPassengerInfo] = useState<CarPassengerInfo | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethodType | undefined
  >();
  const [isProcessing, setIsProcessing] = useState(false);

  // ===============================Calculations==============================
  const baseFare = car.totalPrice;
  const taxAmount = baseFare * 0.05;
  const vatAmount = baseFare * 0.05;
  const otherCharges = 0;
  const total = baseFare + taxAmount + vatAmount + otherCharges;

  // ===============================Handlers==============================
  /**
   * Handles passenger form submission
   */
  const handlePassengerSubmit = (data: CarPassengerInfo) => {
    setPassengerInfo(data);
  };

  /**
   * Handles payment method selection
   */
  const handlePaymentSelect = (method: PaymentMethodType) => {
    setPaymentMethod(method);
  };

  /**
   * Handles final payment submission
   */
  const handleProceedToPayment = async () => {
    if (!passengerInfo || !paymentMethod) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const bookingReference = `BK-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 1000000)
      ).padStart(6, "0")}`;

      // Store booking data in sessionStorage
      const bookingData = {
        id: crypto.randomUUID(),
        bookingReference,
        car,
        passenger: passengerInfo,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        subtotal: baseFare,
        taxes: taxAmount + vatAmount,
        fees: otherCharges,
        total,
        currency: car.currency,
        paymentMethod,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem("carBooking", JSON.stringify(bookingData));
      setIsProcessing(false);

      // Navigate to success page
      router.push("/bookings/checkout/car-success");
    }, 2000);
  };

  // ===============================Render==============================
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ===============================Left Section============================== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-24 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={car.companyLogo}
                      alt={car.company}
                      className="h-6 object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {car.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {car.carType} • {car.transmission}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Pick up</p>
                  <p className="font-semibold text-gray-900">
                    {pickupLocation}
                  </p>
                  <p className="text-gray-500">
                    {pickupDate} at {pickupTime}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Drop off</p>
                  <p className="font-semibold text-gray-900">
                    {dropoffLocation}
                  </p>
                  <p className="text-gray-500">
                    {dropoffDate} at {dropoffTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Passenger Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <CarPassengerForm
                onSubmit={handlePassengerSubmit}
                initialData={passengerInfo || undefined}
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <CarPaymentMethod
                onSelect={handlePaymentSelect}
                selectedMethod={paymentMethod}
              />
            </div>
          </div>

          {/* ===============================Right Section (Price Summary)============================== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${total.toFixed(0)}
              </div>

              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>1 x Base Fare (ADULT)</span>
                  <span>USD ${baseFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>1 x Tax (ADULT)</span>
                  <span>USD ${taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <hr className="my-4" />

              <div className="space-y-2 text-sm mb-4">
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

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-yellow-600 text-2xl">
                  ${total.toFixed(3)}
                </span>
              </div>

              <Button
                onClick={handleProceedToPayment}
                disabled={!passengerInfo || !paymentMethod }
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Proceed To Payment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCheckout;
