"use client";

import { useState } from "react";
import type { AddOn } from "@/Types/Booking/Booking.types";

// ===============================Props Interface==============================
interface OptionalAddOnsProps {
  addOns: AddOn[];
  selectedAddOns: string[];
  onAddOnsChange: (selectedIds: string[]) => void;
  onContinue: () => void;
  onBack: () => void;
}

// ===============================Component==============================
const OptionalAddOns = ({
  addOns,
  selectedAddOns,
  onAddOnsChange,
  onContinue,
  onBack,
}: OptionalAddOnsProps) => {
  // ===============================Event Handlers==============================
  const handleToggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      onAddOnsChange(selectedAddOns.filter((id) => id !== addOnId));
    } else {
      onAddOnsChange([...selectedAddOns, addOnId]);
    }
  };

  // ===============================Calculate Total==============================
  const calculateAddOnsTotal = () => {
    return addOns
      .filter((addon) => selectedAddOns.includes(addon.id))
      .reduce((total, addon) => total + addon.price, 0);
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Optional Add-ons
      </h2>

      {/* Add-ons List */}
      <div className="space-y-4 mb-8">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOns.includes(addOn.id);
          const currencySymbol = addOn.currency === "BDT" ? "৳" : "$";

          return (
            <div
              key={addOn.id}
              onClick={() => handleToggleAddOn(addOn.id)}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-yellow-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="w-5 h-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{addOn.name}</h3>
                  <p className="text-sm text-gray-600">{addOn.description}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-yellow-500">
                {currencySymbol}
                {addOn.price.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-yellow-400 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="flex-1 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-md shadow-yellow-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OptionalAddOns;
