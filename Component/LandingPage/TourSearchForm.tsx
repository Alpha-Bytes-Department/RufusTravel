"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateTimePicker from "./DateTimePicker";

interface TourFormData {
  destination: string;
  journeyDate: string;
}

const TourSearchForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<TourFormData>({
    defaultValues: {
      destination: "",
      journeyDate: "",
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const journeyDate = watch("journeyDate");

  // ===============================Form Submission==============================
  const onSubmit = (data: TourFormData) => {
    console.log("Tour Search Submitted:", {
      ...data,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ===============================Destination and Date Row============================== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* ---Destination--- */}
        <div className="relative space-y-2">
          <Label htmlFor="destination" className="text-gray-900">
            Destination
          </Label>
          <div className="relative">
            <MapPin className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <Input
              id="destination"
              {...register("destination", { required: true })}
              placeholder="Where do you want to explore?"
              className="pl-10"
            />
          </div>
        </div>

        {/* ---Journey Date--- */}
        <div className="relative space-y-2">
          <Label htmlFor="journeyDate" className="text-gray-900">
            Journey Date
          </Label>
          <div className="relative">
            <Calendar className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-left transition-all hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {journeyDate || "Select journey date"}
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
        </div>
      </div>

      {/* ===============================Search Button============================== */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600 md:w-auto md:px-12"
        >
          <Search className="mr-2 size-5" />
          Search Tours
        </Button>
      </div>
    </form>
  );
};

export default TourSearchForm;
