"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Calendar, Users, Search, Hotel, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DateTimePicker from "./DateTimePicker";

interface HotelFormData {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  rooms: number;
}

const HotelSearchForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<HotelFormData>({
    defaultValues: {
      location: "",
      checkIn: "",
      checkOut: "",
      adults: 1,
      children: 0,
      infants: 0,
      rooms: 2,
    },
  });

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [showGuestsSelector, setShowGuestsSelector] = useState(false);
  const [showRoomsSelector, setShowRoomsSelector] = useState(false);

  const checkInDate = watch("checkIn");
  const checkOutDate = watch("checkOut");
  const adults = watch("adults");
  const children = watch("children");
  const infants = watch("infants");
  const rooms = watch("rooms");

  const totalGuests = adults + children + infants;

  // ===============================Form Submission==============================
  const onSubmit = (data: HotelFormData) => {
    console.log("Hotel Search Submitted:", {
      ...data,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-transparent"
    >
      {/* ===============================Search Fields Grid============================== */}
      <div className="rounded-xl lg:bg-[#adb2bd49] lg:p-5">
        {/* ---Location (Search) - Full Width on Mobile, 2 cols on Large--- */}
        <div className="flex max-h-28 py-2 mb-3 items-center gap-3 rounded-xl bg-white px-3 lg:col-span-2">
          <Search className="size-8 text-yellow-600" />
          <div className="flex flex-col">
            <Label className="pl-2 text-xs text-yellow-900">Search</Label>
            <input
              {...register("location", { required: true })}
              className="mt-2 w-full border-none py-1 pl-2 text-base font-normal text-gray-900 focus:outline-0"
              placeholder="City, Hotel or Region"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4  lg:grid-cols-4">
          {/* ---Check In Date--- */}
          <div className="relative w-full space-y-2">
            <button
              type="button"
              onClick={() => setShowCheckInPicker(!showCheckInPicker)}
              className="flex h-20 w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50"
            >
              <Calendar className="size-8 text-yellow-600" />
              <div className="flex-1">
                <Label className="text-xs text-gray-600">Check-in Date</Label>
                <div className="text-base font-semibold text-gray-900">
                  {checkInDate || "Nov 28, 2025"}
                </div>
                <div className="text-xs text-gray-500">Friday</div>
              </div>
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

          {/* ---Check Out Date--- */}
          <div className="relative space-y-2">
            <button
              type="button"
              onClick={() => setShowCheckOutPicker(!showCheckOutPicker)}
              className="flex h-20 w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50"
            >
              <Calendar className="size-8 text-yellow-600" />
              <div className="flex-1">
                <Label className="text-xs text-gray-600">Check-out Date</Label>
                <div className="text-base font-semibold text-gray-900">
                  {checkOutDate || "Nov 28, 2025"}
                </div>
                <div className="text-xs text-gray-500">Friday</div>
              </div>
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
                  {totalGuests < 10 ? `0${totalGuests}` : totalGuests}
                </div>
                <div className="text-xs text-gray-500">Person</div>
              </div>
            </button>
            {showGuestsSelector && (
              <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-[280px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
                <h3 className="mb-4 font-semibold text-gray-900">Guest (s)</h3>

                {/* ---Adult Counter--- */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-gray-900">Adult</Label>
                    <p className="text-xs text-gray-500">12+ years</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setValue("adults", Math.max(1, adults - 1))
                      }
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

                {/* ---Child Counter--- */}
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

                {/* ---Infant Counter--- */}
                <div className="mb-6 flex items-center justify-between">
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

          {/* ---Rooms--- */}
          <div className="relative space-y-2 md:col-span-2 lg:col-span-1">
            <button
              type="button"
              onClick={() => setShowRoomsSelector(!showRoomsSelector)}
              className="flex h-20 w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left hover:bg-gray-50"
            >
              <Bed className="size-8 text-yellow-600" />
              <div className="flex-1">
                <Label className="text-xs text-gray-600">Room</Label>
                <div className="text-base font-semibold text-gray-900">
                  {rooms < 10 ? `0${rooms}` : rooms}
                </div>
                <div className="text-xs text-gray-500">Rooms</div>
              </div>
            </button>
            {showRoomsSelector && (
              <div className="absolute top-full right-0 z-50 mt-2 w-full min-w-[200px] rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl lg:left-0">
                <h3 className="mb-4 font-semibold text-gray-900">Rooms</h3>

                {/* ---Rooms Counter--- */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
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

                {/* ---Done Button--- */}
                <Button
                  type="button"
                  onClick={() => setShowRoomsSelector(false)}
                  className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                >
                  Done
                </Button>
              </div>
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
            Search Hotels
          </Button>
        </div>
      </div>
    </form>
  );
};

export default HotelSearchForm;
