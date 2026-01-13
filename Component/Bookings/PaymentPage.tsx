"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSolidCoupon } from "react-icons/bi";
import { FaPaypal } from "react-icons/fa";
import { SiCoinbase, SiStripe } from "react-icons/si";

type PaymentMethod = "paypal" | "stripe" | "paystack" | "coinbase" | null;

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [couponCode, setCouponCode] = useState("");
  const router = useRouter()

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: <FaPaypal className=" text-2xl" />, 
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: <SiStripe className=" text-2xl" />,
    },
    {
      id: "paystack",
      name: "Paystack",
      icon: "PS", 
    },
    {
      id: "coinbase",
      name: "Coinbase Commerce",
      icon: <SiCoinbase className="text-[#0052FF] text-2xl" />,
    },
  ] satisfies Array<{ id: PaymentMethod; name: string; icon: React.ReactNode }>;

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleApplyCoupon = () => {
    // TODO: Call API to validate and apply coupon
    console.log("Applying coupon:", couponCode);
  };

  const handleProceed = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }
    router.push("/bookings/checkout/passanger_form/payment/success")
    // TODO: Proceed to payment gateway with selected method
    console.log("Proceeding with:", selectedMethod);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => handleMethodSelect(method.id)}
                    className={`
                      flex items-center  gap-3 p-3 border-2 rounded-lg transition-all duration-200
                      ${
                        selectedMethod === method.id
                          ? "border-yellow-500 bg-blue-50 ring-1 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold
                        ${
                          selectedMethod === method.id
                            ? "bg-orange-300 text-white"
                            : "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {method.icon}
                    </div>
                    <span className="font-medium text-gray-900">
                      {method.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BiSolidCoupon className="h-5 w-5 " />
                  </div>

                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="
        w-full pl-11 pr-4 py-3 
        border border-gray-300 rounded-lg 
        bg-gray-200
        focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 
        outline-none transition-all
        text-gray-900 placeholder-gray-400
      "
                  />
                </div>

                <button
                  onClick={handleApplyCoupon}
                  className=" cursor-pointer
      px-8 py-3 
      bg-yellow-500 hover:bg-yellow-600 
      text-white font-medium 
      rounded-lg 
      transition-colors duration-200 
      whitespace-nowrap
      shadow-sm hover:shadow
      
    "
                >
                  APPLY
                </button>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-800 mb-3">Please Note</h3>
              <ul className="space-y-2.5 text-sm text-amber-800">
                <li>• The fare is non-refundable.</li>
                <li>• The Processing Fee is non-refundable.</li>
                <li>
                  • Please review the{" "}
                  <a href="#" className="underline hover:text-amber-900">
                    cancellation & refund policy
                  </a>{" "}
                  in case of cancellation.
                </li>
                <li>
                  • After payment is completed, your e-ticket will be issued and
                  sent via email.
                </li>
              </ul>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="flex justify-between text-yellow-600 mb-6">
                <h2 >
                Payment Details
              </h2>
                    <h1>Online Payment</h1>
              </div>

              <h1 className="font-bold">$5,955</h1>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">1 x Base Fare (ADULT)</span>
                  <span className="font-medium">$5,024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">1 x Tax (ADULT)</span>
                  <span className="font-medium">$5,024</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">AIT & VAT</span>
                    <span className="font-medium">$19</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Other Charges</span>
                    <span className="font-medium">$50</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Price</span>
                    <span>$5,955</span>
                  </div>
                </div>

                {/* Baggage Info */}
                <div className="pt-4 mt-2 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Baggage</h3>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Flight</span>
                      <p className="font-medium">DAC-CXB</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Check-in</span>
                      <p className="font-medium">20KGS</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Cabin</span>
                      <p className="font-medium">7KG</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                    <span className="text-yellow-500">TOTAL PAYABLE</span>
                    <span className="text-yellow-600">$6,184</span>
                  </div>
                </div>

                <button
                  onClick={handleProceed}
                  disabled={!selectedMethod}
                  className={`
                    w-full py-4 px-6 mt-6 rounded-lg font-bold text-lg transition-all duration-200 cursor-pointer
                    ${
                      selectedMethod
                        ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-md hover:shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
