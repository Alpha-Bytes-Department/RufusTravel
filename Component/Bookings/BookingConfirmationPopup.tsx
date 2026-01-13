"use client"
import React, { useState } from "react";
import { Drawer } from "antd";
import { Download, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const BookingConfirmationPopup: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleDownloadTicket = () => {
    // TODO: Implement ticket download logic (e.g., generate PDF or API call)
  };

  const handleViewJourney = () => {
    router.push("/journey"); 
  };

  const handleBackToHome = () => {
    onClose();
    router.push("/"); 
  };

  return (
    <>
      <button
        onClick={showDrawer}
        className="cursor-pointer
              w-full py-4 px-8
              bg-yellow-500 hover:bg-yellow-600
              text-white font-semibold text-lg
              rounded-xl shadow-md hover:shadow-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
      >
        View E-Ticket
      </button>

      <Drawer
        title={
          <div className="flex justify-between items-center">
            <span>Booking Confirmation</span>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Confirmed</span>
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        width={520}
        footer={
          <div className="space-y-3 pt-4">
            <button
              onClick={handleBackToHome}
              className="w-full py-3 px-4 border border-yellow-300 text-yellow-700 bg-yellow-50 hover:bg-yellow-100 rounded-xl font-medium transition"
            >
              Back to Home
            </button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Booking Reference */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <span className="text-sm font-medium text-gray-600">Booking Reference</span>
            <span className="text-lg font-bold text-gray-900">BK-2024-01234</span>
          </div>

          {/* Flight Details */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-4 text-center text-2xl">British Airline</h3>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-sm text-gray-500">From Abuja</div>
                <div className="font-bold">Dec 1, 2024</div>
                <div className="text-sm font-medium">3:00 PM</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-bold text-lg">18h 10m</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500">To London</div>
                <div className="font-bold">Dec 4, 2024</div>
                <div className="text-sm font-medium">11:00 AM</div>
              </div>
            </div>
            <div className="mt-3 text-center text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">1 Adults</span>
            </div>
          </div>

          {/* Passenger Information */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Passenger Information</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">john@example.com</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">+1 555-0100</div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">$9,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-medium">$3,000.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                <span>Total Paid</span>
                <span className="text-green-600">$12,000.00</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadTicket}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download Ticket
            </button>
            <button
              onClick={handleViewJourney}
              className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition cursor-pointer"
            >
              <Eye className="h-4 w-4 inline mr-2" />
              View My Journey
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default BookingConfirmationPopup;