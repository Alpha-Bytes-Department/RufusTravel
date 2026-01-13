"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DateTimePicker from "./DateTimePicker";
import { useNavigationState } from "@/Hooks/useNavigationState";
import { TourSearchState } from "@/Types/Navigation/Navigation.types";

interface TourFormData {
  destination: string;
  journeyDate: string;
  guests: number;
  tourType: string;
}

const tourTypes = [
  "Beach & Relaxation",
  "Adventure",
  "Cultural",
  "City tours",
  "Wildlife Safari",
  "Honeymoon Special",
];

const TourSearchForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<TourFormData>({
    defaultValues: {
      destination: "",
      journeyDate: "Nov 28, 2025",
      guests: 1,
      tourType: "",
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestsSelector, setShowGuestsSelector] = useState(false);
  const [showTourTypeSelector, setShowTourTypeSelector] = useState(false);

  const journeyDate = watch("journeyDate");
  const guests = watch("guests");
  const tourType = watch("tourType");

  const { navigateWithState } = useNavigationState();

  // ===============================Form Submission==============================
  const onSubmit = (data: TourFormData) => {
    const tourSearchData: TourSearchState = {
      destination: data.destination,
      journeyDate: data.journeyDate,
      guests: data.guests,
      tourType: data.tourType,
    };

    console.log("Tour Search Submitted:", {
      ...tourSearchData,
      timestamp: new Date().toISOString(),
    });

    // Navigate to explore page with tour search data
    navigateWithState("/explore", tourSearchData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-transparent"
    >
      {/* ===============================Search Fields Grid============================== */}
      <div className="rounded-xl lg:bg-[#adb2bd49] lg:p-5">
        <div className="space-y-4">
          {/* ---Search Destination - Full Width--- */}
          <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white px-3">
            <Search className="size-8 text-yellow-600" />
            <div className="flex flex-col flex-1">
              <Label className="pl-2 text-xs text-yellow-900">Search</Label>
              <input
                {...register("destination", { required: true })}
                className="mt-2 w-full border-none py-1 pl-2 text-base font-normal text-gray-900 focus:outline-0"
                placeholder="Destination"
              />
            </div>
          </div>

          {/* ---Journey Date, Guests, Tour Type Row--- */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* ---Journey Date--- */}
            <div className="relative space-y-2">
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex h-20 w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50"
              >
                <Calendar className="size-8 text-yellow-600" />
                <div className="flex-1">
                  <Label className="text-xs text-gray-600">Journey Date</Label>
                  <div className="text-base font-semibold text-gray-900">
                    {journeyDate}
                  </div>
                  <div className="text-xs text-gray-500">Friday</div>
                </div>
              </button>
              {showDatePicker && (
                <DateTimePicker
                  onClose={() => setShowDatePicker(false)}
                  onSelect={(date) => {
                    setValue("journeyDate", date);
                    setShowDatePicker(false);
                  }}
                />
              )}
            </div>

            {/* ---Guests--- */}
            <div className="relative space-y-2">
              <button
                type="button"
                onClick={() => setShowGuestsSelector(!showGuestsSelector)}
                className="flex h-20 w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50"
              >
                <Users className="size-8 text-yellow-600" />
                <div className="flex-1">
                  <Label className="text-xs text-gray-600">Guests</Label>
                  <div className="text-base font-semibold text-gray-900">
                    {guests < 10 ? `0${guests}` : guests}
                  </div>
                  <div className="text-xs text-gray-500">Person</div>
                </div>
              </button>
              {showGuestsSelector && (
                <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[200px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
                  <h3 className="mb-4 font-semibold text-gray-900">Guests</h3>
                  <div className="mb-6 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setValue("guests", Math.max(1, guests - 1))
                      }
                      className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setValue("guests", guests + 1)}
                      className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setShowGuestsSelector(false)}
                    className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                  >
                    Done
                  </Button>
                </div>
              )}
            </div>

            {/* ---Tour Type--- */}
            <div className="relative space-y-2">
              <button
                type="button"
                onClick={() => setShowTourTypeSelector(!showTourTypeSelector)}
                className="flex h-20 w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-yellow-100">
                  <svg
                    className="size-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-gray-600">Tour type</Label>
                  <div className="text-base font-semibold text-gray-900">
                    {tourType || "Click here"}
                  </div>
                </div>
                <ChevronDown className="size-5 text-gray-400" />
              </button>
              {showTourTypeSelector && (
                <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    Trip Type
                  </h3>
                  <div className="space-y-2">
                    {tourTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setValue("tourType", type);
                          setShowTourTypeSelector(false);
                        }}
                        className={`w-full rounded-lg px-4 py-2 text-left text-sm transition-colors hover:bg-yellow-50 ${
                          tourType === type
                            ? "bg-yellow-100 font-semibold text-yellow-700"
                            : "text-gray-700"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===============================Search Button============================== */}
        <div className="mx-auto flex justify-center pt-5">
          <Button
            type="submit"
            className="h-12 w-full rounded-lg bg-yellow-500 font-semibold text-gray-900 hover:bg-yellow-600 md:w-auto md:px-12"
          >
            <Search className="mr-2 size-5" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TourSearchForm;
