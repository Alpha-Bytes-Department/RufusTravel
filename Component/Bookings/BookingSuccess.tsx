"use client";

import { useRouter } from "next/navigation";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

// ===============================Props Interface==============================
interface BookingSuccessProps {
  bookingId?: string;
}

// ===============================Component==============================
const BookingSuccess = ({ bookingId }: BookingSuccessProps) => {
  const router = useRouter();

  // ===============================Event Handlers==============================
  const handleViewTicket = () => {
    // TODO: Navigate to ticket/booking details page
    console.log("View ticket:", bookingId);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 opacity-20 rounded-full blur-3xl"></div>
            <div className="relative bg-yellow-400 rounded-full p-6">
              <IoCheckmarkCircleOutline className="text-white text-6xl" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Congratulations!
        </h1>
        <p className="text-gray-600 mb-8">
          You have successfully booked your Tour ticket. Thank you for using
          Tripbank
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleViewTicket}
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-md shadow-yellow-400"
          >
            View E-Ticket
          </button>
          <button
            onClick={handleGoHome}
            className="w-full py-3 border-2 border-yellow-400 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-50 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
