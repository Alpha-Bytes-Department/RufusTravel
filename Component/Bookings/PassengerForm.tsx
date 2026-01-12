// components/PassengerForm.tsx
"use client";

import React from "react";

const PassengerForm = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#fffdf5] border border-[#f0e8c8] rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#fff8e1] px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h2 className="font-bold text-lg">Contact Details</h2>
                <p className="text-sm text-gray-600">
                  to receive your E-tickets & updates
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile No.<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    defaultValue="+88 01792998587"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    defaultValue="asksaha@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    NIN Number
                  </label>
                  <input
                    type="text"
                    defaultValue="654846565416556651"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Passport Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="56465465465465"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Passenger Details</h2>
            <p className="text-gray-600 mb-6">
              Please Provide the details of passenger
            </p>

            <div className="bg-[#fffdf5] border border-[#f0e8c8] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#fff8e1] px-6 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                  👥
                </div>
                <h3 className="font-bold text-lg">Adult 1</h3>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["MR.", "MS.", "MRS."].map((title) => (
                      <button
                        key={title}
                        className={`px-6 py-2.5 border rounded-lg font-medium transition-colors ${
                          title === "MR."
                            ? "bg-yellow-400 border-yellow-400 text-black"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name (Given Name)
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="Akash"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name (Surname)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="Saha"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="MM-DD-YYYY"
                      defaultValue="MM-DD-YYYY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white pr-12"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      📅
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Summary & Continue Button */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden sticky top-6">
            {/* Header */}
            <div className="p-5 border-b">
              <div className="text-sm text-gray-400 mb-1">British AIR</div>
              <div className="text-sm text-gray-600">VQ-931 • Economy (B)</div>
            </div>

            {/* Flight Info */}
            <div className="p-5 space-y-5">
              {/* Airport Codes */}
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <div className="text-xl font-bold">ABJ</div>
                  <div className="text-sm text-gray-600">15:50</div>
                  <div className="text-sm text-gray-500">Thu 04 Dec</div>
                  <div className="text-sm text-gray-500">Dhaka</div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold">LND</div>
                  <div className="text-sm text-gray-600">16:55</div>
                  <div className="text-sm text-gray-500">Wed 05 Dec</div>
                  <div className="text-sm text-gray-500">Dhaka</div>
                </div>
              </div>

              {/* EXACT Timeline */}
              <div className="flex flex-col items-center">
                {/* Duration */}
                <div className="text-xl font-medium mb-2">12h 5m</div>

                {/* Line */}
                <div className="relative w-full flex items-center">
                  {/* Left big circle */}
                  <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xl z-10">
                    ✈
                  </div>

                  {/* Line */}
                  <div className="flex-1 h-[4px] bg-yellow-400"></div>

                  {/* Right small dot */}
                  <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                </div>

                {/* Stop info */}
                <div className="text-lg font-medium mt-2">Non-Stop</div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="p-5 border-t">
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl transition text-lg">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
