"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateTimePicker from "./DateTimePicker";
import TravelerSelector from "./TravelerSelector";

interface HotelFormData {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

const HotelSearchForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<HotelFormData>({
    defaultValues: {
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      rooms: 1,
    },
  });

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [showGuestsSelector, setShowGuestsSelector] = useState(false);

  const checkInDate = watch("checkIn");
  const checkOutDate = watch("checkOut");
  const guests = watch("guests");
  const rooms = watch("rooms");

  // ===============================Form Submission==============================
  const onSubmit = (data: HotelFormData) => {
    console.log("Hotel Search Submitted:", {
      ...data,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ===============================Location and Dates Row============================== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* ---Location--- */}
        <div className="relative space-y-2">
          <Label htmlFor="location" className="text-gray-900">
            Location
          </Label>
          <div className="relative">
            <MapPin className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <Input
              id="location"
              {...register("location", { required: true })}
              placeholder="Where are you going?"
              className="pl-10"
            />
          </div>
        </div>

        {/* ---Check In Date--- */}
        <div className="relative space-y-2">
          <Label htmlFor="checkIn" className="text-gray-900">
            Check In
          </Label>
          <div className="relative">
            <Calendar className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <button
              type="button"
              onClick={() => setShowCheckInPicker(!showCheckInPicker)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-left transition-all hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {checkInDate || "Select check-in date"}
            </button>
            {showCheckInPicker && (
              <DateTimePicker
                onClose={() => setShowCheckInPicker(false)}
                onSelect={(date) => {
                  setValue("checkIn", date);
                  setShowCheckInPicker(false);
                }}
              />
            )}
          </div>
        </div>

        {/* ---Check Out Date--- */}
        <div className="relative space-y-2">
          <Label htmlFor="checkOut" className="text-gray-900">
            Check Out
          </Label>
          <div className="relative">
            <Calendar className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <button
              type="button"
              onClick={() => setShowCheckOutPicker(!showCheckOutPicker)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-left transition-all hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {checkOutDate || "Select check-out date"}
            </button>
            {showCheckOutPicker && (
              <DateTimePicker
                onClose={() => setShowCheckOutPicker(false)}
                onSelect={(date) => {
                  setValue("checkOut", date);
                  setShowCheckOutPicker(false);
                }}
              />
            )}
          </div>
        </div>

        {/* ---Guests and Rooms--- */}
        <div className="relative space-y-2">
          <Label htmlFor="guests" className="text-gray-900">
            Guests & Rooms
          </Label>
          <div className="relative">
            <Users className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-yellow-600" />
            <button
              type="button"
              onClick={() => setShowGuestsSelector(!showGuestsSelector)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-left transition-all hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {guests} Guest{guests > 1 ? "s" : ""}, {rooms} Room
              {rooms > 1 ? "s" : ""}
            </button>
            {showGuestsSelector && (
              <div className="absolute top-full left-0 z-50 mt-2 w-full max-w-xs rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
                {/* ---Guests Counter--- */}
                <div className="mb-4 flex items-center justify-between">
                  <Label className="text-gray-900">Guests</Label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setValue("guests", Math.max(1, guests - 1))
                      }
                      className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-gray-900"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => setValue("guests", guests + 1)}
                      className="flex size-8 items-center justify-center rounded-full bg-yellow-500 text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ---Rooms Counter--- */}
                <div className="mb-4 flex items-center justify-between">
                  <Label className="text-gray-900">Rooms</Label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setValue("rooms", Math.max(1, rooms - 1))}
                      className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-gray-900"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {rooms}
                    </span>
                    <button
                      type="button"
                      onClick={() => setValue("rooms", rooms + 1)}
                      className="flex size-8 items-center justify-center rounded-full bg-yellow-500 text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ---Done Button--- */}
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
        </div>
      </div>

      {/* ===============================Search Button============================== */}
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600 md:w-auto md:px-12"
        >
          <Search className="mr-2 size-5" />
          Search Hotels
        </Button>
      </div>
    </form>
  );
};

export default HotelSearchForm;
