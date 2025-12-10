"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TravelerSelectorProps {
  onClose: () => void;
  onUpdate: (data: {
    adults: number;
    children: number;
    infants: number;
    class: string;
  }) => void;
  initialValues?: {
    adults: number;
    children: number;
    infants: number;
    class: string;
  };
}

const TravelerSelector: React.FC<TravelerSelectorProps> = ({
  onClose,
  onUpdate,
  initialValues,
}) => {
  const [adults, setAdults] = useState(initialValues?.adults || 1);
  const [children, setChildren] = useState(initialValues?.children || 0);
  const [infants, setInfants] = useState(initialValues?.infants || 0);
  const [selectedClass, setSelectedClass] = useState(
    initialValues?.class || "Economy"
  );

  const classes = [
    "Preferred Class",
    "Premium Economy",
    "Business",
    "First Class",
  ];

  // ===============================Counter Button Component==============================
  const Counter = ({
    value,
    onIncrement,
    onDecrement,
    min = 0,
    max = 9,
  }: {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 transition-all hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center font-semibold text-lg">{value}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        className="flex size-8 items-center justify-center rounded-full bg-yellow-500 text-gray-900 transition-all hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );

  return (
    <div className="absolute top-full left-0 z-50 mt-2 w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
      {/* ===============================Passenger Types============================== */}
      <div className="mb-6 space-y-4">
        {/* ---Adult Counter--- */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Adult</p>
            <p className="text-xs text-gray-500">12+ years</p>
          </div>
          <Counter
            value={adults}
            onIncrement={() => setAdults(adults + 1)}
            onDecrement={() => setAdults(adults - 1)}
            min={1}
          />
        </div>

        {/* ---Child Counter--- */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Child</p>
            <p className="text-xs text-gray-500">2-12 years</p>
          </div>
          <Counter
            value={children}
            onIncrement={() => setChildren(children + 1)}
            onDecrement={() => setChildren(children - 1)}
          />
        </div>

        {/* ---Infant Counter--- */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Infant</p>
            <p className="text-xs text-gray-500">Below 2 years</p>
          </div>
          <Counter
            value={infants}
            onIncrement={() => setInfants(infants + 1)}
            onDecrement={() => setInfants(infants - 1)}
          />
        </div>
      </div>

      {/* ===============================Class Selection============================== */}
      <div className="mb-6">
        <p className="mb-3 font-semibold text-gray-900">Class</p>
        <div className="grid grid-cols-2 gap-2">
          {classes.map((classOption) => (
            <button
              key={classOption}
              type="button"
              onClick={() => setSelectedClass(classOption)}
              className={`rounded-lg px-4 py-3 text-center font-medium transition-all ${
                selectedClass === classOption
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {classOption}
            </button>
          ))}
        </div>
      </div>

      {/* ===============================Action Buttons============================== */}
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => {
            onUpdate({ adults, children, infants, class: selectedClass });
            onClose();
          }}
          className="flex-1 bg-yellow-500 text-gray-900 hover:bg-yellow-600"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default TravelerSelector;
