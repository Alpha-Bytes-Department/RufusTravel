"use client";

import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import type { IncludedItem } from "@/Types/Tour/TourDetail.types";

// ===============================Props Interface==============================
interface TourWhatsIncludedProps {
  items: IncludedItem[];
}

// ===============================Component==============================
const TourWhatsIncluded = ({ items }: TourWhatsIncludedProps) => {
  // ===============================Separate Items==============================
  const includedItems = items.filter((item) => item.included);
  const notIncludedItems = items.filter((item) => !item.included);

  return (
    <div className="space-y-8">
      {/* What's Included */}
      {includedItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What's Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {includedItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <IoCheckmarkCircle className="text-yellow-500 text-2xl shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What's Not Included */}
      {notIncludedItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What's Not Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notIncludedItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <IoCloseCircle className="text-gray-400 text-2xl shrink-0 mt-0.5" />
                <span className="text-gray-600 text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourWhatsIncluded;
