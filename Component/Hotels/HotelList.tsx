import { Hotel } from "@/Types/Hotel/hotel";
import HotelCard from "./HotelCard";

interface HotelListProps {
  hotels: Hotel[];
}

export default function HotelList({ hotels }: HotelListProps) {
  return (
    <main className="w-full md:w-3/4 space-y-4">
      {hotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No hotels found matching your criteria.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Please try adjusting your search filters.
          </p>
          <svg
            className="mx-auto mt-4 h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      ) : (
        hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
      )}
    </main>
  );
}
