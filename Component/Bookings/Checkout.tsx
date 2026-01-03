"use client";

import { FaPlane } from "react-icons/fa";


import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useState } from "react";


const Checkout: React.FC = () => {
    
  return (
    <div className=" px-3 lg:px-16 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* Flight Card */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 border rounded-sm">
              <div>
                <img src="/british_airways.png" alt="british_air" />
              </div>
              <div className="text-sm mb-2">
                <h1 className="text-gray-500">British AIR </h1>
                <h1 className="text-gray-400">VQ-931 • Economy (B)</h1>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Departure */}
              <div>
                <div className="text-xl font-bold">ABJ</div>
                <div className="text-lg font-semibold">15:50</div>
                <div className="text-sm text-gray-500">
                  Thu 04 Dec
                  <br />
                  Dhaka
                </div>
              </div>

              {/* Timeline */}
              <div className="flex-1 mx-6">
                <div className="text-center text-sm font-medium mb-1">
                  12h 5m
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-400 p-2 rounded-full">
                    <FaPlane className="text-gray-800" />
                  </div>
                  <div className="flex-1 h-1 bg-yellow-400"></div>
                  <div className="h-4 w-4 bg-yellow-400 rounded-full"></div>
                </div>
                <div className="text-center text-sm text-gray-600 mt-1">
                  Non-Stop
                </div>
              </div>

              {/* Arrival */}
              <div className="text-right">
                <div className="text-xl font-bold">LND</div>
                <div className="text-lg font-semibold">16:55</div>
                <div className="text-sm text-gray-500">
                  Wed 05 Dec
                  <br />
                  Dhaka
                </div>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-400">Flight details</h3>

              <button className="text-yellow-500 text-sm font-medium cursor-pointer">
                Change flight
              </button>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <div>
                <img src="/british_airways.png" alt="british_air" />
              </div>
              <div>
                <h2 className="text-gray-600">British AIR</h2>
                <h3 className="text-gray-400">ABJ-LND</h3>
              </div>
            </div>
            <hr  className="w-56 mb-4"/>
            <div className="space-y-4 text-sm">
              {[
                "Seat choice for a fee",
                "Hand baggage included (10kg)",
                "1st checked bag for a fee: $60",
                "Cancellation fee applies",
                "Change fee applies",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="bg-yellow-500 text-white rounded-full p-1">
                    <Check size={14} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white border rounded-xl shadow-sm p-6 h-fit">
          <div className="text-2xl font-bold mb-4">$5,955</div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>1× Base Fare (ADULT)</span>
              <span>$5,024</span>
            </div>
            <div className="flex justify-between">
              <span>1× Tax (ADULT)</span>
              <span>$912</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>AIT & VAT</span>
              <span>$19</span>
            </div>
            <div className="flex justify-between">
              <span>Other Charges</span>
              <span>$50</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-yellow-600">
            <span>Total Price</span>
            <span>$5,955</span>
          </div>

          <div className="flex justify-between text-sm mt-3">
            <span>Fare Rules</span>
            <span className="text-yellow-600">Refundable</span>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Baggage</h4>
            <div className="grid grid-cols-3 text-sm text-gray-600">
              <span>Flight</span>
              <span>Check-In</span>
              <span>Cabin</span>

              <span>DAC-CXB</span>
              <span>20KGS</span>
              <span>7KG</span>
            </div>
          </div>

          <button className="mt-10 w-full bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-semibold py-3 rounded-xl">
            Check Out
          </button>
        </div>
      </div>
      {/*Available Flight: add the code here:*/}
    </div>
  );
};

export default Checkout;
