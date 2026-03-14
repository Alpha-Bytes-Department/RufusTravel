"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FlightClass {
  name: string;
  description?: string;
  price: string;
}

interface FlightExtra {
  icon: string;
  name: string;
  price: string;
  optional?: boolean;
}

interface Flight {
  images: string[];
  airline: string;
  flightNumber: string;
  rating: string;
  ratingText: string;
  reviews: string;
  departureTime: string;
  duration: string;
  arrivalTime: string;
  depAirport: string;
  stops: string;
  arrAirport: string;
  date: string;
  planeModel: string;
  onTime: string;
  cabinClass: string;
  classes: FlightClass[];
  extras: FlightExtra[];
  totalPrice: string;
  seatsLeft: string;
}

const flights: Flight[] = [
  {
    images: ["/united_airline.jpg", "/bannerBackground.webp", "/card.png"],
    airline: "United Airlines",
    flightNumber: "UA 2451",
    rating: "8.8",
    ratingText: "Very Good",
    reviews: "1243 reviews",
    departureTime: "08:00",
    duration: "6h 15m",
    arrivalTime: "11:15",
    depAirport: "JFK New York",
    stops: "Nonstop",
    arrAirport: "LAX Los Angeles",
    date: "Thu, Dec 12, 2025",
    planeModel: "Boeing 787-9 Dreamliner",
    onTime: "92%",
    cabinClass: "Economy",
    classes: [
      { name: "Economy", price: "Included" },
      { name: "Premium Economy", price: "+$189" },
      { name: "Business Class", price: "+$889" },
      { name: "First Class", price: "+$1499" },
    ],
    extras: [
      { icon: "🧳", name: "1 Checked Baggage (23kg)", price: "+$35" },
      { icon: "🧳", name: "Extra Checked Baggage (23kg)", price: "+$60" },
      { icon: "🍽️", name: "Meal Selection", price: "+$15" },
      { icon: "💺", name: "Seat Selection", price: "+$25" },
      { icon: "🛡️", name: "Travel Insurance", price: "+$45" },
    ],
    totalPrice: "$289",
    seatsLeft: "Only 4 seats left at this price",
  },
  {
    images: ["/delta_airline.jpg", "/bannerBackground.webp", "/card.png"],
    airline: "Delta Air Lines",
    flightNumber: "DL 1522",
    rating: "9.3",
    ratingText: "Excellent",
    reviews: "2156 reviews",
    departureTime: "14:30",
    duration: "6h 30m",
    arrivalTime: "18:00",
    depAirport: "JFK New York",
    stops: "Nonstop",
    arrAirport: "LAX Los Angeles",
    date: "Thu, Dec 12, 2025",
    planeModel: "Airbus A350-900",
    onTime: "95%",
    cabinClass: "Comfort+",
    classes: [
      { name: "Economy", price: "Included" },
      { name: "Comfort+", price: "+$149" },
      { name: "Delta One", price: "+$1299" },
    ],
    extras: [
      { icon: "🧳", name: "1 Checked Baggage (23kg)", price: "+$30" },
      { icon: "🧳", name: "Extra Checked Baggage (23kg)", price: "+$55" },
      { icon: "🍽️", name: "Premium Meal", price: "+$22" },
      { icon: "💺", name: "Priority Seat Selection", price: "+$35" },
      { icon: "🛡️", name: "Travel Insurance", price: "+$50" },
    ],
    totalPrice: "$349",
    seatsLeft: "Only 6 seats left at this price",
  },
  {
    images: ["/american_airlines.jpg", "/bannerBackground.webp", "/card.png"],
    airline: "American Airlines",
    flightNumber: "AA 178",
    rating: "8.2",
    ratingText: "Very Good",
    reviews: "987 reviews",
    departureTime: "06:15",
    duration: "6h 20m",
    arrivalTime: "09:35",
    depAirport: "JFK New York",
    stops: "Nonstop",
    arrAirport: "LAX Los Angeles",
    date: "Thu, Dec 12, 2025",
    planeModel: "Boeing 777-300ER",
    onTime: "89%",
    cabinClass: "Main Cabin",
    classes: [
      { name: "Main Cabin", price: "Included" },
      { name: "Main Cabin Extra", price: "+$129" },
      { name: "Business Class", price: "+$999" },
      { name: "First Class", price: "+$1699" },
    ],
    extras: [
      { icon: "🧳", name: "1 Checked Baggage (23kg)", price: "+$40" },
      { icon: "🧳", name: "Extra Checked Baggage (23kg)", price: "+$70" },
      { icon: "🍽️", name: "Snacks & Beverage Pack", price: "+$18" },
      { icon: "💺", name: "Preferred Seat", price: "+$29" },
      { icon: "🛡️", name: "Travel Insurance", price: "+$42" },
    ],
    totalPrice: "$259",
    seatsLeft: "Only 3 seats left at this price",
  },
];

