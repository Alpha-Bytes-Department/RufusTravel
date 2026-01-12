"use client";

import { IoCalendarOutline, IoPeopleOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { format } from "date-fns";

// ===============================Props Interface==============================
interface BookingSummaryProps {
  tourTitle: string;
  tourImage: string;
  journeyDate: string;
  numberOfGuests: number;
  tourPrice: number;
  addOnsTotal: number;
  currency: string;
  promoCode?: string;
  discount: number;
  onApplyPromoCode?: (code: string) => void;
}

// ===============================Component==============================
const BookingSummary = ({
  tourTitle,
  tourImage,
  journeyDate,
  numberOfGuests,
  tourPrice,
  addOnsTotal,
  currency,
  promoCode,
  discount,
  onApplyPromoCode,
}: BookingSummaryProps) => {
  // ===============================Calculate Totals==============================
  const subtotal = tourPrice * numberOfGuests + addOnsTotal;
  const total = subtotal - discount;
  const currencySymbol = currency === "BDT" ? "৳" : "$";

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h2>

      {/* Tour Image */}
      <div className="mb-4">
        <img
          src={tourImage}
          alt={tourTitle}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>

      {/* Tour Details */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 mb-3">{tourTitle}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <IoCalendarOutline className="text-yellow-500" />
          <span>{format(new Date(journeyDate), "MM/dd/yyyy")}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IoPeopleOutline className="text-yellow-500" />
          <span>
            {numberOfGuests} Guest{numberOfGuests > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 pt-4 mb-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tour Price</span>
          <span className="font-semibold text-gray-900">
            {currencySymbol}
            {tourPrice.toLocaleString()} x {numberOfGuests}
          </span>
        </div>

        {addOnsTotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Add-ons</span>
            <span className="font-semibold text-gray-900">
              {currencySymbol}
              {addOnsTotal.toLocaleString()}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">
            {currencySymbol}
            {subtotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t-2 border-gray-200 pt-4 mb-6">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-yellow-500">
            {currencySymbol}
            {total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Have a promo code?</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            defaultValue={promoCode}
          />
          <button
            onClick={() =>
              onApplyPromoCode && onApplyPromoCode(promoCode || "")
            }
            className="p-2 border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors"
          >
            <IoCheckmarkCircle className="text-2xl text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">Try: WELCOME10 for 10% off</p>
      </div>

      {/* Support Features */}
      <div className="space-y-3">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <IoCheckmarkCircle className="text-yellow-500 text-lg shrink-0 mt-0.5" />
          <span>Free cancellation up to 48 hours before tour</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <IoCheckmarkCircle className="text-yellow-500 text-lg shrink-0 mt-0.5" />
          <span>Instant confirmation via email</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <IoCheckmarkCircle className="text-yellow-500 text-lg shrink-0 mt-0.5" />
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
