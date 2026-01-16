"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Star,
  Wifi,
  Award,
  Users,
  ChevronLeft,
  ChevronRight,
  AirVent,
  Briefcase,
  Wind,
  Phone,
  Droplets,
  DoorOpen,
  ParkingCircle,
  Lock,
  BellRing,
  Tv,
  Voicemail as VoicemailIcon,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockHotels } from "@/lib/utils/mockHotels";
import { Hotel } from "@/Types/Hotel/hotel";
import { FaSwimmer as SwimmingPool } from "react-icons/fa";
interface HotelDetailProps {
  hotelId: string;
}

const HotelDetail = ({ hotelId }: HotelDetailProps) => {
  const router = useRouter();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarHotels, setSimilarHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const foundHotel = mockHotels.find((h) => h.id === parseInt(hotelId));
    if (foundHotel) {
      setHotel(foundHotel);
      // Get similar hotels (same star rating or nearby price)
      const similar = mockHotels
        .filter(
          (h) =>
            h.id !== foundHotel.id &&
            (h.starRating === foundHotel.starRating ||
              Math.abs(h.price - foundHotel.price) < 500)
        )
        .slice(0, 3);
      setSimilarHotels(similar);
    }
  }, [hotelId]);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const hotelImages = [
    hotel.image,
    "https://picsum.photos/seed/room1/800/600",
    "https://picsum.photos/seed/room2/800/600",
  ];

  const amenityIcons: Record<string, React.ReactNode> = {
    "Air Conditioning": <AirVent className="size-8 text-[#D4A60A]" />,
    "Business Center": <Briefcase className="size-8 text-[#D4A60A]" />,
    "Clothing Iron": <Wind className="size-8 text-[#D4A60A]" />,
    "Data Ports": <Phone className="size-8 text-[#D4A60A]" />,
    "Dry Cleaning": <Droplets className="size-8 text-[#D4A60A]" />,
    "Hair Dryer": <Wind className="size-8 text-[#D4A60A]" />,
    "Meeting Rooms": <DoorOpen className="size-8 text-[#D4A60A]" />,
    "Outdoor Pool": <SwimmingPool className="size-8 text-[#D4A60A]" />,
    "Parking Garage": <ParkingCircle className="size-8 text-[#D4A60A]" />,
    Safe: <Lock className="size-8 text-[#D4A60A]" />,
    "Room Service": <BellRing className="size-8 text-[#D4A60A]" />,
    "TV in Room": <Tv className="size-8 text-[#D4A60A]" />,
    Voicemail: <VoicemailIcon className="size-8 text-[#D4A60A]" />,
  };

  return (
    <div className=" mx-auto max-w-[95vw] lg:max-w-[80vw] lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-6">
        <div className="lg:col-span-2 relative h-96 rounded-md overflow-hidden">
          <Image
            src={hotelImages[selectedImage]}
            alt={hotel.name}
            fill
            className="object-cover"
          />
          <button
            onClick={() =>
              setSelectedImage((prev) =>
                prev === 0 ? hotelImages.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() =>
              setSelectedImage((prev) =>
                prev === hotelImages.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {hotelImages.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              className="relative   rounded-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(idx + 1)}
            >
              <Image
                src={img}
                alt={`View ${idx + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hotel Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white mb-6">
            <h1 className="text-3xl font-bold mb-3">{hotel.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              {Array(Math.floor(hotel.rating))
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-[#FFC107] text-[#FFC107]"
                  />
                ))}
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="size-5" />
              <span>{hotel.location}</span>
            </div>

            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-700 mb-6">{hotel.description}</p>
            <p className="text-gray-700">
              Complimentary wired and wireless Internet access keeps you
              connected, and satellite programming provides entertainment.
              Private bathrooms with separate bathtubs and showers feature deep
              soaking bathtubs and complimentary toiletries. Conveniences
              include phones, as well as laptop-compatible safes and desks.
            </p>
          </div>

          {/* Amenities Section */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                "Air Conditioning",
                "Business Center",
                "Clothing Iron",
                "Data Ports",
                "Dry Cleaning",
                "Hair Dryer",
                "Meeting Rooms",
                "Outdoor Pool",
                "Parking Garage",
                "Safe",
                "Room Service",
                "TV in Room",
                "Voicemail",
              ].map((amenity) => (
                <div
                  key={amenity}
                  className="flex flex-col items-center text-center p-3"
                >
                  <div className="mb-2">
                    {amenityIcons[amenity] || (
                      <Award className="size-8 text-[#D4A60A]" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Similar More Section */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6">Similar More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarHotels.map((simHotel, idx) => (
                <div
                  key={simHotel.id}
                  className="border-2 border-gray-200 rounded-2xl overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={simHotel.image}
                      alt={simHotel.name}
                      fill
                      className="object-cover"
                    />
                    {idx === 0 && (
                      <div className="absolute top-3 left-3 bg-[#D4A60A] text-white px-3 py-1 rounded-full text-sm font-bold">
                        Frequently booked
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">
                      {simHotel.name.split(",")[0]}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#22C55E] text-white px-2 py-1 rounded text-sm font-bold">
                        {simHotel.rating}
                      </span>
                      <span className="text-sm text-gray-600">
                        Wonderful · {simHotel.reviews} reviews
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p className="flex items-center gap-2">
                        <Check className="size-4 text-[#22C55E]" /> Free self
                        parking
                      </p>
                      <p className="flex items-center gap-2">
                        <Check className="size-4 text-[#22C55E]" />{" "}
                        {Math.floor(Math.random() * 100)} sq m
                      </p>
                      <p className="flex items-center gap-2">
                        <Check className="size-4 text-[#22C55E]" /> Sleeps 2
                      </p>
                      <p className="flex items-center gap-2">
                        <Check className="size-4 text-[#22C55E]" /> 1 King Bed
                      </p>
                      <p className="flex items-center gap-2">
                        <Check className="size-4 text-[#22C55E]" /> Free WiFi
                      </p>
                    </div>
                    <button className="text-[#D4A60A] hover:underline text-sm font-medium flex items-center gap-1">
                      More details <ArrowRight className="size-4" />
                    </button>

                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <p className="text-xs text-gray-500 mb-2">
                        Cancellation policy
                      </p>
                      <p className="text-xs text-gray-600 mb-3">
                        Non-refundable
                        <br />
                        Fully refundable before 12 Dec
                      </p>

                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Extras</p>
                          <p className="text-sm">No extras + €0</p>
                          <p className="text-sm">Breakfast + €13</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">per night</p>
                          <p className="text-2xl font-bold">
                            ${simHotel.price}
                          </p>
                          <p className="text-xs text-gray-500">for 1 room</p>
                        </div>
                      </div>

                      <Button
                        onClick={() => router.push(`/hotels/${simHotel.id}`)}
                        className="w-full bg-[#D4A60A] hover:bg-[#B8900A] text-white font-bold py-3 rounded-xl"
                      >
                        Reserve
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-2">
                        You will not be charged yet
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Highlights */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 sticky top-6">
            <Button
              onClick={() =>
                router.push(`/hotels/checkout?hotelId=${hotel.id}`)
              }
              className="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-gray-900 font-bold py-4 rounded-xl mb-6 text-lg"
            >
              See Room Availability
            </Button>

            <h3 className="text-xl font-bold mb-4">Highlights</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="size-6 text-[#D4A60A] shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    The location of this hotel has a rating score of 96!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Award className="size-6 text-[#D4A60A] shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    This hotel has a wellness rating score of 95!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Wifi className="size-6 text-[#D4A60A] shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    The WiFi service this hotel provides has a rating score of
                    87!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Users className="size-6 text-[#D4A60A] shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    The staff's service has an overall rating of 91!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
