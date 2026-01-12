"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingStepper from "@/Component/Bookings/BookingStepper";
import BookingSummary from "@/Component/Bookings/BookingSummary";
import OptionalAddOns from "@/Component/Bookings/OptionalAddOns";
import PaymentMethodSelector from "@/Component/Bookings/PaymentMethodSelector";
import BookingSuccess from "@/Component/Bookings/BookingSuccess";
import { SAMPLE_ADDONS } from "@/public/SampleAddons";
import type {
  PaymentMethod,
  BookingFormData,
} from "@/Types/Booking/Booking.types";

// ===============================Component==============================
const TourBooking = () => {
  const router = useRouter();

  // ===============================State Management==============================
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // ===============================Load Booking Data==============================
  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      // If no booking data, redirect back to tour page
      router.push("/tour");
    }
  }, [router]);

  // ===============================Calculate Add-ons Total==============================
  const calculateAddOnsTotal = () => {
    return SAMPLE_ADDONS.filter((addon) =>
      selectedAddOns.includes(addon.id)
    ).reduce((total, addon) => total + addon.price, 0);
  };

  // ===============================Event Handlers==============================
  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      // Save booking details for e-ticket
      const bookingDetails = {
        bookingId: `BK-${Date.now()}`,
        selectedAddOns: selectedAddOns,
        addOnsTotal: calculateAddOnsTotal(),
        paymentMethod: paymentMethod,
        discount: discount,
        promoCode: promoCode,
      };
      sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleApplyPromoCode = (code: string) => {
    // Simple promo code logic
    if (code === "WELCOME10") {
      const subtotal =
        bookingData?.price * bookingData?.numberOfGuests +
        calculateAddOnsTotal();
      setDiscount(subtotal * 0.1);
      setPromoCode(code);
    }
  };

  // ===============================Render Loading State==============================
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stepper - Always visible, shows all complete in step 3 */}
        <BookingStepper
          currentStep={currentStep === 3 ? 4 : currentStep}
          totalSteps={3}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Booking Steps */}
          <div
            className={currentStep === 3 ? "lg:col-span-3" : "lg:col-span-2"}
          >
            {currentStep === 1 && (
              <OptionalAddOns
                addOns={SAMPLE_ADDONS}
                selectedAddOns={selectedAddOns}
                onAddOnsChange={setSelectedAddOns}
                onContinue={handleContinue}
                onBack={handleBack}
              />
            )}

            {currentStep === 2 && (
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
                onContinue={handleContinue}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <BookingSuccess bookingId={`BK-${Date.now()}`} />
            )}
          </div>

          {/* Right Column - Booking Summary (Hidden in Step 3) */}
          {currentStep !== 3 && (
            <div className="lg:col-span-1">
              <BookingSummary
                tourTitle={bookingData.tourTitle}
                tourImage={bookingData.tourImage}
                journeyDate={bookingData.journeyDate}
                numberOfGuests={bookingData.numberOfGuests}
                tourPrice={bookingData.price}
                addOnsTotal={calculateAddOnsTotal()}
                currency={bookingData.currency}
                promoCode={promoCode}
                discount={discount}
                onApplyPromoCode={handleApplyPromoCode}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourBooking;
