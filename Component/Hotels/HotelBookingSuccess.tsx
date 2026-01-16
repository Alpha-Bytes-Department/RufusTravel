"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const HotelBookingSuccess = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 lg:py-18 sm:px-6 lg:px-8 mb-10">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="mx-auto">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-yellow-100 rounded-full blur-xl opacity-70" />
            <CheckCircle
              className="h-24 w-24 text-yellow-500 relative"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-600 max-w-sm mx-auto leading-relaxed">
            You have successfully completed your hotel booking.
            <br />
            Now enjoy your stay!
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-6 space-y-4">
          <button
            onClick={() => router.push("/profile/mybookings")}
            className="
              cursor-pointer
              w-full py-4 px-8
              bg-yellow-500 hover:bg-yellow-600
              text-white font-medium text-lg
              rounded-xl
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
            "
          >
            View My Bookings
          </button>

          <button
            onClick={() => router.push("/hotels")}
            className="
              cursor-pointer
              w-full py-4 px-8
              bg-white border-2 border-gray-300
              text-gray-700 font-medium text-lg
              rounded-xl hover:bg-gray-50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
            "
          >
            Book Another Hotel
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingSuccess;
