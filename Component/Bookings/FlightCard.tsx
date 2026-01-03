"use client";

import React, { useState } from "react";
import { Plane, PlaneTakeoff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Drawer } from "antd";
import { FaPlane } from "react-icons/fa";

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
            onClick={() => setOpen(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold px-6 py-2 rounded-lg w-full"
          >
            Flight Details
          </Button>

          <Drawer
            width={420}
            placement="right"
            closable={false}
            onClose={() => setOpen(false)}
            open={open}
            classNames={{
              mask: "bg-black/50",
              body: "p-0",
            }}
            headerStyle={{ display: "none" }}
          >
            <div className="bg-white h-full flex flex-col">
              {/* Header with Title and Close Icon */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Review fare to London
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Airline Header */}
                <div className="bg-gray-50 rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-4">
                    <img
                      src="/british_airways.png" 
                      alt="British Airways"
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        British AIR
                      </div>
                      <div className="text-sm text-gray-600">
                        VQ-931 • Economy (B)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-10">
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">ABJ</div>
                    <div className="text-2xl text-gray-700 mt-1">15:50</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Thu 04 Dec
                      <br />
                      Dhaka
                    </div>
                  </div>

             
                  <div className="flex-1 mx-2 relative">
                    
                    <div className="text-center mt-4">
                      <div className="font-semibold text-gray-900">12h 5m</div>
                      <div className="flex items-center w-full ">
                      
                        <FaPlane className="text-4xl bg-yellow-400 rounded-full p-2" />

                  
                        <div className="flex-1 h-1.5 bg-yellow-400"></div>

               
                        <div className="h-6 w-6 rounded-full bg-yellow-400"></div>
                      </div>

                      <div className="text-sm text-gray-600">Non-Stop</div>
                    </div>
                  </div>

                 
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">LND</div>
                    <div className="text-2xl text-gray-700 mt-1">16:55</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Wed 08 Dec
                      <br />
                      Dhaka
                    </div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="space-y-4 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aircraft</span>
                    <span className="font-medium text-gray-900">
                      Airbus A350-1000
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cabin</span>
                    <span className="font-medium text-gray-900">Economy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance</span>
                    <span className="font-medium text-gray-900">5012 km</span>
                  </div>
                </div>
              </div>

              {/* Bottom Fixed Button */}
              <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-200">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-600 text-gray-600 font-bold text-lg py-7 rounded-xl shadow-lg">
                  See Fares
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );

  const [open, setOpen] = useState(false);

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
