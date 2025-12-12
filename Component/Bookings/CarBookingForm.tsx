"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Send, MapPin, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type TripType = "oneWay" | "roundTrip";

interface CarFormData {
  tripType: TripType;
  from: string;
  to: string;
  journeyDate: string;
  returnDate?: string;
}

interface CarBookingFormProps {
  onSearch: (data: CarFormData) => void;
}

const CarBookingForm = ({ onSearch }: CarBookingFormProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<CarFormData>({
    defaultValues: {
      tripType: "oneWay",
      from: "",
      to: "",
      journeyDate: "",
      returnDate: "",
    },
  });

  const tripType = watch("tripType");

  const onSubmit = (data: CarFormData) => {
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ===============================Trip Type============================== */}
      <div className="flex items-center justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-xl flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={tripType === "oneWay"}
            onChange={() => setValue("tripType", "oneWay")}
            className="size-5 accent-gray-900"
          />
          <span className="font-medium text-gray-700">One Way</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={tripType === "roundTrip"}
            onChange={() => setValue("tripType", "roundTrip")}
            className="size-5 accent-gray-900"
          />
          <span className="font-medium text-gray-700">Round Trip</span>
        </label>
      </div>

      {/* ===============================Search Fields============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From Location */}
        <div className="border border-gray-300 rounded-xl p-4">
          <Label className="text-gray-500 text-xs mb-1">From</Label>
          <div className="flex items-center gap-2">
            <Send className="size-5 text-yellow-600" />
            <Input
              {...register("from", { required: true })}
              className="border-0 p-0 font-semibold text-gray-900 text-lg focus-visible:ring-0"
              placeholder="Pick-up Location"
            />
          </div>
        </div>

        {/* ---To Location--- */}
        <div className="border border-gray-300 rounded-xl p-4">
          <Label className="text-gray-500 text-xs mb-1">To</Label>
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-yellow-600" />
            <Input
              {...register("to", { required: true })}
              className="border-0 p-0 font-semibold text-gray-900 text-lg focus-visible:ring-0"
              placeholder="Drop-off Location"
            />
          </div>
        </div>

        {/* ---Journey Date--- */}
        <div className="border border-gray-300 rounded-xl p-4">
          <Label className="text-gray-500 text-xs mb-1">Journey Date</Label>
          <Input
            type="date"
            {...register("journeyDate")}
            className="border-0 p-0 font-semibold text-gray-900 text-lg focus-visible:ring-0"
          />
          <p className="text-gray-500 text-sm mt-1">
            {watch("journeyDate") &&
              new Date(watch("journeyDate") || "").toLocaleDateString("en-US", {
                weekday: "long",
              })}
          </p>
        </div>

        {/* ---Return Date--- */}
        {tripType === "roundTrip" && (
          <div className="border border-gray-300 rounded-xl p-4">
            <Label className="text-gray-500 text-xs mb-1">Return Date</Label>
            <Input
              type="date"
              {...register("returnDate")}
              className="border-0 p-0 font-semibold text-gray-900 text-lg focus-visible:ring-0"
            />
            <p className="text-gray-500 text-sm mt-1">
              {watch("returnDate") &&
                new Date(watch("returnDate") || "").toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                  }
                )}
            </p>
          </div>
        )}
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

export default CarBookingForm;
