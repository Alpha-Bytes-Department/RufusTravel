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

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const InteractiveMap = ({ tours }: InteractiveMapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  const handleMoveEnd = (position: any) => {
    setPosition(position);
  };

  return (
    <div className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 100,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={8}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E7EB"
                  stroke="#9CA3AF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#D1D5DB", outline: "none" },
                    pressed: { fill: "#9CA3AF", outline: "none" },
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
                {/* Pin shape */}
                <path
                  d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 13 8 13s8-7.5 8-13c0-4.42-3.58-8-8-8z"
                  fill={tour.badge.text === "Hotel" ? "#EAB308" : "#F59E0B"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
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
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none z-10">
          {tooltipContent}
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() =>
            setPosition((pos) => ({
              ...pos,
              zoom: Math.min(pos.zoom * 1.5, 8),
            }))
          }
          className="bg-white hover:bg-gray-100 text-gray-700 font-bold size-10 rounded-lg shadow-md transition-colors flex items-center justify-center"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() =>
            setPosition((pos) => ({
              ...pos,
              zoom: Math.max(pos.zoom / 1.5, 1),
            }))
          }
          className="bg-white hover:bg-gray-100 text-gray-700 font-bold size-10 rounded-lg shadow-md transition-colors flex items-center justify-center"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={() => setPosition({ coordinates: [0, 20], zoom: 1 })}
          className="bg-white hover:bg-gray-100 text-gray-700 text-xs font-medium px-2 py-2 rounded-lg shadow-md transition-colors"
          aria-label="Reset view"
        >
          Reset
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md">
        <div className="text-xs font-semibold text-gray-700 mb-2">Legend</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600">Hotel</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-600">Tour</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <p className="text-xs text-gray-600">🖱️ Drag to pan • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
