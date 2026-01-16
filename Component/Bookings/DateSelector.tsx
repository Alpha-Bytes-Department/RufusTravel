"use client";

import React from "react";

interface DateOption {
  day: string;
  date: number;
  month: string;
  price: number;
  isBestPrice?: boolean;
}

interface DateSelectorProps {
  dates: DateOption[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const DateSelector = ({
  dates,
  selectedDate,
  onDateSelect,
}: DateSelectorProps) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex gap-3 pb-2 ">
        {dates.map((dateOption, index) => {
          const dateString = `${dateOption.date} ${dateOption.month}`;
          const isSelected = selectedDate === dateString;

          return (
            <div key={index} className="relative">
              <button
                onClick={() => onDateSelect(dateString)}
                className={`flex flex-col items-center px-13 py-4 rounded-xl border-2 transition-all min-w-[90px] ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xs text-gray-500 mb-1">
                  {dateOption.day}
                </span>
                <p className="text-base font-bold text-gray-900 mb-1 whitespace-nowrap">
                  {dateOption.date} {dateOption.month}
                </p>
                <span className="text-sm font-semibold text-gray-600">
                  ${dateOption.price.toLocaleString()}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
