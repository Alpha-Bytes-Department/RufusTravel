"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Calendar, Users, Search, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface HotelFormData {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  rooms: number;
}

interface HotelBookingFormProps {
  onSearch: (data: HotelFormData) => void;
}

const HotelBookingForm = ({ onSearch }: HotelBookingFormProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<HotelFormData>({
    defaultValues: {
      location: "",
      checkIn: "",
      checkOut: "",
      adults: 1,
      children: 0,
      infants: 0,
      rooms: 1,
    },
  });

  const [showGuestsSelector, setShowGuestsSelector] = useState(false);
  const [showRoomsSelector, setShowRoomsSelector] = useState(false);

  const adults = watch("adults");
  const children = watch("children");
  const infants = watch("infants");
  const rooms = watch("rooms");

  const totalGuests = adults + children + infants;

  const onSubmit = (data: HotelFormData) => {
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ===============================Search Fields============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location */}
        <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3 lg:col-span-2">
          <Search className="size-8 text-yellow-600" />
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Search</Label>
            <input
              {...register("location", { required: true })}
              className="mt-2 w-full border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0"
              placeholder="City, Hotel or Region"
            />
          </div>
        </div>

        {/* ---Check-in Date--- */}
        <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3">
          <Calendar className="size-8 text-yellow-600" />
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Check-in Date</Label>
            <input
              type="date"
              {...register("checkIn")}
              className="mt-2 w-full border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0"
            />
          </div>
        </div>

        {/* ---Check-out Date--- */}
        <div className="flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3">
          <Calendar className="size-8 text-yellow-600" />
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Check-out Date</Label>
            <input
              type="date"
              {...register("checkOut")}
              className="mt-2 w-full border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0"
            />
          </div>
        </div>

        {/* ---Guests & Rooms--- */}
        <div className="relative flex max-h-20 items-center gap-3 rounded-xl bg-white border border-gray-200 px-3">
          <Users className="size-8 text-yellow-600" />
          <div className="flex flex-col flex-1">
            <Label className="pl-2 text-xs text-gray-600">Guests & Rooms</Label>
            <button
              type="button"
              onClick={() => setShowGuestsSelector(!showGuestsSelector)}
              className="mt-2 w-full text-left border-none py-1 pl-2 text-base font-semibold text-gray-900 focus:outline-0"
            >
              {totalGuests} Guest(s), {rooms} Room(s)
            </button>
          </div>
          {showGuestsSelector && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[280px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
              <h3 className="mb-4 font-semibold text-gray-900">Guests</h3>

              {/* ---Adults--- */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Label className="font-medium text-gray-900">Adult</Label>
                  <p className="text-xs text-gray-500">12+ years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setValue("adults", Math.max(1, adults - 1))}
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setValue("adults", adults + 1)}
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ---Children--- */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Label className="font-medium text-gray-900">Child</Label>
                  <p className="text-xs text-gray-500">2-12 years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("children", Math.max(0, children - 1))
                    }
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {children}
                  </span>
                  <button
                    type="button"
                    onClick={() => setValue("children", children + 1)}
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ---Infants--- */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Label className="font-medium text-gray-900">Infant</Label>
                  <p className="text-xs text-gray-500">Below 2 years</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setValue("infants", Math.max(0, infants - 1))
                    }
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {infants}
                  </span>
                  <button
                    type="button"
                    onClick={() => setValue("infants", infants + 1)}
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <hr className="my-4" />

              {/* ---Rooms--- */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-gray-900">Rooms</h3>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setValue("rooms", Math.max(1, rooms - 1))}
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900">
                    {rooms}
                  </span>
                  <button
                    type="button"
                    onClick={() => setValue("rooms", rooms + 1)}
                    className="flex size-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
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

export default HotelBookingForm;
