"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string, type: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");

  const types = [
    "All Types",
    "Hotel",
    "Tour",
    "Flight",
    "Car",
    "Cruise",
    "Restaurant",
  ];

  const handleSearch = () => {
    onSearch?.(searchQuery, selectedType);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search destinations, hotels, tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
          />
        </div>

        {/* Type Dropdown */}
        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-12 px-4 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 cursor-pointer appearance-none min-w-[150px]"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="h-12 px-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
