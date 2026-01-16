"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DateTimePicker from "../LandingPage/DateTimePicker";

interface CarFormData {
  from: string;
  to: string;
  journeyDate: string;
}

interface CarBookingFormProps {
  onSearch: (data: CarFormData) => void;
}

const CarBookingForm = ({ onSearch }: CarBookingFormProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<CarFormData>({
    defaultValues: {
      from: "",
      to: "",
      journeyDate: "",
    },
  });

  const [showJourneyDatePicker, setShowJourneyDatePicker] = useState(false);

  const journeyDate = watch("journeyDate");

  // Get day name like "Friday"
  const getDayName = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const onSubmit = (data: CarFormData) => {
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      {/* ===============================Horizontal Booking Form============================== */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 w-full">
        {/* From Location */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-4 rounded-2xl bg-white border-2 border-gray-300 px-6 py-2 h-full hover:border-yellow-500 transition-colors">
            <Send className="size-8 text-[#D4A60A] shrink-0" />
            <div className="flex flex-col flex-1">
              <Label className="text-xs text-gray-600 mb-1">From</Label>
              <Input
                {...register("from", { required: true })}
                className="border-0 p-0 font-bold text-lg text-[#D4A60A] focus-visible:ring-0 placeholder:text-gray-400"
                placeholder="Pick-up Location"
              />
            </div>
          </div>
        </div>

        {/* To Location */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-4 rounded-2xl bg-white border-2 border-gray-300 px-6 py-2 h-full hover:border-yellow-500 transition-colors">
            <MapPin className="size-8 text-[#D4A60A] shrink-0" />
            <div className="flex flex-col flex-1">
              <Label className="text-xs text-gray-600 mb-1">To</Label>
              <Input
                {...register("to", { required: true })}
                className="border-0 p-0 font-bold text-lg text-[#D4A60A] focus-visible:ring-0 placeholder:text-gray-400"
                placeholder="Drop-off Location"
              />
            </div>
          </div>
        </div>

        {/* Journey Date */}
        <div className="relative flex-1 min-w-[200px]">
          <button
            type="button"
            onClick={() => setShowJourneyDatePicker(!showJourneyDatePicker)}
            className="flex items-center gap-4 rounded-2xl bg-white border-2 border-gray-300 px-6 py-2 h-full w-full hover:border-yellow-500 transition-colors"
          >
            <Calendar className="size-8 text-[#D4A60A] shrink-0" />
            <div className="flex flex-col flex-1 text-left">
              <Label className="text-xs text-gray-600 mb-1">Journey Date</Label>
              {journeyDate ? (
                <>
                  <div className="text-lg font-bold text-[#D4A60A]">
                    {journeyDate}
                  </div>
                  <div className="text-xs text-gray-600">
                    {getDayName(journeyDate)}
                  </div>
                </>
              ) : (
                <div className="text-base font-semibold text-gray-400">
                  Select date
                </div>
              )}
            </div>
          </button>
          {showJourneyDatePicker && (
            <DateTimePicker
              onClose={() => setShowJourneyDatePicker(false)}
              onSelect={(date) => {
                setValue("journeyDate", date);
                setShowJourneyDatePicker(false);
              }}
            />
          )}
        </div>

        {/* Confirm Button */}
        <Button
          type="submit"
          className="bg-[#FFC107] hover:bg-[#FFD54F] text-gray-900 font-bold px-12 py-6 text-lg rounded-2xl min-w-[180px] h-auto shadow-lg"
        >
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default CarBookingForm;
