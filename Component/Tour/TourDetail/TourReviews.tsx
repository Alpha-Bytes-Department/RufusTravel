"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import type { TourReview } from "@/Types/Tour/TourDetail.types";

// ===============================Props Interface==============================
interface TourReviewsProps {
  reviews: TourReview[];
  averageRating: number;
  totalReviews: number;
}

// ===============================Component==============================
const TourReviews = ({
  reviews,
  averageRating,
  totalReviews,
}: TourReviewsProps) => {
  // ===============================State Management==============================
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // ===============================Pagination Logic==============================
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  // ===============================Render Stars==============================
  const renderStars = (rating: number, size: string = "text-xl") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${size} ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  // ===============================Pagination Handlers==============================
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-3">
          {renderStars(Math.round(averageRating), "text-3xl")}
          <span className="text-2xl font-semibold text-gray-900">
            {averageRating} out of 5
          </span>
          <span className="text-gray-600">({totalReviews} reviews)</span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {currentReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            {/* Review Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {review.customerName}
                </h3>
                <p className="text-sm text-gray-600">{review.date}</p>
              </div>
              {renderStars(review.rating)}
            </div>

            {/* Review Comment */}
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-yellow-400 text-black font-semibold"
                  : "border border-gray-300 hover:border-yellow-400"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TourReviews;
