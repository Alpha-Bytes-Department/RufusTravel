"use client";

import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FiAlertCircle } from "react-icons/fi";
import type {
  TourHighlight,
  TourRequirement,
} from "@/Types/Tour/TourDetail.types";

// ===============================Props Interface==============================
interface TourOverviewProps {
  description: string;
  highlights: TourHighlight[];
  requirements: TourRequirement[];
}

// ===============================Component==============================
const TourOverview = ({
  description,
  highlights,
  requirements,
}: TourOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* About This Tour */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About This Tour
        </h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Highlights */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex items-start gap-3">
              <IoCheckmarkCircleOutline className="text-yellow-500 text-xl shrink-0 mt-0.5" />
              <span className="text-gray-700">{highlight.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
        <div className="space-y-3">
          {requirements.map((requirement) => (
            <div key={requirement.id} className="flex items-start gap-3">
              <FiAlertCircle className="text-red-400 text-xl shrink-0 mt-0.5" />
              <span className="text-gray-700">{requirement.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourOverview;
