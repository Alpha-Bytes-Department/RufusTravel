"use client";

import { useState } from "react";
// @ts-ignore - react-simple-maps doesn't have type definitions for React 19
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { MapPin } from "lucide-react";

interface Tour {
  id: string;
  location: string;
  title: string;
  coordinates: [number, number];
  badge: {
    text: string;
    icon: "hotel" | "tour";
  };
}

interface InteractiveMapProps {
  tours: Tour[];
}

// Using a reliable GeoJSON source from world-atlas
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const InteractiveMap = ({ tours }: InteractiveMapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  return (
    <div className="relative w-full h-full bg-blue-50 rounded-lg overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 147,
          center: [0, 0],
        }}
        width={800}
        height={600}
        className="w-full h-full"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={20}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D4E5D4"
                  stroke="#4A5568"
                  strokeWidth={0.75}
                  style={{
                    default: {
                      fill: "#D4E5D4",
                      stroke: "#4A5568",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#A8D5BA",
                      stroke: "#2D3748",
                      strokeWidth: 1,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#86C7A0",
                      stroke: "#1A202C",
                      strokeWidth: 1,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Markers for each tour location */}
          {tours.map((tour) => (
            <Marker
              key={tour.id}
              coordinates={tour.coordinates}
              onMouseEnter={() => {
                setTooltipContent(`${tour.title} - ${tour.location}`);
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
            >
              <g
                transform="translate(-12, -24)"
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                {/* Pin shadow */}
                <ellipse cx="12" cy="26" rx="4" ry="2" fill="rgba(0,0,0,0.2)" />
                {/* Pin shape */}
                <path
                  d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8z"
                  fill={tour.badge.text === "Hotel" ? "#FBBF24" : "#F97316"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Center dot */}
                <circle cx="12" cy="8" r="3" fill="#ffffff" />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none z-10 max-w-xs text-center">
          {tooltipContent}
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={() =>
            setPosition((pos) => ({
              ...pos,
              zoom: Math.min(pos.zoom * 1.5, 20),
            }))
          }
          className="bg-white hover:bg-gray-100 text-gray-700 font-bold size-10 rounded-lg shadow-lg transition-colors flex items-center justify-center border border-gray-300"
          aria-label="Zoom in"
        >
          <span className="text-xl">+</span>
        </button>
        <button
          onClick={() =>
            setPosition((pos) => ({
              ...pos,
              zoom: Math.max(pos.zoom / 1.5, 1),
            }))
          }
          className="bg-white hover:bg-gray-100 text-gray-700 font-bold size-10 rounded-lg shadow-lg transition-colors flex items-center justify-center border border-gray-300"
          aria-label="Zoom out"
        >
          <span className="text-xl">−</span>
        </button>
        <button
          onClick={() => setPosition({ coordinates: [0, 20], zoom: 1 })}
          className="bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg shadow-lg transition-colors border border-gray-300"
          aria-label="Reset view"
        >
          Reset
        </button>
      </div>

      
      

      
    </div>
  );
};

export default InteractiveMap;
