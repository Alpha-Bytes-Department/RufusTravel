"use client";

import React, { useState, useMemo } from "react";
import { Star, MapPin, Wifi, Coffee, Dumbbell, Car } from "lucide-react";
import { HotelCardData } from "@/Types/Booking/HotelBooking.types";
import Hotels from "./Hotels";

// ===============================Interface==============================
interface HotelResultsProps {
  searchData?: any;
}

// ===============================Component==============================
const HotelResults = ({ searchData }: HotelResultsProps) => {

  return <Hotels  />;
};

export default HotelResults;
