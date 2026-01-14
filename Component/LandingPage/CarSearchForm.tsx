"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, MapPin, Calendar, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DateTimePicker from "./DateTimePicker";
import { useNavigationState } from "@/Hooks/useNavigationState";
import { CarSearchState } from "@/Types/Navigation/Navigation.types";

interface CarFormData {
  tripType: "oneWay" | "roundTrip";
  from: string;
  to: string;
  journeyDate: string;
  returnDate?: string;
}

const CarSearchForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<CarFormData>({
    defaultValues: {
      tripType: "oneWay",
      from: "Dhaka",
      to: "Cox's Bazar",
      journeyDate: "Nov 28, 2025",
      returnDate: "",
    },
  });

  const [showJourneyPicker, setShowJourneyPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const tripType = watch("tripType");
  const journeyDate = watch("journeyDate");
  const returnDate = watch("returnDate");

  const { navigateWithState } = useNavigationState();

  // ===============================Form Submission==============================
  const onSubmit = (data: CarFormData) => {
    const carSearchData: CarSearchState = {
      tab: "car",
      tripType: data.tripType,
      pickupLocation: data.from,
      dropoffLocation: data.to,
      pickupDate: data.journeyDate,
      dropoffDate: data.returnDate || data.journeyDate,
    };

    console.log("Car Search Submitted:", {
      ...carSearchData,
      timestamp: new Date().toISOString(),
    });

    // Navigate to bookings with car search data
    navigateWithState("/bookings", carSearchData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-transparent"
    >
      {/* ===============================Trip Type Radio Buttons============================== */}
      <RadioGroup
        value={tripType}
        onValueChange={(value) => setValue("tripType", value as any)}
        className="flex flex-wrap items-center justify-center w-fit mx-auto gap-4 rounded-lg bg-[#adb2bd49] p-4 text-lg text-white"
      >
        <div className="flex  items-center space-x-2">
          <RadioGroupItem
            value="oneWay"
            id="carOneWay"
            className="border-white"
          />
          <Label
            htmlFor="carOneWay"
            className="cursor-pointer font-normal text-white"
          >
            One Way
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="roundTrip"
            id="carRoundTrip"
            className="border-white"
          />
          <Label
            htmlFor="carRoundTrip"
            className="cursor-pointer font-normal text-white"
          >
            Round Way
          </Label>
        </div>
      </RadioGroup>

      {/* ===============================Search Fields Grid============================== */}
      <div className="rounded-xl lg:bg-[#adb2bd49] lg:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* ---From Location--- */}
          <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white px-3">
            <Send className="size-8 text-yellow-600" />
            <div className="flex flex-col">
              <Label className="pl-2 text-xs text-yellow-900">From</Label>
              <input
                {...register("from")}
                className="mt-2 w-full border-none py-1 pl-2 text-base font-normal text-gray-900 focus:outline-0"
                placeholder="Dhaka, Bus Terminal"
              />
            </div>
          </div>

          {/* ---To Location--- */}
          <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white px-3">
            <MapPin className="size-8 text-yellow-600" />
            <div className="flex flex-col">
              <Label className="pl-2 text-xs text-yellow-900">To</Label>
              <input
                {...register("to")}
                className="mt-2 w-full border-none py-1 pl-2 text-base font-normal text-gray-900 focus:outline-0"
                placeholder="Cox's Bazar Bus Terminal"
              />
            </div>
          </div>

          {/* ---Journey Date--- */}
          <div className="relative space-y-2">
            <button
              type="button"
              onClick={() => setShowJourneyPicker(!showJourneyPicker)}
              className="flex h-20 w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50"
            >
              <Calendar className="size-8 text-yellow-600" />
              <div className="flex-1">
                <Label className="text-xs text-gray-600">Journey Date</Label>
                <div className="text-base font-semibold text-gray-900">
                  {journeyDate}
                </div>
                <div className="text-xs text-gray-500">Friday, 12:30pm</div>
              </div>
              <button
                type="button"
                className="rounded-md bg-yellow-500 p-1.5 text-white hover:bg-yellow-600"
              >
                <Plus className="size-4" />
              </button>
            </button>
            {showJourneyPicker && (
              <DateTimePicker
                onClose={() => setShowJourneyPicker(false)}
                onSelect={(date: string) => {
                  setValue("journeyDate", date);
                  setShowJourneyPicker(false);
                }}
              />
            )}
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

export default CarSearchForm;
