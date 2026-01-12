"use client";

import { useState } from "react";
import type { TourTab } from "@/Types/Tour/TourDetail.types";

// ===============================Props Interface==============================
interface TourTabsProps {
  activeTab: TourTab;
  onTabChange: (tab: TourTab) => void;
}

// ===============================Component==============================
const TourTabs = ({ activeTab, onTabChange }: TourTabsProps) => {
  // ===============================Tabs Data==============================
  const tabs: TourTab[] = [
    "Overview",
    "Itinerary",
    "What's included",
    "Reviews",
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <div className="flex gap-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-4 px-2 whitespace-nowrap font-medium transition-colors relative ${
              activeTab === tab
                ? "text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TourTabs;
