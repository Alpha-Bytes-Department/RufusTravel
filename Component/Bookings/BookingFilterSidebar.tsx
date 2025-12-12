"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Sunrise, Sun, Cloud, Moon } from "lucide-react";

export interface FilterState {
  stops: number[];
  airlines: string[];
  priceRange: [number, number];
  departureTime: string[];
  arrivalTime: string[];
  preferredClass: string[];
  travelAndBaggage: string[];
  maxTravelTime: number;
}

interface BookingFilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

const BookingFilterSidebar = ({
  onFilterChange,
}: BookingFilterSidebarProps) => {
  const [stops, setStops] = useState<number[]>([1]);
  const [airlines, setAirlines] = useState<string[]>(["All"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 10000]);
  const [departureTime, setDepartureTime] = useState<string[]>([]);
  const [arrivalTime, setArrivalTime] = useState<string[]>([]);
  const [preferredClass, setPreferredClass] = useState<string[]>([]);
  const [travelAndBaggage, setTravelAndBaggage] = useState<string[]>([]);
  const [maxTravelTime, setMaxTravelTime] = useState<number>(28);

  useEffect(() => {
    onFilterChange({
      stops,
      airlines,
      priceRange,
      departureTime,
      arrivalTime,
      preferredClass,
      travelAndBaggage,
      maxTravelTime,
    });
  }, [
    stops,
    airlines,
    priceRange,
    departureTime,
    arrivalTime,
    preferredClass,
    travelAndBaggage,
    maxTravelTime,
  ]);

  const handleReset = () => {
    setStops([1]);
    setAirlines(["All"]);
    setPriceRange([1000, 10000]);
    setDepartureTime([]);
    setArrivalTime([]);
    setPreferredClass([]);
    setTravelAndBaggage([]);
    setMaxTravelTime(28);
  };

  const toggleArrayValue = (
    array: any[],
    setter: Function,
    value: string | number
  ) => {
    if (array.includes(value)) {
      setter(array.filter((item) => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const timeSlots = [
    {
      id: "earlyMorning",
      label: "Early Morning",
      time: "00:00-04:59 am",
      icon: Moon,
    },
    { id: "morning", label: "Morning", time: "05:00-11:59 am", icon: Sunrise },
    { id: "afternoon", label: "Afternoon", time: "12:00-17:59 cm", icon: Sun },
    { id: "evening", label: "Evening", time: "18:00-23:59 am", icon: Cloud },
  ];

  const classOptions = [
    { id: "economy", label: "Economy", count: 35, price: 1761 },
    { id: "premiumEconomy", label: "Premium economy", count: 6, price: 3872 },
    { id: "businessClass", label: "Business class", count: 17, price: 3082 },
    { id: "firstClass", label: "First class", count: 0, price: 13100 },
  ];

  const baggageOptions = [
    { id: "seatChoice", label: "Seat choice included", price: 2158 },
    { id: "handBaggage", label: "Hand baggage included", price: 1761 },
    { id: "noCancelFee", label: "No cancel fee", price: 2284 },
    { id: "cancelFee", label: "Cancel fee", price: 1761 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={handleReset}
          className="text-yellow-600 font-semibold border-2 border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 transition-colors"
        >
          RESET
        </button>
      </div>

      {/* STOPS */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">
          Stops
        </h3>
        <div className="flex gap-6">
          {[0, 1, 2].map((stopCount) => (
            <label
              key={stopCount}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={stops.includes(stopCount)}
                onChange={() => toggleArrayValue(stops, setStops, stopCount)}
                className="size-5 rounded accent-green-500"
              />
              <span className="text-gray-700">
                {stopCount === 2 ? "2+" : stopCount}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* AIRLINES */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">
          Airlines
        </h3>
        <div className="space-y-3">
          {[
            "All",
            "British Air Lines",
            "Fly Emirates",
            "Camair co",
            "Asky Airlines",
          ].map((airline) => (
            <label
              key={airline}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={airlines.includes(airline)}
                onChange={() =>
                  toggleArrayValue(airlines, setAirlines, airline)
                }
                className="size-5 rounded accent-green-500"
              />
              <span className="text-gray-700">{airline}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">
          Price Range
        </h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={1000}
          max={10000}
          step={100}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-gray-700 font-semibold">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* DEPARTURE FROM ABUJA */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">
          Departure from Abuja
        </h3>
        <div className="space-y-2">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            const isSelected = departureTime.includes(slot.id);
            return (
              <button
                key={slot.id}
                onClick={() =>
                  toggleArrayValue(departureTime, setDepartureTime, slot.id)
                }
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isSelected
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-yellow-50 text-gray-700"
                }`}
              >
                <Icon className="size-5" />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">{slot.label}</div>
                  <div className="text-xs opacity-75">{slot.time}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ARRIVAL IN LONDON */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">
          Arrival in London
        </h3>
        <div className="space-y-2">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            const isSelected = arrivalTime.includes(slot.id);
            return (
              <button
                key={slot.id}
                onClick={() =>
                  toggleArrayValue(arrivalTime, setArrivalTime, slot.id)
                }
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isSelected
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-yellow-50 text-gray-700"
                }`}
              >
                <Icon className="size-5" />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">{slot.label}</div>
                  <div className="text-xs opacity-75">{slot.time}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PREFERRED CLASS */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase">
          Preferred class
        </h3>
        <div className="flex justify-between mb-2 text-xs font-semibold text-gray-500 px-1">
          <span></span>
          <span>From</span>
        </div>
        <div className="space-y-3">
          {classOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preferredClass.includes(option.id)}
                  onChange={() =>
                    toggleArrayValue(
                      preferredClass,
                      setPreferredClass,
                      option.id
                    )
                  }
                  className="size-5 rounded border-2 border-gray-300"
                />
                <span className="text-gray-700">
                  {option.label}({option.count})
                </span>
              </div>
              <span className="font-bold text-gray-900">
                ${option.price.toLocaleString()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* TRAVEL AND BAGGAGE */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase">
          Travel and baggage
        </h3>
        <div className="flex justify-between mb-2 text-xs font-semibold text-gray-500 px-1">
          <span></span>
          <span>From</span>
        </div>
        <div className="space-y-3">
          {baggageOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={travelAndBaggage.includes(option.id)}
                  onChange={() =>
                    toggleArrayValue(
                      travelAndBaggage,
                      setTravelAndBaggage,
                      option.id
                    )
                  }
                  className="size-5 rounded border-2 border-gray-300"
                />
                <span className="text-gray-700">{option.label}</span>
              </div>
              <span className="font-bold text-gray-900">
                ${option.price.toLocaleString()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* TOTAL TRAVEL TIME */}
      <div className="mb-2">
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">
          Total travel time
        </h3>
        <div className="text-gray-700 mb-4">Under {maxTravelTime}h</div>
        <Slider
          value={[maxTravelTime]}
          onValueChange={(value) => setMaxTravelTime(value[0])}
          min={1}
          max={48}
          step={1}
          className="mb-2"
        />
      </div>
    </div>
  );
};

export default BookingFilterSidebar;
