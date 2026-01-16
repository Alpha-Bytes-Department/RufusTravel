"use client";

import React, { useState } from "react";
import BookingSearchForm from "./BookingSearchForm";
import FlightResults from "./FlightResults";
import HotelResults from "./HotelResults";
import CarResults from "./CarResults";
import { useNavigationState } from "@/Hooks/useNavigationState";
import {
  FlightSearchState,
  CarSearchState,
  TourSearchState,
  HotelSearchState,
} from "@/Types/Navigation/Navigation.types";

// ===============================Types==============================
type TabType = "flight" | "hotels" | "cars" | "tours";

// ===============================Component==============================
const Bookings = () => {
  const { getState } = useNavigationState();

  const searchState = getState<
    FlightSearchState | CarSearchState | HotelSearchState | TourSearchState
  >();

  console.log("Search State:", searchState);

  // ===============================State==============================
  const [activeTab, setActiveTab] = useState<TabType>("flight");

  // ===============================Event Handlers==============================
  const handleSearch = (data: any) => {
    console.log("Search submitted:", data);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // ===============================Render==============================
  return (
    <div className=" mx-auto py-8">
      {/* ===============================Search Form============================== */}
      <BookingSearchForm
        onSearch={handleSearch}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* ===============================Results Display============================== */}
      {activeTab === "flight" && <FlightResults searchData={searchState} />}
      {activeTab === "hotels" && <HotelResults searchData={searchState} />}
      {activeTab === "cars" && <CarResults searchData={searchState} />}
    </div>
  );
};

export default Bookings;
