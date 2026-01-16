"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Wifi, Award, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { mockHotels } from "@/lib/utils/mockHotels";
import { Hotel } from "@/Types/Hotel/hotel";
import { FaPaypal, FaStripe } from "react-icons/fa";
import { TbBrandCoinbase } from "react-icons/tb";

const HotelCheckout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hotelId = searchParams?.get("hotelId");

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  useEffect(() => {
    if (hotelId) {
      const foundHotel = mockHotels.find((h) => h.id === parseInt(hotelId));
      if (foundHotel) {
        setHotel(foundHotel);
      }
    }
  }, [hotelId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/hotels/success");
  };

  if (!hotel) {
    return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FFC107] rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">Loading hotel details...</p>
      </div>
    </div>
    );
  }

  return (
    <div className="max-w-[95vw] lg:max-w-[80vw] lg:px-6 mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 ">
          <div className="rounded-sm shadow-lg shadow-gray-400">
            <h1 className="text-3xl text-center font-bold mb-8">
              Confirm Booking
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your Details */}
              <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-bold mb-6">Your details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      First name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      required
                      placeholder="Akash"
                      className="w-full rounded-md border-2 border-gray-200 p-3"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Last name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      required
                      placeholder="Saha"
                      className="w-full rounded-md border-2 border-gray-200 p-3"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      required
                      type="tel"
                      placeholder="017062998587"
                      className="w-full rounded-md border-2 border-gray-200 p-3"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      required
                      type="email"
                      placeholder="askash9@gmail.com"
                      className="w-full rounded-md border-2 border-gray-200 p-3"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-sm text-gray-700 mb-2 block">
                    Special requests to hotel
                  </Label>
                  <textarea
                    className="w-full rounded-md border-2 border-gray-200 p-3 min-h-32"
                    placeholder="Enter any special requests..."
                  />
                </div>
              </div>
              {/* Payment Information */}
              <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all ${
                      paymentMethod === "paypal"
                        ? "border-[#FFC107] bg-[#FFF9E6]"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="text-2xl text-blue-600">
                      <FaPaypal />
                    </span>
                    <span className="font-semibold">PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("stripe")}
                    className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all ${
                      paymentMethod === "stripe"
                        ? "border-[#FFC107] bg-[#FFF9E6]"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="text-2xl text-blue-600">
                      <FaStripe />
                    </span>
                    <span className="font-semibold">Stripe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paystack")}
                    className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all ${
                      paymentMethod === "paystack"
                        ? "border-[#FFC107] bg-[#FFF9E6]"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="text-2xl text-blue-600 font-bold italic">
                      P
                    </span>
                    <span className="font-semibold">Paystack</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("coinbase")}
                    className={`flex items-center gap-3 p-4 rounded-md border-2 transition-all ${
                      paymentMethod === "coinbase"
                        ? "border-[#FFC107] bg-[#FFF9E6]"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="text-2xl text-blue-600">
                      <TbBrandCoinbase />
                    </span>
                    <span className="font-semibold">Coinbase Commerce</span>
                  </button>
                </div>
              </div>
              {/* Billing Address */}
              <div className="bg-white rounded-md p-6">
                <h2 className="text-xl font-bold mb-6">Billing Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      First name
                    </Label>
                    <Input className="w-full rounded-md border-2 border-gray-200 p-3" />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Last name
                    </Label>
                    <Input className="w-full rounded-md border-2 border-gray-200 p-3" />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      className="w-full rounded-md border-2 border-gray-200 p-3"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      className="w-full rounded-md border-2 border-gray-200 p-3"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Country
                    </Label>
                    <select className="w-full rounded-md border-2 border-gray-200 p-3">
                      <option>Country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Singapore</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      State/Province
                    </Label>
                    <Input className="w-full rounded-md border-2 border-gray-200 p-3" />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-2 block">
                      Postal (ZIP) Code
                    </Label>
                    <Input className="w-full rounded-md border-2 border-gray-200 p-3" />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FFC107] hover:bg-[#FFD54F] text-gray-900 font-bold py-4 rounded-md mt-6 text-lg"
                >
                  Confirm & Proceed
                </Button>
              </div>
            </form>
          </div>
          {/* Cancellation Policy */}
          <div className="bg-white rounded-md p-6 mt-6 shadow-lg shadow-gray-400">
            <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
            <ul className="space-y-2 text-lg text-amber-700">
              <li>
                • This rate is non-refundable. If you change or cancel your
                booking you will not get a refund or credit to use for a future
                stay.
              </li>
              <li>
                • No refunds will be issued for late check-in or early
                check-out.
              </li>
              <li>• Stay extensions require a new reservation.</li>
            </ul>
          </div>
        </div>

        {/* Right: Hotel Info & Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-md sticky top-6 space-y-6">
            {/* Hotel Image and Info */}
            <div className=" shadow-lg shadow-gray-400 rounded-sm p-4">
              <div className="relative h-48 rounded-sm overflow-hidden mb-4">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#22C55E] text-white px-2 py-1 rounded text-sm font-bold">
                  {hotel.rating}
                </span>
                <span className="text-sm text-gray-600">
                  {hotel.reviews} Reviews
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <MapPin className="size-4" />
                <span>{hotel.location}</span>
              </div>

              {/* Amenities Icons */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Wifi className="size-4" />
                  <span>Free WiFi</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="size-4" />
                  <span>Room Service</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="size-4" />
                  <span>Safe</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Users className="size-4" />
                <span>Parking Garage</span>
              </div>
            </div>

            

            {/* Booking Details */}
            <div className="p-4 bg-white rounded-md shadow-lg shadow-gray-400">
              <h3 className="font-bold mb-3">Your booking details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Check-in</p>
                  <p className="font-semibold">Tue, 09 Jul 2024</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Check-out</p>
                  <p className="font-semibold">Wed, 10 Jul 2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Deluxe Rooms
                <br />1 night
              </p>
            </div>

            

            {/* Pricing Summary */}
            <div className="p-4 bg-white rounded-md shadow-lg shadow-gray-400">
              <h3 className="font-bold mb-3">Pricing Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">1 night × 1 room</span>
                  <span className="font-semibold">${hotel.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax and service fees →</span>
                  <span className="font-semibold">$8</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${hotel.price + 8}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCheckout;
