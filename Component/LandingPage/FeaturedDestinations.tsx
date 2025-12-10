"use client";

import React from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "London, UK",
    image: "/images/destinations/london.jpg", // Update with actual image paths
    tours: 18,
    rating: 5,
    price: 899,
  },
  {
    id: 2,
    name: "Coconut Beach, Nigeria",
    image: "/images/destinations/coconut-beach.jpg",
    tours: 12,
    rating: 5,
    price: 450,
  },
  {
    id: 3,
    name: "Dubai, UAE",
    image: "/images/destinations/dubai.jpg",
    tours: 25,
    rating: 5,
    price: 1299,
  },
  {
    id: 4,
    name: "Agbokim Waterfall, Nigeria",
    image: "/images/destinations/agbokim.jpg",
    tours: 8,
    rating: 5,
    price: 350,
  },
  {
    id: 5,
    name: "Paris, France",
    image: "/images/destinations/paris.jpg",
    tours: 22,
    rating: 5,
    price: 950,
  },
  {
    id: 6,
    name: "Bali, Indonesia",
    image: "/images/destinations/bali.jpg",
    tours: 15,
    rating: 5,
    price: 750,
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="bg-linear-to-b from-white to-yellow-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[80vw]">
        {/* ===============================Section Header============================== */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl lg:text-5xl">
            Featured Destinations
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Discover our handpicked selection of the world's most beautiful
            destinations
          </p>
        </div>

        {/* ===============================Destinations Grid============================== */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              {/* ---Destination Image--- */}
              <div className="relative aspect-4/3 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200">
                  {/* Placeholder - replace with actual Image component when images are available */}
                  <div className="flex size-full items-center justify-center bg-linear-to-br from-yellow-100 to-orange-100">
                    <span className="font-semibold text-gray-400 text-xl">
                      {destination.name}
                    </span>
                  </div>
                </div>

                {/* ---Favorite Button--- */}
                <button
                  type="button"
                  className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-yellow-500"
                >
                  <Heart className="size-5 text-gray-700" />
                </button>
              </div>

              {/* ---Destination Info--- */}
              <div className="p-5">
                {/* ---Name and Rating--- */}
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="font-bold text-gray-900 text-xl">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {[...Array(destination.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                </div>

                {/* ---Tours Available--- */}
                <p className="mb-4 text-gray-600 text-sm">
                  {destination.tours} tours available
                </p>

                {/* ---Price and CTA--- */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-2xl text-yellow-600">
                      ${destination.price}
                    </span>
                    <span className="text-gray-600 text-sm">per person</span>
                  </div>
                  <Button className="bg-yellow-500 text-gray-900 transition-all hover:bg-yellow-600">
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===============================View More Button============================== */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-2 border-yellow-500 bg-transparent px-8 py-6 text-yellow-600 transition-all hover:bg-yellow-500 hover:text-gray-900"
          >
            View More Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
