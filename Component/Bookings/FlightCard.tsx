"use client";

import React from "react";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departureCode: string;
  departureName: string;
  departureTime: string;
  departureDate: string;
  arrivalCode: string;
  arrivalName: string;
  arrivalTime: string;
  arrivalDate: string;
  duration: string;
  stops: number;
  flightNumber: string;
  class: string;
  baggage: string;
}

export interface FlightCardData {
  id: string;
  outbound: Flight;
  return?: Flight;
  price: number;
  isRefundable: boolean;
  totalTravelers: number;
}

interface FlightCardProps {
  flight: FlightCardData;
  onDetailsClick: (flightId: string) => void;
}

const FlightCard = ({ flight, onDetailsClick }: FlightCardProps) => {
  const renderFlightSegment = (segment: Flight, isReturn: boolean = false) => (
    <div className="flex items-center justify-between py-4">
      {/* Airline Logo */}
      <div className="flex items-center gap-3 w-24">
        <img
          src={segment.airlineLogo}
          alt={segment.airline}
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Departure Info */}
      <div className="text-left">
        <div className="font-bold text-xl text-gray-900">
          {segment.departureCode}
        </div>
        <div className="text-sm text-gray-600">{segment.departureTime}</div>
        <div className="text-xs text-gray-500">{segment.departureDate}</div>
        <div className="text-xs text-gray-500">{segment.departureName}</div>
      </div>

      {/* Flight Path */}
      <div className="flex-1 px-8">
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="flex-1 h-0.5 bg-yellow-400"></div>
            <div className="bg-yellow-400 rounded-full p-3">
              <Plane
                className={`size-5 text-gray-900 ${
                  isReturn ? "rotate-180" : ""
                }`}
              />
            </div>
            <div className="flex-1 h-0.5 bg-yellow-400"></div>
          </div>
          <div className="text-center mt-2">
            <div className="text-sm font-semibold text-gray-900">
              {segment.duration}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              {segment.stops === 0
                ? "Non-Stop"
                : `${segment.stops} Stop${segment.stops > 1 ? "s" : ""}`}
            </div>
          </div>
        </div>
      </div>

      {/* Arrival Info */}
      <div className="text-right">
        <div className="font-bold text-xl text-gray-900">
          {segment.arrivalCode}
        </div>
        <div className="text-sm text-gray-600">{segment.arrivalTime}</div>
        <div className="text-xs text-gray-500">{segment.arrivalDate}</div>
        <div className="text-xs text-gray-500">{segment.arrivalName}</div>
      </div>

      {/* Price and Details (only on outbound) */}
      {!isReturn && (
        <div className="text-right ml-8 w-40">
          <div className="font-bold text-2xl text-gray-900 mb-1">
            ${flight.price.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mb-3">
            One Way for {flight.totalTravelers} traveller(s)
          </div>
          <Button
            onClick={() => onDetailsClick(flight.id)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-lg w-full"
          >
            Flight Details
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4 hover:shadow-lg transition-shadow">
      {/* Outbound Flight */}
      {renderFlightSegment(flight.outbound)}

      {/* Return Flight */}
      {flight.return && (
        <>
          <div className="border-t border-gray-200 my-2"></div>
          <div className="flex items-center justify-between py-4">
            {/* Airline Logo */}
            <div className="flex items-center gap-3 w-24">
              <img
                src={flight.return.airlineLogo}
                alt={flight.return.airline}
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* Departure Info */}
            <div className="text-left">
              <div className="font-bold text-xl text-gray-900">
                {flight.return.departureCode}
              </div>
              <div className="text-sm text-gray-600">
                {flight.return.departureTime}
              </div>
              <div className="text-xs text-gray-500">
                {flight.return.departureDate}
              </div>
              <div className="text-xs text-gray-500">
                {flight.return.departureName}
              </div>
            </div>

            {/* Flight Path */}
            <div className="flex-1 px-8">
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="flex-1 h-0.5 bg-yellow-400"></div>
                  <div className="bg-yellow-400 rounded-full p-3">
                    <Plane className="size-5 text-gray-900 rotate-180" />
                  </div>
                  <div className="flex-1 h-0.5 bg-yellow-400"></div>
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-semibold text-gray-900">
                    {flight.return.duration}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    {flight.return.stops === 0
                      ? "Non-Stop"
                      : `${flight.return.stops} Stop${
                          flight.return.stops > 1 ? "s" : ""
                        }`}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrival Info */}
            <div className="text-right">
              <div className="font-bold text-xl text-gray-900">
                {flight.return.arrivalCode}
              </div>
              <div className="text-sm text-gray-600">
                {flight.return.arrivalTime}
              </div>
              <div className="text-xs text-gray-500">
                {flight.return.arrivalDate}
              </div>
              <div className="text-xs text-gray-500">
                {flight.return.arrivalName}
              </div>
            </div>

            <div className="w-40 ml-8"></div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 mt-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>{flight.outbound.airline}</span>
            <span>•</span>
            <span>{flight.outbound.flightNumber}</span>
            <span>•</span>
            <span>{flight.outbound.class}</span>
            <span>•</span>
            <span>{flight.outbound.baggage}</span>
          </div>
          {flight.isRefundable && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-1 rounded-full font-semibold">
              Refundable
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
