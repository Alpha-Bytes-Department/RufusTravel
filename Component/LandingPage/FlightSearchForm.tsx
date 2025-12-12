"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar, MapPin, Search, Send, Users, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import DateTimePicker from "./DateTimePicker";
import DateTimePicker from "./DateTimePicker";
// import TravelerSelector from "./TravelerSelector";
import TravelerSelector from "./TravelerSelector";


// TODO: adjust the date and time format

interface FlightSegment {
  from: string;
  to: string;
  date: string;
}

interface FlightFormData {
  tripType: "oneWay" | "roundTrip" | "multiWay";
  from: string;
  to: string;
  journeyDate: string;
  returnDate?: string;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  class: string;
}

const FlightSearchForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FlightFormData>({
    defaultValues: {
      tripType: "oneWay",
      from: "Abuja",
      to: "London heathrow",
      journeyDate: "Nov 28, 2025",
      returnDate: "Dec 06, 2025",
      travelers: { adults: 1, children: 0, infants: 0 },
      class: "Preferred Class",
    },
  });

  const [showJourneyPicker, setShowJourneyPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showTravelers, setShowTravelers] = useState(false);
  const [multiWaySegments, setMultiWaySegments] = useState<FlightSegment[]>([
    { from: "Abuja", to: "London", date: "Nov 28, 2025" },
    { from: "London", to: "Paris", date: "Dec 05, 2025" },
  ]);
  const [activeSegmentDatePicker, setActiveSegmentDatePicker] = useState<
    number | null
  >(null);

  const tripType = watch("tripType");
  const journeyDate = watch("journeyDate");
  const returnDate = watch("returnDate");

  const addMultiWaySegment = () => {
    setMultiWaySegments([
      ...multiWaySegments,
      { from: "", to: "", date: "Select Date" },
    ]);
  };

  const removeMultiWaySegment = (index: number) => {
    if (multiWaySegments.length > 2) {
      setMultiWaySegments(multiWaySegments.filter((_, i) => i !== index));
    }
  };

  const updateMultiWaySegment = (
    index: number,
    field: keyof FlightSegment,
    value: string
  ) => {
    const updated = [...multiWaySegments];
    updated[index][field] = value;
    setMultiWaySegments(updated);
  };

  // ===============================Form Submit Handler==============================
  const onSubmit = (data: FlightFormData) => {
    const submissionData =
      tripType === "multiWay" ? { ...data, segments: multiWaySegments } : data;

    console.log("Flight Search Data:", {
      ...submissionData,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6  bg-transparent"
    >
      {/* ===============================Trip Type Radio Buttons============================== */}
      <RadioGroup
        value={tripType}
        onValueChange={(value) => setValue("tripType", value as any)}
        className="flex flex-wrap gap-4 bg-[#adb2bd49] text-lg max-w-sm mx-auto justify-center text-white p-4 rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oneWay" id="oneWay" />
          <Label htmlFor="oneWay" className="cursor-pointer font-normal">
            One Way
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="roundTrip" id="roundTrip" />
          <Label htmlFor="roundTrip" className="cursor-pointer font-normal">
            Round Way
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multiWay" id="multiWay" />
          <Label htmlFor="multiWay" className="cursor-pointer font-normal">
            Multi Way
          </Label>
        </div>
      </RadioGroup>

      {/* ===============================Search Fields Grid============================== */}
      <div className="rounded-xl  lg:p-5 lg:bg-[#adb2bd49]">
        {tripType === "multiWay" ? (
          <div className="space-y-4">
            {multiWaySegments.map((segment, index) => (
              <div key={index} className="space-y-3">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* From Field */}
                  <div className="max-h-20 flex gap-3 items-center px-3 rounded-xl bg-white">
                    <Send className="size-8 text-yellow-600" />
                    <div className="flex flex-col">
                      <Label className="text-xs pl-2 text-yellow-900">
                        Flight From
                      </Label>
                      <input
                        value={segment.from}
                        onChange={(e) =>
                          updateMultiWaySegment(index, "from", e.target.value)
                        }
                        className="pl-2 py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  {/* To Field */}
                  <div className="max-h-20 flex gap-3 items-center px-3 rounded-xl bg-white">
                    <MapPin className="size-8 text-yellow-600" />
                    <div className="flex flex-col">
                      <Label className="text-xs pl-2 text-yellow-900">
                        Flying To
                      </Label>
                      <input
                        value={segment.to}
                        onChange={(e) =>
                          updateMultiWaySegment(index, "to", e.target.value)
                        }
                        className="pl-2 py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  {/* Date Field */}
                  <div className="relative space-y-2 bg-white rounded-xl flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveSegmentDatePicker(index)}
                      className="flex w-full items-center gap-2 rounded-md bg-white px-3 py-2 text-left hover:border-gray-400"
                    >
                      <Calendar className="size-8 text-yellow-600" />
                      <div className="flex-1">
                        <Label className="text-xs text-yellow-900">
                          Journey Date
                        </Label>
                        <div className="font-medium text-base">
                          {segment.date}
                        </div>
                        <div className="text-xs text-gray-400">Friday</div>
                      </div>
                    </button>
                    {activeSegmentDatePicker === index && (
                      <DateTimePicker
                        onClose={() => setActiveSegmentDatePicker(null)}
                        onSelect={(date: string) => {
                          updateMultiWaySegment(index, "date", date);
                          setActiveSegmentDatePicker(null);
                        }}
                      />
                    )}
                    {multiWaySegments.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeMultiWaySegment(index)}
                        className="absolute -top-2 -right-2 size-6 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add More Segment Button */}
            <div className="flex justify-center py-2">
              <button
                type="button"
                onClick={addMultiWaySegment}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-gray-900 font-medium hover:bg-yellow-600"
              >
                <Plus className="size-5" />
                Add Flight
              </button>
            </div>

            {/* Travelers Field (full width below segments) */}
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
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-4 ${
              tripType === "roundTrip"
                ? "md:grid-cols-2 lg:grid-cols-2"
                : "md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {/* First Row for Round Trip - From and To centered */}
            {tripType === "roundTrip" && (
              <>
                <div className="max-h-20 flex py-2 gap-3 items-center px-3 rounded-xl bg-white">
                  <Send className="size-8 text-yellow-600" />
                  <div className="flex flex-col">
                    <Label className="text-xs pl-2 text-yellow-900">
                      Flight From
                    </Label>
                    <input
                      {...register("from")}
                      className="pl-2 py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                      placeholder="Abuja"
                    />
                  </div>
                </div>
                <div className="max-h-20 py-2 flex gap-3 items-center px-3 rounded-xl bg-white">
                  <MapPin className="size-8 text-yellow-600" />
                  <div className="flex flex-col">
                    <Label className="text-xs pl-2 text-yellow-900">
                      Flying To
                    </Label>
                    <input
                      {...register("to")}
                      className="pl-2 py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                      placeholder="London heathrow"
                    />
                  </div>
                </div>
              </>
            )}

            {/* One Way Layout */}
            {tripType === "oneWay" && (
              <>
                <div className="max-h-20 flex gap-3 items-center px-3 rounded-xl bg-white">
                  <Send className="size-8 text-yellow-600" />
                  <div className="flex flex-col">
                    <Label className="text-xs pl-2 text-yellow-900">
                      Flight From
                    </Label>
                    <input
                      {...register("from")}
                      className="pl-2 py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                      placeholder="Abuja"
                    />
                  </div>
                </div>
                <div className="max-h-20 flex gap-3 items-center px-3 rounded-xl bg-white">
                  <MapPin className="size-8 text-yellow-600" />
                  <div className="flex flex-col">
                    <Label className="text-xs pl-2 text-yellow-900">
                      Flying To
                    </Label>
                    <input
                      {...register("to")}
                      className="pl-2 py-1 max-w-44 border-none mt-2 text-yellow-600 font-bold text-lg focus:outline-0"
                      placeholder="London heathrow"
                    />
                  </div>
                </div>
                <div className="relative space-y-2 bg-white rounded-xl">
                  <button
                    type="button"
                    onClick={() => setShowJourneyPicker(!showJourneyPicker)}
                    className="flex w-full items-center gap-2 rounded-md bg-white px-3 py-2 text-left hover:border-gray-400"
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
                      <div className="text-xs text-gray-400">
                        Preferred Class
                      </div>
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
              </>
            )}
          </div>
        )}

        {/* Second Row for Round Trip - Journey Date, Return Date, Travelers (3 columns centered) */}
        {tripType === "roundTrip" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
            <div className="relative space-y-2 bg-white rounded-xl">
              <button
                type="button"
                onClick={() => setShowJourneyPicker(!showJourneyPicker)}
                className="flex w-full items-center gap-2 rounded-md bg-white px-3 py-2 text-left hover:border-gray-400"
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
            <div className="relative space-y-2 bg-white rounded-xl">
              <button
                type="button"
                onClick={() => setShowReturnPicker(!showReturnPicker)}
                className="flex w-full items-center gap-2 rounded-md bg-white px-3 py-2 text-left hover:border-gray-400"
              >
                <Calendar className="size-8 text-yellow-600" />
                <div className="flex-1">
                  <Label className="text-xs text-yellow-900">Return Date</Label>
                  <div className="font-medium text-base">{returnDate}</div>
                  <div className="text-xs text-gray-400">Thursday</div>
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
          </div>
        )}

        {/* ===============================Search Button============================== */}
        <div className="pt-5 mx-auto flex justify-center">
          <Button
            type="submit"
            className="h-12 w-full rounded-lg bg-yellow-500 font-semibold text-gray-900 hover:bg-yellow-600 md:w-auto md:px-12"
          >
            <Search className="mr-2 size-5" />
            Search Flights
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FlightSearchForm;
