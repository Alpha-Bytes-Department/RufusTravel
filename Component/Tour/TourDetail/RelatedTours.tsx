"use client";

import { useRouter } from "next/navigation";
import TourCard from "../TourCard";
import type { Tour } from "@/Types/Tour/Tour.types";

// ===============================Props Interface==============================
interface RelatedToursProps {
  tours: Tour[];
}

// ===============================Component==============================
const RelatedTours = ({ tours }: RelatedToursProps) => {
    const router = useRouter();
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} onClick={()=>router.push(`/tour/${tour.id}`)}/>
        ))}
      </div>
    </div>
  );
};

export default RelatedTours;
