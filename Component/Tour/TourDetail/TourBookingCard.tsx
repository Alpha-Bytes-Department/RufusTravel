"use client";

import { useState } from "react";

// ===============================Props Interface==============================
interface TourBookingCardProps {
  price: number;
  currency: string;
  groupDiscount?: string;
  onBookNow: (emailAddress: string, numberOfGuests: number) => void;
  onContactProvider: () => void;
}

// ===============================Component==============================
const TourBookingCard = ({
  price,
  currency,
  groupDiscount,
  onBookNow,
  onContactProvider,
}: TourBookingCardProps) => {
  // ===============================State Management==============================
  const [emailAddress, setEmailAddress] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // ===============================Event Handlers==============================
  const handleBookNow = () => {
    if (emailAddress) {
      onBookNow(emailAddress, numberOfGuests);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-32 h-fit">
      {/* Price Section */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            {currency === "BDT" ? "৳" : "$"}
            {price.toLocaleString()}
          </span>
          <span className="text-gray-600">/person</span>
        </div>
        {groupDiscount && (
          <p className="text-sm text-gray-600 mt-1">{groupDiscount}</p>
        )}
      </div>

      {/* Email Address Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          placeholder="Sunday, January 12, 2025"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
      </div>

      {/* Number of Guests */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Guests
        </label>
        <select
          value={numberOfGuests}
          onChange={(e) => setNumberOfGuests(Number(e.target.value))}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} Guest{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBookNow}
        className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors mb-3"
      >
        Book Now
      </button>

      {/* Contact Provider Button */}
      <button
        onClick={onContactProvider}
        className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-yellow-400 hover:text-yellow-600 transition-colors"
      >
        Contact Tour Provider
      </button>

      {/* Support Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Free cancellation up to 48 hours</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Instant confirmation</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>24/7 customer support</span>
        </div>
      </div>
    </div>
  );
};

export default TourBookingCard;
