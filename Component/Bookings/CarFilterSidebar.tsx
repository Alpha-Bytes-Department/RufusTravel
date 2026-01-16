"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import {
  CarFilterState,
  CarType,
  TransmissionType,
} from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarFilterSidebarProps {
  onFilterChange: (filters: CarFilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

// ===============================Component==============================
const CarFilterSidebar = ({
  onFilterChange,
  onClose,
  isMobile = false,
}: CarFilterSidebarProps) => {
  // ===============================State==============================
  const [isVisible, setIsVisible] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedCarTypes, setSelectedCarTypes] = useState<CarType[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<
    TransmissionType[]
  >([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // ===============================Filter Options==============================
  const carTypeOptions: { type: CarType; price: number }[] = [
    { type: "Economy", price: 35 },
    { type: "Compact", price: 37 },
    { type: "Midsize", price: 39 },
    { type: "Standard", price: 39 },
    { type: "SUV", price: 40 },
    { type: "Luxury", price: 188 },
    { type: "Van", price: 77 },
  ];

  const seatOptions = [
    { label: "2-5 passengers", value: 5, price: 35 },
    { label: "6 or more passengers", value: 6, price: 97 },
  ];

  const priceRangeOptions = [
    { label: "Less than $ 35", min: 0, max: 35 },
    { label: "$ 50 to $ 75", min: 50, max: 75 },
    { label: "$ 75 to $ 100", min: 75, max: 100 },
    { label: "$ 100 to $ 200", min: 100, max: 200 },
    { label: "$ 200 to $ 300", min: 200, max: 300 },
    { label: "Greater than $ 300", min: 300, max: 1000 },
  ];

  const companyOptions = [
    { name: "Alamo rent a car", price: 35 },
    { name: "Avis", price: 35 },
    { name: "Budget", price: 37 },
    { name: "Carwiz", price: 39 },
    { name: "Dollar", price: 39 },
    { name: "Drivalia", price: 83 },
  ];

  const airportPickupOptions = [
    { label: "At terminal", price: 56 },
    { label: "Free shuttle", price: 35 },
  ];

  const specificationOptions = [
    { label: "Automatic", price: 44 },
    { label: "Manual", price: 35 },
    { label: "Unlimited mileage", price: 35 },
    { label: "Limited mileage", price: 38 },
  ];

  // ===============================Helper Functions==============================

  const toggleArrayItem = <T,>(
    array: T[],
    item: T,
    setter: (arr: T[]) => void
  ) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  useEffect(() => {
    onFilterChange({
      priceRange,
      carType: selectedCarTypes,
      transmission: selectedTransmissions,
      seats: selectedSeats,
      company: selectedCompanies,
      features: selectedFeatures,
    });
  }, [
    priceRange,
    selectedCarTypes,
    selectedTransmissions,
    selectedSeats,
    selectedCompanies,
    selectedFeatures,
  ]);

 
  const handleReset = () => {
    setPriceRange([0, 300]);
    setSelectedCarTypes([]);
    setSelectedTransmissions([]);
    setSelectedSeats([]);
    setSelectedCompanies([]);
    setSelectedFeatures([]);
  };


  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  /**
   * Initialize slide-in animation for mobile
   */
  useEffect(() => {
    if (isMobile) {
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [isMobile]);

  // ===============================Render==============================
  return (
    <>
      {/* Backdrop */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-[#53581fa1] z-50 transition-opacity duration-300 ${
            isVisible ? "opacity-50" : "opacity-0"
          }`}
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white ${
          isMobile
            ? `fixed inset-y-0 right-0 w-3/4 sm:w-96 z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
                isVisible ? "translate-x-0" : "translate-x-full"
              }`
            : "  "
        }`}
      >
        <div className={isMobile ? "min-h-screen" : ""}>
          {/* ===============================Header============================== */}
          <div className="flex items-center justify-between p-4 lg:mb-3 lg:bg-amber-50 lg:shadow-md lg:rounded-xl">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleReset}
                variant="outline"
                className="text-yellow-600 border-yellow-400 hover:bg-yellow-50"
              >
                RESET
              </Button>
              {isMobile && (
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="size-5 text-gray-600" />
                </button>
              )}
            </div>
          </div>

          <div className=" space-y-6">
            {/* ===============================Car Type============================== */}
            <div className="lg:mb-3 p-4 lg:bg-amber-50 lg:shadow-md lg:rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                <span>Car Type</span>
                <span className="text-sm text-gray-500">From</span>
              </h3>
              <div className="space-y-2">
                {carTypeOptions.map((option) => (
                  <label
                    key={option.type}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCarTypes.includes(option.type)}
                        onChange={() =>
                          toggleArrayItem(
                            selectedCarTypes,
                            option.type,
                            setSelectedCarTypes
                          )
                        }
                        className="size-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.type}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      $ {option.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ===============================Passengers============================== */}
            <div className="lg:mb-3 p-4 lg:bg-amber-50 lg:shadow-md lg:rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                <span>Car Type</span>
                <span className="text-sm text-gray-500">From</span>
              </h3>
              <div className="space-y-2">
                {seatOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedSeats.includes(option.value)}
                        onChange={() =>
                          toggleArrayItem(
                            selectedSeats,
                            option.value,
                            setSelectedSeats
                          )
                        }
                        className="size-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      $ {option.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ===============================Total Price============================== */}
            <div className="lg:mb-3 p-4 lg:bg-amber-50 lg:shadow-md lg:rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">Total Price</h3>
              <div className="space-y-2">
                {priceRangeOptions.map((option) => (
                  <label
                    key={option.label}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={
                        priceRange[0] === option.min &&
                        priceRange[1] === option.max
                      }
                      onChange={() => setPriceRange([option.min, option.max])}
                      className="size-4 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ===============================Car Hire Company============================== */}
            <div className="lg:mb-3 p-4 lg:bg-amber-50 lg:shadow-md lg:rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                <span>Car hire company</span>
                <span className="text-sm text-gray-500">From</span>
              </h3>
              <div className="space-y-2">
                {companyOptions.map((option) => (
                  <label
                    key={option.name}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(option.name)}
                        onChange={() =>
                          toggleArrayItem(
                            selectedCompanies,
                            option.name,
                            setSelectedCompanies
                          )
                        }
                        className="size-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      $ {option.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ===============================Airport Pick-up============================== */}
            <div className="lg:mb-3 p-4 lg:bg-amber-50 lg:shadow-md lg:rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                <span>Airport pick-up</span>
                <span className="text-sm text-gray-500">From</span>
              </h3>
              <div className="space-y-2">
                {airportPickupOptions.map((option) => (
                  <label
                    key={option.label}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(option.label)}
                        onChange={() =>
                          toggleArrayItem(
                            selectedFeatures,
                            option.label,
                            setSelectedFeatures
                          )
                        }
                        className="size-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      $ {option.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ===============================Specifications============================== */}
            <div className="lg:mb-3 p-4 lg:bg-amber-50 lg:shadow-md lg:rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                <span>Specifications</span>
                <span className="text-sm text-gray-500">From</span>
              </h3>
              <div className="space-y-2">
                {specificationOptions.map((option) => (
                  <label
                    key={option.label}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={
                          option.label === "Automatic"
                            ? selectedTransmissions.includes("Automatic")
                            : option.label === "Manual"
                            ? selectedTransmissions.includes("Manual")
                            : selectedFeatures.includes(option.label)
                        }
                        onChange={() => {
                          if (option.label === "Automatic") {
                            toggleArrayItem(
                              selectedTransmissions,
                              "Automatic" as TransmissionType,
                              setSelectedTransmissions
                            );
                          } else if (option.label === "Manual") {
                            toggleArrayItem(
                              selectedTransmissions,
                              "Manual" as TransmissionType,
                              setSelectedTransmissions
                            );
                          } else {
                            toggleArrayItem(
                              selectedFeatures,
                              option.label,
                              setSelectedFeatures
                            );
                          }
                        }}
                        className="size-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      $ {option.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ===============================Mobile Actions============================== */}
          {isMobile && (
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg">
              <Button
                onClick={handleClose}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
              >
                Show Results
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarFilterSidebar;
