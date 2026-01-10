"use client";

import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoCalendarOutline } from "react-icons/io5";
import { format } from "date-fns";

// ===============================Props Interface==============================
interface TourBookingCardProps {
  tourId: string;
  tourTitle: string;
  tourImage: string;
  price: number;
  currency: string;
  groupDiscount?: string;
  onBookNow: (data: BookingData) => void;
  onContactProvider: () => void;
}

interface BookingData {
  journeyDate: Date;
  numberOfGuests: number;
}

// ===============================Component==============================
const TourBookingCard = ({
  tourId,
  tourTitle,
  tourImage,
  price,
  currency,
  groupDiscount,
  onBookNow,
  onContactProvider,
}: TourBookingCardProps) => {
  // ===============================React Hook Form==============================
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingData>({
    defaultValues: {
      journeyDate: new Date(),
      numberOfGuests: 1,
    },
  });

  const selectedDate = watch("journeyDate");

  // ===============================Event Handlers==============================
  const onSubmit = (data: BookingData) => {
    onBookNow(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

        {/* Journey Date Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Journey Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent flex items-center justify-between hover:border-yellow-400 transition-colors"
              >
                <span
                  className={selectedDate ? "text-gray-900" : "text-gray-400"}
                >
                  {selectedDate
                    ? format(selectedDate, "EEEE, MMMM dd, yyyy")
                    : "Select journey date"}
                </span>
                <IoCalendarOutline className="text-gray-500 text-lg" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setValue("journeyDate", date)}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.journeyDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.journeyDate.message}
            </p>
          )}
        </div>

        {/* Number of Guests */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <select
            {...register("numberOfGuests", { required: true, min: 1 })}
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
          type="submit"
          className="w-full py-3 shadow-md shadow-yellow-400 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors mb-3"
        >
          Book Now
        </button>

        {/* Contact Provider Button */}
        <button
          type="button"
          onClick={onContactProvider}
          className="w-full py-3 shadow-md shadow-amber-300 border-2 border-amber-300 text-gray-700 font-semibold rounded-lg hover:border-yellow-400 hover:text-yellow-600 transition-colors mt-3"
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
    </form>
  );
};

export default TourBookingCard;
