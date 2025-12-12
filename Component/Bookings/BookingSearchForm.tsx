"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plane,
  Hotel,
  Car,
  MapPin,
  Send,
  Calendar,
  Users,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import HotelBookingForm from "./HotelBookingForm";
import CarBookingForm from "./CarBookingForm";
import TourBookingForm from "./TourBookingForm";
import DateTimePicker from "../LandingPage/DateTimePicker";
import TravelerSelector from "../LandingPage/TravelerSelector";

type TabType = "flight" | "hotels" | "cars" | "tours";
type TripType = "oneWay" | "roundWay" | "multiWay";

interface BookingSearchFormData {
  flyingFrom: string;
  flyingFromAirport: string;
  flyingTo: string;
  flyingToAirport: string;
  journeyDate: string;
  returnDate?: string;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  class: string;
}

interface BookingSearchFormProps {
  onSearch: (data: BookingSearchFormData & { tripType: TripType }) => void;
}

const BookingSearchForm = ({ onSearch }: BookingSearchFormProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("flight");
  const [tripType, setTripType] = useState<TripType>("roundWay");
  const [showJourneyPicker, setShowJourneyPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showTravelers, setShowTravelers] = useState(false);
  const { register, handleSubmit, watch, setValue } =
    useForm<BookingSearchFormData>({
      defaultValues: {
        flyingFrom: " Add city or airport",
        flyingFromAirport: " ",
        flyingTo: "Add destination ",
        flyingToAirport: " ",
        journeyDate: "mm/dd/yyyy",
        returnDate: "mm/dd/yyyy",
        travelers: { adults: 1, children: 0, infants: 0 },
        class: "Economy",
      },
    });
  const [activeSegmentDatePicker, setActiveSegmentDatePicker] = useState<
    number | null
  >(null);
  const onSubmit = (data: BookingSearchFormData) => {
    onSearch({ ...data, tripType });
  };

  const handleHotelSearch = (data: any) => {
    console.log("Hotel Search:", data);
  };

  const handleCarSearch = (data: any) => {
    console.log("Car Search:", data);
  };

  const handleTourSearch = (data: any) => {
    console.log("Tour Search:", data);
  };

  const tabs = [
    { id: "flight" as TabType, label: "Flight", icon: Plane },
    { id: "hotels" as TabType, label: "Hotels", icon: Hotel },
    { id: "cars" as TabType, label: "Cars", icon: Car },
    { id: "tours" as TabType, label: "Tours", icon: MapPin },
  ];

  const journeyDate = watch("journeyDate");
  const returnDate = watch("returnDate");

  return (
    <div className="w-full  lg:p-6 mb-6">
      {/* ===============================Tabs============================== */}
      <div className="mb-6 flex  py-2 w-fit mx-auto px-2 rounded-full flex-wrap justify-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-medium transition-all ${
                isActive
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              <Icon className="size-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ===============================Flight Form============================== */}
      {activeTab === "flight" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ===============================Trip Type============================== */}
          <div className="flex w-fit mx-auto items-center lg:border-gray-500 lg:border justify-center gap-6 mb-6 p-4 lg:p-1 rounded-full flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={tripType === "oneWay"}
                onChange={() => setTripType("oneWay")}
                className="size-5 accent-gray-900"
              />
              <span className="font-medium text-gray-700">One Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={tripType === "roundWay"}
                onChange={() => setTripType("roundWay")}
                className="size-5 accent-gray-900"
              />
              <span className="font-medium text-gray-700">Round Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={tripType === "multiWay"}
                onChange={() => setTripType("multiWay")}
                className="size-5 accent-gray-900"
              />
              <span className="font-medium text-gray-700">Multi Way</span>
            </label>
          </div>

          {/* ===============================Search Fields============================== */}
          <div
            className={`grid items-center grid-cols-1 md:grid-cols-2 gap-4 mb-6 ${
              tripType === "roundWay" ? "lg:grid-cols-6" : "lg:grid-cols-5"
            }`}
          >
            {/* ---Flying From--- */}
            <div className="max-h-20 flex gap-3 items-center p-3  rounded-xl border border-gray-300 bg-white">
              <Send className="size-8 text-yellow-600" />
              <div className="flex flex-col">
                <Label className="text-xs pl-1.5 text-yellow-900">
                  Flight From
                </Label>
                <input
                  {...register("flyingFrom")}
                  className=" py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                  placeholder="City"
                />
              </div>
            </div>

            {/* ---Flying To--- */}
            <div className="max-h-20 flex gap-3 items-center p-3 rounded-xl border border-gray-300 bg-white">
              <MapPin className="size-8 text-yellow-600" />
              <div className="flex flex-col">
                <Label className="text-xs text-yellow-900">Flight To</Label>
                <input
                  {...register("flyingTo")}
                  className="pl- py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                  placeholder="City"
                />
              </div>
            </div>

            {/* ---Journey Date--- */}
            <div
              className={`border border-gray-300 rounded-xl transition-all duration-300 ease-in-out ${
                tripType === "roundWay" ? "md:col-span-2" : "col-span-1"
              } grid ${
                tripType === "roundWay" ? "md:grid-cols-2" : "grid-cols-1"
              } gap-4`}
            >
              <div className="relative space-y-2">
                <button
                  type="button"
                  onClick={() => setShowJourneyPicker(!showJourneyPicker)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:border-gray-400"
                >
                  <Calendar className="size-8 text-yellow-600" />
                  <div className="flex-1">
                    <Label className="text-xs text-yellow-900">
                      Journey Date
                    </Label>
                    <div className="font-medium text-base">{journeyDate}</div>
                    <div className="text-xs text-gray-400">Friday</div>
                  </div>
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

              {/* ---Return Date--- */}
              {tripType === "roundWay" && (
                <div className="relative space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowReturnPicker(!showReturnPicker)}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:border-gray-400"
                  >
                    <Calendar className="size-8 text-yellow-600" />
                    <div className="flex-1">
                      <Label className="text-xs text-yellow-900">
                        Return Date
                      </Label>
                      <div className="font-medium text-base">{returnDate}</div>
                      <div className="text-xs text-gray-400">Friday</div>
                    </div>
                  </button>
                  {showReturnPicker && (
                    <DateTimePicker
                      onClose={() => setShowReturnPicker(false)}
                      onSelect={(date: string) => {
                        setValue("returnDate", date);
                        setShowReturnPicker(false);
                      }}
                    />
                  )}
                </div>
              )}
            </div>

            {/* ---Travelers & Class--- */}
            <div className="relative space-y-2">
              <button
                type="button"
                onClick={() => setShowTravelers(!showTravelers)}
                className="flex w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-left hover:border-gray-400"
              >
                <Users className="size-8 text-yellow-600" />
                <div className="flex-1">
                  <Label className="text-xs text-yellow-900">
                    Travelers, Class
                  </Label>
                  <div className="font-medium text-base">
                    {watch("travelers").adults +
                      watch("travelers").children +
                      watch("travelers").infants}{" "}
                    Traveller(s)
                  </div>
                  <div className="text-xs text-gray-400">Preferred Class</div>
                </div>
              </button>
              {showTravelers && (
                <TravelerSelector
                  onClose={() => setShowTravelers(false)}
                  onUpdate={(data: {
                    adults: number;
                    children: number;
                    infants: number;
                    class: string;
                  }) => {
                    setValue("travelers", {
                      adults: data.adults,
                      children: data.children,
                      infants: data.infants,
                    });
                    setValue("class", data.class);
                  }}
                />
              )}
            </div>
            {/* ===============================Search Button============================== */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-yellow-500 py-6 lg:py-10 hover:bg-yellow-600 text-gray-900 font-bold px-12  text-lg rounded-xl"
              >
                <Search className="mr-2 size-5" />
                Modify Search
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* ===============================Hotel Form============================== */}
      {activeTab === "hotels" && (
        <HotelBookingForm onSearch={handleHotelSearch} />
      )}

      {/* ===============================Car Form============================== */}
      {activeTab === "cars" && <CarBookingForm onSearch={handleCarSearch} />}

      {/* ===============================Tour Form============================== */}
      {activeTab === "tours" && <TourBookingForm onSearch={handleTourSearch} />}
    </div>
  );
};

export default BookingSearchForm;
