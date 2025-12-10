"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DateTimePicker from "./DateTimePicker";

interface CarFormData {
  tripType: "oneWay" | "roundTrip";
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
}

const CarSearchForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<CarFormData>({
    defaultValues: {
      tripType: "oneWay",
      pickUpLocation: "",
      dropOffLocation: "",
      pickUpDate: "",
      dropOffDate: "",
    },
  });

  const [showPickUpPicker, setShowPickUpPicker] = useState(false);
  const [showDropOffPicker, setShowDropOffPicker] = useState(false);

  const tripType = watch("tripType");
  const pickUpDate = watch("pickUpDate");
  const dropOffDate = watch("dropOffDate");

  // ===============================Form Submission==============================
  const onSubmit = (data: CarFormData) => {
    console.log("Car Search Submitted:", {
      ...data,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ===============================Trip Type Selection============================== */}
      <RadioGroup
        value={tripType}
        onValueChange={(value) =>
          setValue("tripType", value as "oneWay" | "roundTrip")
        }
        className="flex gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oneWay" id="oneWay" />
          <Label htmlFor="oneWay" className="cursor-pointer font-medium">
            One Way
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="roundTrip" id="roundTrip" />
          <Label htmlFor="roundTrip" className="cursor-pointer font-medium">
            Round Trip
          </Label>
        </div>
      </RadioGroup>

      {/* ===============================Locations and Dates Row============================== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* ---Pick Up Location--- */}
        <div className="relative space-y-2">
          <Label htmlFor="pickUpLocation" className="text-gray-900">
            Pick Up Location
          </Label>
          <div className="relative">
            <MapPin className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <Input
              id="pickUpLocation"
              {...register("pickUpLocation", { required: true })}
              placeholder="Enter pick-up location"
              className="pl-10"
            />
          </div>
        </div>

        {/* ---Drop Off Location--- */}
        <div className="relative space-y-2">
          <Label htmlFor="dropOffLocation" className="text-gray-900">
            Drop Off Location
          </Label>
          <div className="relative">
            <MapPin className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <Input
              id="dropOffLocation"
              {...register("dropOffLocation", { required: true })}
              placeholder="Enter drop-off location"
              className="pl-10"
            />
          </div>
        </div>

        {/* ---Pick Up Date--- */}
        <div className="relative space-y-2">
          <Label htmlFor="pickUpDate" className="text-gray-900">
            Pick Up Date
          </Label>
          <div className="relative">
            <Calendar className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <button
              type="button"
              onClick={() => setShowPickUpPicker(!showPickUpPicker)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-left transition-all hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {pickUpDate || "Select pick-up date"}
            </button>
            {showPickUpPicker && (
              <DateTimePicker
                onClose={() => setShowPickUpPicker(false)}
                onSelect={(date) => {
                  setValue("pickUpDate", date);
                  setShowPickUpPicker(false);
                }}
              />
            )}
          </div>
        </div>

        {/* ---Drop Off Date--- */}
        <div className="relative space-y-2">
          <Label htmlFor="dropOffDate" className="text-gray-900">
            Drop Off Date
          </Label>
          <div className="relative">
            <Calendar className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <button
              type="button"
              onClick={() => setShowDropOffPicker(!showDropOffPicker)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-left transition-all hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {dropOffDate || "Select drop-off date"}
            </button>
            {showDropOffPicker && (
              <DateTimePicker
                onClose={() => setShowDropOffPicker(false)}
                onSelect={(date) => {
                  setValue("dropOffDate", date);
                  setShowDropOffPicker(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ===============================Search Button============================== */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600 md:w-auto md:px-12"
        >
          <Search className="mr-2 size-5" />
          Search Cars
        </Button>
      </div>
    </form>
  );
};

export default CarSearchForm;
