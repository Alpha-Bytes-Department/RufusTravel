"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CarCheckout from "@/Component/Bookings/CarCheckout";
import { CarCardData } from "@/Types/Booking/CarBooking.types";

// ===============================Page Component==============================
const CarCheckoutPage = () => {
  const router = useRouter();
  const [carData, setCarData] = useState<CarCardData | null>(null);
  const [searchData, setSearchData] = useState<any>(null);

  // ===============================Effects==============================
  useEffect(() => {
    // Load data from sessionStorage
    const carDataStr = sessionStorage.getItem("selectedCar");
    const searchDataStr = sessionStorage.getItem("carSearchData");

    if (carDataStr && searchDataStr) {
      setCarData(JSON.parse(carDataStr));
      setSearchData(JSON.parse(searchDataStr));
    } else {
      // Redirect if no data
      router.push("/bookings");
    }
  }, [router]);

  // ===============================Render==============================
  if (!carData || !searchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <CarCheckout
      car={carData}
      pickupLocation={searchData.pickupLocation}
      dropoffLocation={searchData.dropoffLocation}
      pickupDate={searchData.pickupDate}
      pickupTime={searchData.pickupTime}
      dropoffDate={searchData.dropoffDate}
      dropoffTime={searchData.dropoffTime}
    />
  );
};

export default CarCheckoutPage;
