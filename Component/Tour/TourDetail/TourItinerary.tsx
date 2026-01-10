"use client";

import { IoCheckmarkCircle } from "react-icons/io5";
import type { ItineraryItem } from "@/Types/Tour/TourDetail.types";

// ===============================Props Interface==============================
interface TourItineraryProps {
  items: ItineraryItem[];
}

// ===============================Component==============================
const TourItinerary = ({ items }: TourItineraryProps) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="bg-blue-100 p-4 rounded-xl shrink-0">
              <IoCheckmarkCircle className="text-blue-600 text-3xl" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {item.title}
              </h3>
              <p className="text-blue-800 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourItinerary;
