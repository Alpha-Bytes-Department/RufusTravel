"use client";

import React, { useState } from "react";
import BannerImage from "@/public/bannerBackground.webp";
import { Plane, Hotel, Car, MapPin } from "lucide-react";
import FlightSearchForm from "./FlightSearchForm";
import HotelSearchForm from "./HotelSearchForm";
import CarSearchForm from "./CarSearchForm";
import TourSearchForm from "./TourSearchForm";

const HeroSection = () => {
  // ===============================Active Tab State==============================
  const [activeTab, setActiveTab] = useState<
    "flight" | "hotel" | "car" | "tour"
  >("flight");

  // ===============================Tab Options==============================
  const tabs = [
    { id: "flight" as const, label: "Flight", icon: Plane },
    { id: "hotel" as const, label: "Hotels", icon: Hotel },
    { id: "car" as const, label: "Cars", icon: Car },
    { id: "tour" as const, label: "Tours", icon: MapPin },
  ];

  return (
    <section
      className="relative min-h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${BannerImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* ===============================Hero Content============================== */}
      <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        {/* ===============================Hero Text============================== */}
        <div className="mb-8 text-center text-white md:mb-12">
          <h1 className="mb-4 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            The World In Your Palms
          </h1>
          <p className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl">
            Explore the world's most beautiful destinations with exclusive deals
            and personalized experiences
          </p>
        </div>

        {/* ===============================Search Form Container============================== */}
        <div className="w-full max-w-6xl  ">
          {/* ===============================Tab Buttons============================== */}
          <div className="mb-6 flex lg:bg-[#e0cfcf49] py-2 w-fit mx-auto px-2 rounded-full flex-wrap justify-center gap-2 sm:gap-3">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all sm:px-8 ${
                    activeTab === tab.id
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-[#e0cfcf3d] bg-opacity-20 text-white backdrop-blur-sm hover:bg-opacity-30"
                  }`}
                >
                  <IconComponent className="size-4 sm:size-5" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ===============================Search Forms============================== */}
          <div className="rounded-2xl p-4 shadow-2xl sm:p-6 md:p-8">
            {activeTab === "flight" && <FlightSearchForm />}
            {activeTab === "hotel" && <HotelSearchForm />}
            {activeTab === "car" && <CarSearchForm />}
            {activeTab === "tour" && <TourSearchForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
