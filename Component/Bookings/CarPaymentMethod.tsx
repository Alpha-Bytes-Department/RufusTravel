"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { PaymentMethodType } from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarPaymentMethodProps {
  onSelect: (method: PaymentMethodType) => void;
  selectedMethod?: PaymentMethodType;
}

// ===============================Component==============================
const CarPaymentMethod = ({
  onSelect,
  selectedMethod,
}: CarPaymentMethodProps) => {
  // ===============================State==============================
  const [couponCode, setCouponCode] = useState("");

  // ===============================Payment Methods============================== */}
  const paymentMethods: {
    id: PaymentMethodType;
    name: string;
    icon: string;
  }[] = [
    { id: "PayPal", name: "PayPal", icon: "💳" },
    { id: "Stripe", name: "Stripe", icon: "💎" },
    { id: "Paystack", name: "Paystack", icon: "📱" },
    { id: "Coinbase Commerce", name: "Coinbase Commerce", icon: "₿" },
  ];

  // ===============================Handlers==============================
  /**
   * Handles coupon code application
   */
  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      console.log("Applying coupon:", couponCode);
      // Add coupon logic here
    }
  };

  // ===============================Render==============================
  return (
    <div className="space-y-6">
      {/* ===============================Header============================== */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Payment Method
        </h2>
        <p className="text-sm text-gray-600">
          Choose your preferred payment method
        </p>
      </div>

      {/* ===============================Payment Options============================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`p-4 border-2 rounded-xl transition-all duration-200 flex items-center gap-3 hover:border-yellow-400 ${
              selectedMethod === method.id
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-3xl">{method.icon}</span>
            <span className="font-semibold text-gray-900">{method.name}</span>
          </button>
        ))}
      </div>

      {/* ===============================Coupon Code============================== */}
      <div>
        <Label
          htmlFor="couponCode"
          className="text-gray-700 font-medium mb-2 block"
        >
          <Ticket className="inline size-4 mr-2" />
          Enter coupon code
        </Label>
        <div className="flex gap-2">
          <Input
            id="couponCode"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleApplyCoupon}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6"
          >
            APPLY
          </Button>
        </div>
      </div>

      {/* ===============================Note============================== */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Please Note</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• The Processing Fee is non-refundable.</li>
          <li>
            • Please review the cancellation & refund policy in case of
            cancellation
          </li>
          <li>
            • After the payment is completed, your e-ticket will be issued and
            sent via email
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarPaymentMethod;
