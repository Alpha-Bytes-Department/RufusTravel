"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Car,
  Waves,
  Utensils,
  Wifi,
  Droplet,
  MapPin,
  Dumbbell,
  Snowflake,
  Home,
  Dice5,
  Wine,
  GoalIcon as GolfIcon,
  UtensilsCrossed,
  Trees,
  FilterIcon,
  SlidersHorizontal,
} from "lucide-react";
import InteractiveMap from "./InteractiveMap";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  tours: Array<{
    id: string;
    location: string;
    title: string;
    coordinates: [number, number];
    badge: {
      text: string;
      icon: "hotel" | "tour";
    };
  }>;
}

interface FilterState {
  priceRange: [number, number];
  propertyTypes: string[];
  experiences: string[];
  starRatings: number[];
  amenities: string[];
}

const FilterSidebar = ({ onFilterChange, tours }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [starRatings, setStarRatings] = useState<number[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [showMap, setShowMap] = useState(false);

  const propertyTypeOptions = [
    { id: "hotel", label: "Hotel" },
    { id: "bedBreakfast", label: "Bed & Breakfast" },
    { id: "aparthotel", label: "Aparthotel" },
  ];

  const experienceOptions = [
    { id: "luxury", label: "Luxury" },
    { id: "adultsOnly", label: "Adults only" },
    { id: "budget", label: "Budget" },
    { id: "romantic", label: "Romantic" },
  ];

  const starRatingOptions = [
    { stars: 5, price: 31 },
    { stars: 4, price: 19 },
    { stars: 3, price: 13 },
    { stars: 2, price: 10 },
    { stars: 1, price: 8 },
  ];

  const amenityOptions = [
    { id: "airportShuttle", label: "Airport shuttle included", icon: Car },
    { id: "spa", label: "Spa", icon: Waves },
    { id: "pool", label: "Pool", icon: Droplet },
    { id: "wifiIncluded", label: "Wi-fi included", icon: Wifi },
    { id: "hotTub", label: "Hot tub", icon: Droplet },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "airConditioned", label: "Air conditioned", icon: Snowflake },
    { id: "casino", label: "Casino", icon: Dice5 },
    { id: "bar", label: "Bar", icon: Wine },
    { id: "petFriendly", label: "Pet-friendly", icon: Home },
    { id: "outdoorSpace", label: "Outdoor space", icon: Trees },
    { id: "kitchen", label: "Kitchen", icon: UtensilsCrossed },
    { id: "golfCourse", label: "Golf course", icon: GolfIcon },
  ];

  const toggleFilter = (
    list: string[],
    setter: (val: string[]) => void,
    value: string
  ) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const toggleStarRating = (stars: number) => {
    if (starRatings.includes(stars)) {
      setStarRatings(starRatings.filter((s) => s !== stars));
    } else {
      setStarRatings([...starRatings, stars]);
    }
  };

  const handleReset = () => {
    setPriceRange([0, 10000]);
    setPropertyTypes([]);
    setExperiences([]);
    setStarRatings([]);
    setAmenities([]);
  };

  // Emit filter changes whenever any filter updates
  useEffect(() => {
    const filters: FilterState = {
      priceRange,
      propertyTypes,
      experiences,
      starRatings,
      amenities,
    };
    onFilterChange?.(filters);
  }, [priceRange, propertyTypes, experiences, starRatings, amenities]);

  return (
    <div className=" space-y-6 sticky top-4">
      {/*====================== Price Range============================ */}
      <div className="space-y-4 pb-6 rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between pb-4 ">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <SlidersHorizontal className="size-5" />
            Filter
          </h2>
        </div>
        <Label className="text-base font-semibold text-gray-900">
          Price Range
        </Label>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={10000}
          min={0}
          step={100}
          className="w-full"
        />
        <Button
          variant="outline"
          onClick={handleReset}
          className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400 cursor-pointer font-medium transition-all"
        >
          Reset Filters
        </Button>
      </div>

      {/*================= Map View ======================*/}
      <div className="space-y-4 pb-6 rounded-2xl shadow-md p-6">
        <Label className="text-base font-semibold text-gray-900">
          Location Map ({tours?.length || 0}{" "}
          {tours?.length === 1 ? "location" : "locations"})
        </Label>
        <div className="bg-gray-100 rounded-lg overflow-hidden h-80 relative">
          {showMap && tours?.length > 0 ? (
            <InteractiveMap tours={tours} />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer group"
              onClick={() => tours?.length > 0 && setShowMap(true)}
            >
              <div className="text-center space-y-3">
                <MapPin className="size-12 text-yellow-600 mx-auto group-hover:scale-110 transition-transform" />
                <p className="text-gray-600 font-medium">
                  {tours?.length > 0
                    ? "Click to view interactive map"
                    : "No locations available"}
                </p>
                {tours?.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {tours.length} destinations available
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowMap(!showMap)}
          disabled={!tours || tours.length === 0}
          className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400 cursor-pointer font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {showMap ? "Hide Map" : "View Interactive Map"}
        </Button>
      </div>

      {/* ========================Property Type==================== */}
      <div className="space-y-4 rounded-2xl shadow-md p-6">
        <Label className="text-base pb-3 font-semibold text-gray-900">
          Property Type
        </Label>
        <div className="space-y-4 pt-4">
          {propertyTypeOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={propertyTypes.includes(option.id)}
                onChange={() =>
                  toggleFilter(propertyTypes, setPropertyTypes, option.id)
                }
                className="size-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/*============= Traveller Experience =====================*/}
      <div className="space-y-4 pb-6 rounded-2xl shadow-md p-6">
        <Label className="text-base  font-semibold text-gray-900">
          Traveller experience
        </Label>
        <div className="space-y-4 pt-4">
          {experienceOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={experiences.includes(option.id)}
                onChange={() =>
                  toggleFilter(experiences, setExperiences, option.id)
                }
                className="size-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div className="space-y-4 pb-6 rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold text-gray-900">
            Star rating
          </Label>
          <span className="text-sm text-gray-500">From</span>
        </div>
        <div className="space-y-4 ">
          {starRatingOptions.map((option) => (
            <label
              key={option.stars}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={starRatings.includes(option.stars)}
                  onChange={() => toggleStarRating(option.stars)}
                  className="size-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700">
                  {option.stars} stars
                </span>
              </div>
              <span className="text-sm text-gray-600">${option.price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4 pb-6 ">
        <Label className="text-base font-semibold text-gray-900">
          Amenities
        </Label>
        <div className="grid grid-cols-2 pt-4 gap-2">
          {amenityOptions.map((amenity) => {
            const Icon = amenity.icon;
            const isSelected = amenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                onClick={() =>
                  toggleFilter(amenities, setAmenities, amenity.id)
                }
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "bg-yellow-50 border-yellow-400"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <Icon
                  className={`size-6 ${
                    isSelected ? "text-yellow-600" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-xs text-center leading-tight ${
                    isSelected ? "text-yellow-900 font-medium" : "text-gray-700"
                  }`}
                >
                  {amenity.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
