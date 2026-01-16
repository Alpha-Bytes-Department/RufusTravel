"use client";

import { Hotel } from "@/Types/Hotel/hotel";
import Image from "next/image";
import { MdStar, MdLocationOn } from "react-icons/md";
import { useRouter } from "next/navigation";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white border-2 border-gray-200 rounded-md shadow-lg overflow-hidden">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Hotel Image */}
        <div className="relative w-full h-48">
          <Image
            src={hotel.image || "/placeholder-hotel.jpg"}
            alt={hotel.name}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-hotel.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array(Math.floor(hotel.rating))
                .fill(0)
                .map((_, i) => (
                  <MdStar key={i} className="text-[#FFC107] size-5" />
                ))}
            </div>
            <span className="text-sm text-gray-600">
              {hotel.rating} ({hotel.reviews} Reviews)
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MdLocationOn className="mr-1 size-5 text-[#D4A60A]" />
            {hotel.location}
          </div>

          <p className="text-sm text-gray-700 line-clamp-2">
            {hotel.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div>
              <p className="text-2xl font-bold text-[#D4A60A]">
                ${hotel.price}
              </p>
              <p className="text-xs text-gray-500">1 room 1 night</p>
              <p className="text-xs text-gray-500">Taxes incl.</p>
            </div>
            <button
              className="bg-[#FFC107] hover:bg-[#FFD54F] text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors shadow-md"
              onClick={() => router.push(`/hotels/${hotel.id}`)}
            >
              Select
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center p-3 gap-6">
        {/* Hotel Image */}
        <div className="relative w-64 h-48 shrink-0">
          <Image
            src={hotel.image || "/placeholder-hotel.jpg"}
            alt={hotel.name}
            fill
            className="object-cover rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-hotel.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">{hotel.name}</h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array(Math.floor(hotel.rating))
                .fill(0)
                .map((_, i) => (
                  <MdStar key={i} className="text-[#FFC107] size-5" />
                ))}
            </div>
            <span className="text-sm text-gray-600">
              {hotel.rating} ({hotel.reviews} Reviews)
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MdLocationOn className="mr-1 size-5 text-[#D4A60A]" />
            {hotel.location}
          </div>

          <p className="text-sm text-gray-700">{hotel.description}</p>
        </div>

        {/* Price and Action */}
        <div className="text-right space-y-3 shrink-0">
          <div>
            <p className="text-3xl font-bold text-[#D4A60A]">${hotel.price}</p>
            <p className="text-sm text-gray-500">1 room 1 night</p>
            <p className="text-sm text-gray-500">Taxes incl.</p>
          </div>
          <button
            className="bg-[#FFC107] hover:bg-[#FFD54F] text-gray-900 font-bold px-8 py-3 rounded-xl transition-colors shadow-md w-full"
            onClick={() => router.push(`/hotels/${hotel.id}`)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
