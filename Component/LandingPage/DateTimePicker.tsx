"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DateTimePickerProps {
  onClose: () => void;
  onSelect: (date: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onClose,
  onSelect,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("Nov");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedDate, setSelectedDate] = useState(28);
  const [selectedTime, setSelectedTime] = useState("12:00 am");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

  // ===============================Generate Calendar Days==============================
  const generateCalendarDays = () => {
    const daysInMonth = 30; // Simplified
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  // ===============================Generate Time Slots==============================
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour < 12 ? "am" : "pm";
        const time = `${String(h).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )} ${period}`;
        times.push(time);
      }
    }
    return times;
  };

  const days = generateCalendarDays();
  const timeSlots = generateTimeSlots();

  return (
    <div className="absolute top-full left-0 z-50 mt-2 w-80 rounded-2xl border border-gray-200 bg-linear-to-br from-yellow-50 to-orange-50 p-6 shadow-2xl">
      {/* ===============================Month and Year Selectors============================== */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full appearance-none rounded-lg border-none bg-white px-4 py-2 pr-8 font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-5 -translate-y-1/2" />
        </div>

        <div className="relative flex-1">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full appearance-none rounded-lg border-none bg-white px-4 py-2 pr-8 font-bold text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-5 -translate-y-1/2" />
        </div>
      </div>

      {/* ===============================Calendar Grid============================== */}
      <div className="mb-4">
        <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-600">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDate(day)}
              className={`aspect-square rounded-lg p-2 text-center font-medium transition-all ${
                selectedDate === day
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-gray-900 hover:bg-yellow-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* ===============================Time Slots============================== */}
      <div className="mb-4 max-h-48 overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setSelectedTime(time)}
              className={`rounded-lg border-2 px-4 py-3 text-center font-medium transition-all ${
                selectedTime === time
                  ? "border-yellow-600 bg-yellow-500 text-gray-900"
                  : "border-yellow-200 bg-white text-gray-900 hover:border-yellow-400"
              }`}
            >
              {time}
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
            onSelect(`${selectedMonth} ${selectedDate}, ${selectedYear}`);
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

export default DateTimePicker;
