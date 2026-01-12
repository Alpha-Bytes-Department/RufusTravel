"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "London, UK",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop",
    tours: 45,
    rating: 5,
    price: 899,
    size: "large", // Row 1, Col 1
  },
  {
    id: 2,
    name: "Coconut Beach, Nigeria",
    image:
      "https://images.unsplash.com/photo-1504896287989-ff1fbde00199?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tours: 45,
    rating: 5,
    price: 899,
    size: "large", // Row 1, Col 2
  },
  {
    id: 3,
    name: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1541300613939-71366b37c92e?q=80&w=1205&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tours: 45,
    rating: 5,
    price: 899,
    size: "large", // Row 1, Col 3
  },
  {
    id: 4,
    name: "Agbokim Waterfall, Nigeria",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=500&fit=crop",
    tours: 45,
    rating: 5,
    price: 899,
    size: "xlarge", // Row 2, Col 1-2 (spans 2 columns)
  },
  {
    id: 5,
    name: "Vatican City, Rome",
    image:
      "https://images.unsplash.com/photo-1529171696861-bac785a44828?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tours: 32,
    rating: 5,
    price: 750,
    size: "small", // Row 2, Col 3-Top Left
  },
  {
    id: 6,
    name: "Big Ben, London",
    image:
      "https://images.unsplash.com/photo-1569949380643-6e746ecaa3bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvdXJ8ZW58MHx8MHx8fDA%3D",
    tours: 28,
    rating: 5,
    price: 850,
    size: "small", // Row 2, Col 3-Top Right
  },
  {
    id: 7,
    name: "Taj Mahal, India",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=300&fit=crop",
    tours: 38,
    rating: 5,
    price: 650,
    size: "small", // Row 2, Col 3-Bottom Left
  },
  {
    id: 8,
    name: "Tokyo Tower, Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=300&fit=crop",
    tours: 42,
    rating: 5,
    price: 920,
    size: "small", // Row 2, Col 3-Bottom Right
  },
];

const FeaturedDestinations = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[80vw]">
        {/* ===============================Section Header============================== */}
        <div className="mb-10 text-start sm:mb-12 lg:mb-16">
          <h2 className="mb-2 font-bold text-2xl text-gray-900 sm:text-3xl lg:text-4xl">
            Featured Destinations
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Explore the world's most captivating locations
          </p>
        </div>

        {/* ===============================Gallery Grid============================== */}
        <div className="mb-10 grid gap-2 sm:gap-3">
          {/* ---Row 1: Three Large Cards--- */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {destinations.slice(0, 3).map((destination) => (
              <GalleryCard
                key={destination.id}
                destination={destination}
                isFavorite={favorites.includes(destination.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {/* ---Row 2: Large Card + Four Small Cards in 2x2 Grid--- */}
          <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-3">
            {/* Large Agbokim Waterfall - spans 2 columns on lg */}
            <div className="lg:col-span-2">
              <GalleryCard
                destination={destinations[3]}
                isFavorite={favorites.includes(destinations[3].id)}
                onToggleFavorite={toggleFavorite}
                isLarge
              />
            </div>

            {/* Small cards - 2x2 grid on right */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {destinations.slice(4, 8).map((destination) => (
                <GalleryCard
                  key={destination.id}
                  destination={destination}
                  isFavorite={favorites.includes(destination.id)}
                  onToggleFavorite={toggleFavorite}
                  isSmall
                />
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

// ===============================Gallery Card Component==============================
interface GalleryCardProps {
  destination: (typeof destinations)[0];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  isLarge?: boolean;
  isSmall?: boolean;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
  destination,
  isFavorite,
  onToggleFavorite,
  isLarge = false,
  isSmall = false,
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm shadow-lg transition-all duration-300 hover:shadow-2xl ${
        isSmall ? " " : isLarge ? "aspect-video" : "aspect-4/3"
      }`}
    >
      {/* ---Background Image--- */}
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* ---Dark Overlay--- */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70"></div>

      {/* ---Top Content: Name and Tours--- */}
      <div className="absolute top-3 left-3 right-3 z-20">
        <h3 className="mb-0.5 font-bold text-white text-sm leading-tight sm:text-base lg:text-lg">
          {destination.name}
        </h3>
        <p className="text-white text-xs sm:text-sm">
          {destination.tours} tours available
        </p>
      </div>

      {/* ---Star Rating Badge with Number--- */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-yellow-400 px-2 py-1 sm:px-2.5 sm:py-1">
        <Star className="size-3 fill-yellow-700 text-yellow-700 sm:size-3.5" />
        <span className="font-semibold text-xs text-gray-900 sm:text-sm">
          {destination.rating}.0
        </span>
      </div>

      {/* ---Favorite Button--- */}
      <button
        onClick={() => onToggleFavorite(destination.id)}
        className="absolute bottom-3 right-3 z-20 flex size-8 items-center justify-center rounded-full bg-transparent transition-all hover:bg-red-500 sm:size-9"
      >
        <Heart
          className={`size-4 sm:size-5 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </button>

      {/* ---Bottom Content: Price--- */}
      <div className="absolute bottom-3 left-3 z-20">
        <p className="font-bold text-white text-base sm:text-lg lg:text-xl">
          ${destination.price}
        </p>
      </div>

      {/* ---Explore Button (on hover)--- */}
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link href="./tour" className="bg-white px-2 rounded-lg py-1 text-gray-900 transition-all hover:bg-gray-100">
          Explore
        </Link>
      </div>
    </div>
  );
};

export default FeaturedDestinations;
