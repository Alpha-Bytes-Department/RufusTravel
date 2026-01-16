"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, Users, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DateTimePicker from "../LandingPage/DateTimePicker";

interface HotelFormData {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  roomType: string;
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
      guests: 1,
      rooms: 2,
      roomType: "Economy",
    },
  });

  const [showGuestsSelector, setShowGuestsSelector] = useState(false);
  const [showRoomsSelector, setShowRoomsSelector] = useState(false);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const guests = watch("guests");
  const rooms = watch("rooms");
  const roomType = watch("roomType");
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const onSubmit = (data: HotelFormData) => {
    onSearch(data);
  };

  // Get day name like "Friday"
  const getDayName = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* ===============================Horizontal Booking Form============================== */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 w-full">
        {/* Check in Date */}
        <div className="relative flex-1 min-w-[200px]">
          <button
            type="button"
            onClick={() => {
              setShowCheckInPicker(!showCheckInPicker);
              setShowCheckOutPicker(false);
              setShowGuestsSelector(false);
              setShowRoomsSelector(false);
            }}
            className="flex items-center gap-4 rounded-2xl bg-white border-2 border-gray-300 px-6 py-2 h-full w-full hover:border-yellow-500 transition-colors"
          >
            <Calendar className="size-8 text-[#D4A60A] shrink-0" />
            <div className="flex flex-col flex-1 text-left">
              <Label className="text-xs text-gray-600 mb-1">Check in</Label>
              {checkIn ? (
                <>
                  <div className="text-lg font-bold text-[#D4A60A]">
                    {checkIn}
                  </div>
                  <div className="text-xs text-gray-600">
                    {getDayName(checkIn)}
                  </div>
                </>
              ) : (
                <div className="text-base font-semibold text-gray-400">
                  Select date
                </div>
              )}
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

        {/* Check out Date */}
        <div className="relative flex-1 min-w-[200px]">
          <button
            type="button"
            onClick={() => {
              setShowCheckOutPicker(!showCheckOutPicker);
              setShowCheckInPicker(false);
              setShowGuestsSelector(false);
              setShowRoomsSelector(false);
            }}
            className="flex items-center gap-4 rounded-2xl bg-white border-2 border-gray-300 px-6 py-2 h-full w-full hover:border-yellow-500 transition-colors"
          >
            <Calendar className="size-8 text-[#D4A60A] shrink-0" />
            <div className="flex flex-col flex-1 text-left">
              <Label className="text-xs text-gray-600 mb-1">Check out</Label>
              {checkOut ? (
                <>
                  <div className="text-lg font-bold text-[#D4A60A]">
                    {checkOut}
                  </div>
                  <div className="text-xs text-gray-600">
                    {getDayName(checkOut)}
                  </div>
                </>
              ) : (
                <div className="text-base font-semibold text-gray-400">
                  Select date
                </div>
              )}
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

        {/* Guests */}
        <div className="relative flex-1 min-w-[180px]">
          <button
            type="button"
            onClick={() => {
              setShowGuestsSelector(!showGuestsSelector);
              setShowRoomsSelector(false);
              setShowCheckInPicker(false);
              setShowCheckOutPicker(false);
            }}
            className="flex items-center gap-4 rounded-2xl bg-white border-2 border-gray-300 px-6 py-2 h-full w-full hover:border-yellow-500 transition-colors"
          >
            <Users className="size-8 text-[#D4A60A] shrink-0" />
            <div className="flex flex-col flex-1 text-left">
              <Label className="text-xs text-gray-600 mb-1">Guests</Label>
              <div className="text-lg font-bold text-[#D4A60A]">
                {guests < 10 ? `0${guests}` : guests}
              </div>
              <div className="text-xs text-gray-600">
                {guests === 1 ? "Person" : "Persons"}
              </div>
            </div>
          </button>

          {showGuestsSelector && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-60 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <Label className="font-semibold text-gray-900">Guests</Label>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setValue("guests", Math.max(1, guests - 1))}
                  className="flex size-10 items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-bold text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-2xl text-gray-900">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setValue("guests", guests + 1)}
                  className="flex size-10 items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-bold text-lg"
                >
                  +
                </button>
              </div>
              <Button
                type="button"
                onClick={() => setShowGuestsSelector(false)}
                className="w-full mt-4 bg-yellow-500 text-gray-900 hover:bg-yellow-600 font-bold"
              >
                Done
              </Button>
            </div>
          )}
        </div>

        {/* Rooms */}
        <div className="relative flex-1 min-w-[180px]">
          <button
            type="button"
            onClick={() => {
              setShowRoomsSelector(!showRoomsSelector);
              setShowGuestsSelector(false);
              setShowCheckInPicker(false);
              setShowCheckOutPicker(false);
            }}
            className="flex items-center gap-4 rounded-2xl bg-white border-2 border-gray-300 px-6 py-2 h-full w-full hover:border-yellow-500 transition-colors"
          >
            <Bed className="size-8 text-[#D4A60A] shrink-0" />
            <div className="flex flex-col flex-1 text-left">
              <Label className="text-xs text-gray-600 mb-1">Room</Label>
              <div className="text-lg font-bold text-[#D4A60A]">
                {rooms < 10 ? `0${rooms}` : rooms}
              </div>
              <div className="text-xs text-gray-600">{roomType}</div>
            </div>
          </button>

          {showRoomsSelector && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full min-w-60 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-2xl">
              <div className="mb-4">
                <Label className="font-semibold text-gray-900 mb-3 block">
                  Rooms
                </Label>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setValue("rooms", Math.max(1, rooms - 1))}
                    className="flex size-10 items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-bold text-lg"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-bold text-2xl text-gray-900">
                    {rooms}
                  </span>
                  <button
                    type="button"
                    onClick={() => setValue("rooms", rooms + 1)}
                    className="flex size-10 items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <Label className="font-semibold text-gray-900 mb-3 block">
                  Room Type
                </Label>
                <select
                  value={roomType}
                  onChange={(e) => setValue("roomType", e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                >
                  <option value="Economy">Economy</option>
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>

              <Button
                type="button"
                onClick={() => setShowRoomsSelector(false)}
                className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600 font-bold"
              >
                Done
              </Button>
            </div>
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

export default HotelBookingForm;
