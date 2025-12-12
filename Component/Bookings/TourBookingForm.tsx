"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TourFormData {
  destination: string;
  journeyDate: string;
  guests: number;
  tourType: string;
}

interface TourBookingFormProps {
  onSearch: (data: TourFormData) => void;
}

const tourTypes = [
  "Beach & Relaxation",
  "Adventure",
  "Cultural",
  "City tours",
  "Wildlife Safari",
  "Honeymoon Special",
];

const TourBookingForm = ({ onSearch }: TourBookingFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<TourFormData>({
    defaultValues: {
      destination: "",
      journeyDate: "",
      guests: 1,
      tourType: "",
    },
  });

  const [showGuestsSelector, setShowGuestsSelector] = useState(false);
  const [showTourTypeSelector, setShowTourTypeSelector] = useState(false);

  const guests = watch("guests");
  const tourType = watch("tourType");

  const onSubmit = (data: TourFormData) => {
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ===============================Search Fields============================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Destination */}
        <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3">
          <Search className="size-8 text-yellow-600" />
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Search</Label>
            <input
              {...register("destination", { required: true })}
              className="mt-2 w-full border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0"
              placeholder="Destination"
            />
          </div>
        </div>

        {/* ---Journey Date--- */}
        <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3">
          <Calendar className="size-8 text-yellow-600" />
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Journey Date</Label>
            <input
              type="date"
              {...register("journeyDate")}
              className="mt-2 w-full border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0"
            />
          </div>
        </div>

        {/* ---Guests--- */}
        <div className="relative flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3">
          <Users className="size-8 text-yellow-600" />
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Guests</Label>
            <button
              type="button"
              onClick={() => setShowGuestsSelector(!showGuestsSelector)}
              className="mt-2 w-full text-left border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0"
            >
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </button>
          </div>
          {showGuestsSelector && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[200px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
              <h3 className="mb-4 font-semibold text-gray-900">Guests</h3>
              <div className="mb-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setValue("guests", Math.max(1, guests - 1))}
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
        <div className="relative flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3 md:col-span-3">
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
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Tour Type</Label>
            <button
              type="button"
              onClick={() => setShowTourTypeSelector(!showTourTypeSelector)}
              className="mt-2 w-full text-left border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0 flex items-center justify-between"
            >
              <span>{tourType || "Select tour type"}</span>
              <ChevronDown className="size-5 text-gray-400" />
            </button>
          </div>
          {showTourTypeSelector && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
              <h3 className="mb-3 font-semibold text-gray-900">Trip Type</h3>
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

      {/* ===============================Search Button============================== */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-12 py-6 text-lg rounded-xl"
        >
          <Search className="mr-2 size-5" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default TourBookingForm;
