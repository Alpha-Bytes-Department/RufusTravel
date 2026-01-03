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
      <div className="flex gap-3 lg:ml-88 pb-2 ">
        {dates.map((dateOption, index) => {
          const dateString = `${dateOption.date} ${dateOption.month}`;
          const isSelected = selectedDate === dateString;

          return (
            <div key={index} className="relative">
              {dateOption.isBestPrice && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Best Price
                </div>
              )}
              <button
                onClick={() => onDateSelect(dateString)}
                className={`flex flex-col items-center px-14 py-6 rounded-xl border-2 transition-all min-w-[90px] ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-50"
                    : dateOption.isBestPrice
                    ? "border-yellow-300 bg-yellow-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xs text-gray-500 mb-1">
                  {dateOption.day}
                </span>
                <span className="text-lg font-bold text-gray-900 mb-1">
                  {dateOption.date} {dateOption.month}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    dateOption.isBestPrice ? "text-yellow-600" : "text-gray-600"
                  }`}
                >
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
