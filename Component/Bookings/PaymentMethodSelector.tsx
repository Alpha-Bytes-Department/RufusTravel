"use client";

import { useState } from "react";
import { SiPaypal, SiStripe } from "react-icons/si";
import { TbBrandCoinbase, TbStack3 } from "react-icons/tb";
import type { PaymentMethod } from "@/Types/Booking/Booking.types";

// ===============================Props Interface==============================
interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onMethodChange: (method: PaymentMethod) => void;
  onContinue: () => void;
  onBack: () => void;
}

// ===============================Component==============================
const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
  onContinue,
  onBack,
}: PaymentMethodSelectorProps) => {
  // ===============================Payment Methods==============================
  const paymentMethods = [
    {
      id: "paypal" as PaymentMethod,
      name: "PayPal",
      icon: <SiPaypal className="text-3xl text-blue-600" />,
    },
    {
      id: "stripe" as PaymentMethod,
      name: "Stripe",
      icon: <SiStripe className="text-3xl text-purple-600" />,
    },
    {
      id: "paystack" as PaymentMethod,
      name: "Paystack",
      icon: <TbStack3 className="text-3xl text-cyan-600" />,
    },
    {
      id: "coinbase" as PaymentMethod,
      name: "Coinbase Commerce",
      icon: <TbBrandCoinbase className="text-3xl text-blue-500" />,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Select Payment Method
      </h2>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`flex items-center gap-4 p-6 border-2 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200 hover:border-yellow-300"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? "border-yellow-400" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {method.icon}
                <span className="font-semibold text-gray-900">
                  {method.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-yellow-400 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedMethod}
          className="flex-1 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-md shadow-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