const FlightCard = ({ flight }: { flight: Flight }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % flight.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + flight.images.length) % flight.images.length,
    );
  };

  const handleBookFlight = () => {
    router.push("/bookings/checkout/passanger_form");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Carousel Image Section */}
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={flight.images[currentImageIndex]}
          alt={`${flight.airline} aircraft`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.dataset.fallbackApplied === "true") return;
            target.dataset.fallbackApplied = "true";
            target.src = "/card.png";
          }}
        />

        {/* Top-left Text Badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded">
          Best Package
        </div>

        {/* Navigation Arrows
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-gray-700 font-extrabold h-8 w-8 flex items-center justify-center rounded-full hover:bg-black/60 hover:text-white transition"
          aria-label="Previous image"
        >
          &lt;
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-700 font-extrabold h-8 w-8 flex items-center justify-center rounded-full hover:bg-black/60 hover:text-white transition"
          aria-label="Next image"
        >
          &gt;
        </button> */}

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {flight.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentImageIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{flight.airline}</h3>
            <p className="text-sm text-gray-600">{flight.flightNumber}</p>
          </div>
          <div className="text-right">
            <div className="text-green-600 font-semibold">{flight.rating}</div>
            <div className="text-xs text-gray-500">{flight.ratingText}</div>
            <div className="text-xs text-gray-500">{flight.reviews}</div>
          </div>
        </div>

        <div className="flex justify-between items-center my-3 text-lg font-medium">
          <div>{flight.departureTime}</div>
          <div className="text-center">
            <div className="text-sm text-gray-500">{flight.duration}</div>
            <div className="text-xs text-gray-600">{flight.stops}</div>
          </div>
          <div>{flight.arrivalTime}</div>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>{flight.depAirport}</span>
          <span>{flight.arrAirport}</span>
        </div>

        <div className="text-sm text-gray-500 mb-4">{flight.date}</div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-blue-600">✈️</span>
          <span>{flight.planeModel}</span>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
            {flight.onTime} on-time
          </span>
        </div>

        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Cabin class</span>
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Compare cabin classes →
            </a>
          </div>

          <div className="space-y-1 text-sm">
            {flight.classes.map((cls, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{cls.name}</span>
                <span className="font-medium">{cls.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="text-3xl font-bold mb-1">{flight.totalPrice}</div>
          <p className="text-sm text-gray-600">
            per person • includes taxes & fees
          </p>
          <p className="text-red-600 text-sm mt-1 font-medium">
            {flight.seatsLeft}
          </p>

          <button
            onClick={handleBookFlight}
            className="mt-4 w-full bg-yellow-600 hover:bg-yellow-600 text-white font-medium py-3 rounded-lg transition"
          >
            Book Flight
          </button>
        </div>
      </div>
    </div>
  );
};

const AvailableFlights = () => {
  return (
    <div className=" py-8">
      <h1 className="text-3xl font-bold mb-8">Available Flights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFlights;
