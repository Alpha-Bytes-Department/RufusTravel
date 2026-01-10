"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/Component/Shared/Logo";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";

// ===============================Props Interface==============================
interface ETicketProps {
  onClose?: () => void;
}

// ===============================Component==============================
const ETicket = ({ onClose }: ETicketProps) => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  // ===============================Load Data==============================
  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData");
    const storedDetails = sessionStorage.getItem("bookingDetails");

    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails));
    }
  }, []);

  // ===============================Print Handler==============================
  const handlePrint = () => {
    window.print();
  };

  // ===============================Calculate Totals==============================
  const calculateTotals = () => {
    if (!bookingData || !bookingDetails)
      return { subtotal: 0, discount: 0, total: 0 };

    const tourTotal = bookingData.price * bookingData.numberOfGuests;
    const addOnsTotal = bookingDetails.addOnsTotal || 0;
    const subtotal = tourTotal + addOnsTotal;
    const discount = bookingDetails.discount || 0;
    const total = subtotal - discount;

    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotals();
  const currencySymbol = bookingData?.currency === "BDT" ? "৳" : "$";

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading ticket details...</p>
      </div>
    );
  }

  return (
    <>
     

      {/* E-Ticket Content */}
      <div className="min-h-screen bg-gray-50 py-8 px-4 print:p-0 print:bg-white">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none printable-ticket">
          {/* Header */}
          <div className="bg-yellow-400 p-8 print:bg-yellow-400">
            <div className="flex justify-between items-start">
              <div>
                <Logo textColor="text-black" />
                <p className="text-sm text-gray-800 mt-2">
                  Your Travel Companion
                </p>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold text-gray-900">E-TICKET</h1>
                <p className="text-sm text-gray-800 mt-1">
                  Booking ID: {bookingDetails?.bookingId || `BK-${Date.now()}`}
                </p>
                <p className="text-sm text-gray-800">
                  Date: {format(new Date(), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="p-8 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">From:</h3>
                <p className="font-semibold text-gray-900">Rufus Travel</p>
                <p className="text-sm text-gray-600">
                  House 123, Road 45, Gulshan-2
                </p>
                <p className="text-sm text-gray-600">Dhaka 1212, Bangladesh</p>
                <p className="text-sm text-gray-600 mt-2">
                  Email: info@rufustravel.com
                </p>
                <p className="text-sm text-gray-600">Phone: +880 1234-567890</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Customer Details:
                </h3>
                <p className="font-semibold text-gray-900">Guest Traveler</p>
                <p className="text-sm text-gray-600">
                  Journey Date:{" "}
                  {format(
                    new Date(bookingData.journeyDate),
                    "EEEE, MMMM dd, yyyy"
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  Number of Guests: {bookingData.numberOfGuests}
                </p>
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <div className="p-8 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Tour Details
            </h3>
            <div className="flex gap-6">
              <img
                src={bookingData.tourImage}
                alt={bookingData.tourTitle}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {bookingData.tourTitle}
                </h4>
                <p className="text-sm text-gray-600">
                  Category: {bookingData.category || "Cultural Tour"}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="p-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 font-bold text-gray-900">
                    Description
                  </th>
                  <th className="text-right py-3 font-bold text-gray-900">
                    Quantity
                  </th>
                  <th className="text-right py-3 font-bold text-gray-900">
                    Unit Price
                  </th>
                  <th className="text-right py-3 font-bold text-gray-900">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-gray-700">
                    {bookingData.tourTitle}
                  </td>
                  <td className="py-4 text-right text-gray-700">
                    {bookingData.numberOfGuests}
                  </td>
                  <td className="py-4 text-right text-gray-700">
                    {currencySymbol}
                    {bookingData.price.toLocaleString()}
                  </td>
                  <td className="py-4 text-right font-semibold text-gray-900">
                    {currencySymbol}
                    {(
                      bookingData.price * bookingData.numberOfGuests
                    ).toLocaleString()}
                  </td>
                </tr>
                {bookingDetails?.selectedAddOns &&
                  bookingDetails.selectedAddOns.length > 0 && (
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-gray-700">Optional Add-ons</td>
                      <td className="py-4 text-right text-gray-700">-</td>
                      <td className="py-4 text-right text-gray-700">-</td>
                      <td className="py-4 text-right font-semibold text-gray-900">
                        {currencySymbol}
                        {bookingDetails.addOnsTotal.toLocaleString()}
                      </td>
                    </tr>
                  )}
              </tbody>
              <tfoot>
                <tr className="border-b border-gray-200">
                  <td
                    colSpan={3}
                    className="py-3 text-right font-semibold text-gray-700"
                  >
                    Subtotal:
                  </td>
                  <td className="py-3 text-right font-semibold text-gray-900">
                    {currencySymbol}
                    {subtotal.toLocaleString()}
                  </td>
                </tr>
                {discount > 0 && (
                  <tr className="border-b border-gray-200">
                    <td
                      colSpan={3}
                      className="py-3 text-right font-semibold text-gray-700"
                    >
                      Discount:
                    </td>
                    <td className="py-3 text-right font-semibold text-green-600">
                      -{currencySymbol}
                      {discount.toLocaleString()}
                    </td>
                  </tr>
                )}
                <tr className="border-t-2 border-gray-300">
                  <td
                    colSpan={3}
                    className="py-4 text-right text-lg font-bold text-gray-900"
                  >
                    Total Amount:
                  </td>
                  <td className="py-4 text-right text-2xl font-bold text-yellow-600">
                    {currencySymbol}
                    {total.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Information */}
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Payment Method:
                </p>
                <p className="text-sm text-gray-900 capitalize">
                  {bookingDetails?.paymentMethod || "PayPal"}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Payment Status:
                </p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  Paid
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Transaction ID:
                </p>
                <p className="text-sm text-gray-900">TXN-{Date.now()}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Payment Date:
                </p>
                <p className="text-sm text-gray-900">
                  {format(new Date(), "MMM dd, yyyy HH:mm")}
                </p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="p-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Terms & Conditions
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Free cancellation up to 48 hours before tour departure</li>
              <li>
                • Please arrive 15 minutes before the scheduled departure time
              </li>
              <li>• This ticket is non-transferable</li>
              <li>• Refunds will be processed within 7-10 business days</li>
              <li>• For any queries, contact us at support@rufustravel.com</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="bg-gray-900 text-white p-6 text-center">
            <p className="text-sm">Thank you for choosing Rufus Travel!</p>
            <p className="text-xs text-gray-400 mt-2">
              This is an electronic ticket. Please keep it for your records.
            </p>
          </div>
        </div>

        {/* Bottom Actions - Hidden in print */}
        {onClose && (
          <div className="no-print max-w-4xl mx-auto mt-6 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-white border-2 border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Close E-Ticket
            </button>
            <button
              onClick={handlePrint}
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Print E-Ticket
            </button>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Page setup */
          @page {
            size: A4;
            margin: 0.5cm;
          }

          /* Hide everything except the ticket */
          body * {
            visibility: hidden;
          }

          .printable-ticket,
          .printable-ticket * {
            visibility: visible;
          }

          .printable-ticket {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            transform: scale(0.85);
            transform-origin: top left;
          }

          /* Hide buttons and non-ticket elements */
          .no-print {
            display: none !important;
          }

          body {
            margin: 0;
            padding: 0;
          }

          /* Compact spacing for print */
          .printable-ticket > div > div {
            padding: 1rem !important;
          }

          .printable-ticket table {
            font-size: 0.875rem;
          }

          .printable-ticket table td,
          .printable-ticket table th {
            padding: 0.5rem !important;
          }

          .printable-ticket h1 {
            font-size: 1.5rem !important;
          }

          .printable-ticket h3 {
            font-size: 1rem !important;
            margin-bottom: 0.75rem !important;
          }

          .printable-ticket ul li {
            line-height: 1.3;
            margin-bottom: 0.25rem !important;
          }

          .printable-ticket img {
            max-width: 80px !important;
            max-height: 80px !important;
          }

          /* Prevent page breaks */
          .printable-ticket,
          .printable-ticket > div,
          .printable-ticket table,
          .printable-ticket thead,
          .printable-ticket tbody,
          .printable-ticket tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:rounded-none {
            border-radius: 0 !important;
          }

          .print\\:p-0 {
            padding: 0 !important;
          }

          .print\\:bg-white {
            background-color: white !important;
          }

          .print\\:bg-yellow-400 {
            background-color: #facc15 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </>
  );
};

export default ETicket;
