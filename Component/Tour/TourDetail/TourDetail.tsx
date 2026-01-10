"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IoHeartOutline,
  IoShareSocialOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import TourImageSlider from "./TourImageSlider";
import TourInfoCards from "./TourInfoCards";
import TourBookingCard from "./TourBookingCard";
import TourTabs from "./TourTabs";
import TourOverview from "./TourOverview";
import TourWhatsIncluded from "./TourWhatsIncluded";
import TourItinerary from "./TourItinerary";
import TourReviews from "./TourReviews";
import RelatedTours from "./RelatedTours";
import type {
  TourDetail as TourDetailType,
  TourTab,
} from "@/Types/Tour/TourDetail.types";
import type { Tour } from "@/Types/Tour/Tour.types";
import {
  SAMPLE_TOUR_DETAIL,
  SAMPLE_RELATED_TOURS,
  SAMPLE_INCLUDED_ITEMS,
  SAMPLE_ITINERARY,
  SAMPLE_REVIEWS,
} from "@/public/SampleTourDetail";

// ===============================Props Interface==============================
interface TourDetailProps {
  tour?: TourDetailType; // Optional for now, will come from backend via URL params
  relatedTours?: Tour[]; // Optional for now, will come from backend
}

// ===============================Component==============================
const TourDetail = ({ tour, relatedTours }: TourDetailProps) => {
  // ===============================Dummy Data (will be replaced by props from backend)==============================
  const tourData = tour || SAMPLE_TOUR_DETAIL;
  const relatedToursData = relatedTours || SAMPLE_RELATED_TOURS;
  const router = useRouter();

  // ===============================State Management==============================
  const [activeTab, setActiveTab] = useState<TourTab>("Overview");
  const [isFavorite, setIsFavorite] = useState(false);

  // ===============================Event Handlers==============================
  const handleBookNow = (data: {
    journeyDate: Date;
    numberOfGuests: number;
  }) => {
    // Navigate to booking page with tour data
    const bookingData = {
      tourId: tourData.id,
      tourTitle: tourData.title,
      tourImage: tourData.images[0],
      price: tourData.price,
      currency: tourData.currency,
      journeyDate: data.journeyDate.toISOString(),
      numberOfGuests: data.numberOfGuests,
    };

    // Store in sessionStorage to pass to booking page
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    router.push(`/tour/booking/${tourData.id}`);
  };

  const handleContactProvider = () => {
    console.log("Contact provider for tour:", tourData.id);
    // TODO: Implement contact provider logic
  };

  const handleShare = () => {
    console.log("Share tour:", tourData.id);
    // TODO: Implement share logic
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite logic
  };

  // ===============================Format Data==============================
  const formatDuration = () => {
    const { days, nights, hours } = tourData.duration;
    if (hours) {
      return `${days} Day (${hours} hours)`;
    }
    return `${days} Day${days > 1 ? "s" : ""}${
      nights > 0 ? `, ${nights} Night${nights > 1 ? "s" : ""}` : ""
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[95vw] lg:max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-4 py-8">
        {/* ============================= Image Slider ============================= */}
        <div className="relative">
          <TourImageSlider images={tourData.images} title={tourData.title} />

          {/* Category Badge */}
          <div className="absolute top-6 left-6 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-medium">
            {tourData.category}
          </div>
        </div>

        {/* ============================= Main Content ============================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Tour Information */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {tourData.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <IoLocationOutline className="text-lg" />
                    <span className="text-sm">{tourData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="font-medium text-gray-900">
                      {tourData.rating}
                    </span>
                    <span className="text-sm">
                      ({tourData.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleToggleFavorite}
                  className="p-3 border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors"
                  aria-label="Add to favorites"
                >
                  <IoHeartOutline
                    className={`text-xl ${
                      isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors"
                  aria-label="Share tour"
                >
                  <IoShareSocialOutline className="text-xl text-gray-600" />
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <TourInfoCards
              duration={formatDuration()}
              maxGroup={`${tourData.maxGroup} People`}
              languages={tourData.languages.join(", ")}
              nextDate={tourData.nextDate}
            />

            {/* Tabs */}
            <TourTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {activeTab === "Overview" && (
              <TourOverview
                description={tourData.description}
                highlights={tourData.highlights}
                requirements={tourData.requirements}
              />
            )}
            {activeTab === "Itinerary" && (
              <TourItinerary items={SAMPLE_ITINERARY} />
            )}
            {activeTab === "What's included" && (
              <TourWhatsIncluded items={SAMPLE_INCLUDED_ITEMS} />
            )}
            {activeTab === "Reviews" && (
              <TourReviews
                reviews={SAMPLE_REVIEWS}
                averageRating={tourData.rating}
                totalReviews={tourData.reviewCount}
              />
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <TourBookingCard
              tourId={tourData.id}
              tourTitle={tourData.title}
              tourImage={tourData.images[0]}
              price={tourData.price}
              currency={tourData.currency}
              groupDiscount={tourData.groupDiscount}
              onBookNow={handleBookNow}
              onContactProvider={handleContactProvider}
            />
          </div>
        </div>

        {/* ============================= Related Tours ============================= */}
        <RelatedTours tours={relatedToursData} />
      </div>
    </div>
  );
};

export default TourDetail;
