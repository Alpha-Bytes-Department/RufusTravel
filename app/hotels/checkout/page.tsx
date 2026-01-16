import { Suspense } from "react";
import HotelCheckout from "@/Component/Hotels/HotelCheckout";

export default function HotelCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <HotelCheckout />
    </Suspense>
  );
}
