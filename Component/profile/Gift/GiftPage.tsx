"use client";

import { useState } from "react";
import { FiGift, FiDownload } from "react-icons/fi";
import {
  GiftCardDesign,
  AmountOption,
  BuyCardFormData,
  SendCardFormData,
  SentCard,
  RedeemFormData,
  MyGiftCard,
  GiftTab,
} from "@/Types/Profile/Gift.types";

// ===============================Component==============================
const GiftPage = () => {
  // ===============================State==============================
  const [activeTab, setActiveTab] = useState<GiftTab>("buy");
  const [buyFormData, setBuyFormData] = useState<BuyCardFormData>({
    designId: "travel-dreams",
    amount: 25,
  });
  const [customAmount, setCustomAmount] = useState<string>("");
  const [sendFormData, setSendFormData] = useState<SendCardFormData>({
    recipientName: "",
    recipientEmail: "",
    amount: 25,
    deliveryDate: "",
    message: "",
  });
  const [redeemCode, setRedeemCode] = useState<string>("");

  // ===============================Data==============================
  const giftCardDesigns: GiftCardDesign[] = [
    {
      id: "travel-dreams",
      name: "Travel Dreams",
      color: "text-white",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: "adventure-awaits",
      name: "Adventure Awaits",
      color: "text-white",
      gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      id: "vacation-time",
      name: "Vacation Time",
      color: "text-white",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      id: "holiday-special",
      name: "Holiday Special",
      color: "text-white",
      gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
  ];

  const amountOptions: AmountOption[] = [
    { value: 25, label: "$25" },
    { value: 50, label: "$50" },
    { value: 100, label: "$100" },
    { value: 250, label: "$250" },
    { value: 500, label: "$500" },
    { value: 150, label: "$150" },
  ];

  const sentCards: SentCard[] = [
    {
      id: "1",
      recipientName: "Sarah Johnson",
      recipientEmail: "sarah@example.com",
      amount: 10,
      sentDate: "2025-11-20",
      status: "claimed",
    },
    {
      id: "2",
      recipientName: "Mike Davis",
      recipientEmail: "mike@example.com",
      amount: 5,
      sentDate: "2025-11-22",
      status: "pending",
    },
  ];

  const myCards: MyGiftCard[] = [
    {
      id: "1",
      cardCode: "TB-2025-ABC123",
      design: "Send a Gift Card",
      balance: 150,
      from: "John Smith",
      expiryDate: "2025-11-20",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: "2",
      cardCode: "TB-2025-XYZ789",
      design: "Adventure Awaits",
      balance: 75,
      from: "John Smith",
      expiryDate: "2025-11-20",
      gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  ];

  const totalBalance = myCards.reduce((sum, card) => sum + card.balance, 0);

  // ===============================Event Handlers==============================
  const handleDesignSelect = (designId: string) => {
    setBuyFormData({ ...buyFormData, designId });
  };

  const handleAmountSelect = (amount: number) => {
    setBuyFormData({ ...buyFormData, amount });
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setBuyFormData({ ...buyFormData, amount: numValue });
    }
  };

  const handleBuyCheckout = () => {
    console.log("Checkout with:", buyFormData);
    // Navigate to checkout or payment page
  };

  const handleSendGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send gift card:", sendFormData);
    // Send gift card logic
  };

  const handleRedeemCard = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Redeem code:", redeemCode);
    // Redeem logic
  };

  // ===============================Render Tabs==============================
  const tabs = [
    { id: "buy" as GiftTab, label: "Buy Card" },
    { id: "send" as GiftTab, label: "Send Card" },
    { id: "redeem" as GiftTab, label: "Redeem" },
    { id: "my-cards" as GiftTab, label: "My Cards" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===============================Banner============================== */}
      <div
        className="relative w-full h-48 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=400&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(6, 182, 212, 0.7)",
        }}
      >
       
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <FiGift className="text-5xl mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Tripbank Giftcards
          </h1>
          <p className="text-sm md:text-base">The perfect gift for travelers</p>
        </div>
      </div>

      {/* ===============================Tabs Navigation============================== */}
      <div className="bg-white sticky top-0 z-20">
        <div className="w-[95vw] lg:max-w-[80vw] mx-auto">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-yellow-600 border-yellow-400"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===============================Tab Content============================== */}
      <div className="w-[95vw] lg:max-w-[80vw] mx-auto py-8">
        {/* Buy Card Tab */}
        {activeTab === "buy" && (
          <div className="space-y-8">
            {/* Choose a Design */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Choose a Design
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {giftCardDesigns.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => handleDesignSelect(design.id)}
                    className={`${design.gradient} ${
                      design.color
                    } rounded-xl p-8 text-center transition-all hover:scale-105 ${
                      buyFormData.designId === design.id
                        ? "ring-4 ring-yellow-400 ring-offset-2"
                        : ""
                    }`}
                  >
                    <FiGift className="text-4xl mx-auto mb-3" />
                    <h3 className="text-xl font-bold">{design.name}</h3>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Amount */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Select Amount
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amountOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAmountSelect(option.value)}
                      className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                        buyFormData.amount === option.value && !customAmount
                          ? "border-yellow-400 bg-yellow-50 text-gray-900"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="lg:min-w-[400px]">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Custom Amount
                </h2>
                <input
                  type="text"
                  placeholder="$ Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-700"
                />
                <button
                  onClick={handleBuyCheckout}
                  className="w-full mt-4 bg-yellow-400 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
                >
                  Continue to Checkout
                </button>
              </div>
            </div>

            {/* Earn Bonus Points */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <FiGift className="text-2xl text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Earn Bonus Points
                  </h3>
                  <p className="text-sm text-gray-700">
                    Get 5% back in points on all gift card purchases
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send Card Tab */}
        {activeTab === "send" && (
          <div className="space-y-8">
            {/* Send Card Header */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
              <FiGift className="text-4xl mb-3" />
              <h2 className="text-2xl font-bold mb-2">Send a Gift Card</h2>
              <p className="text-purple-100">
                Make someone's day with travel credits
              </p>
            </div>

            {/* Send Form */}
            <form onSubmit={handleSendGiftCard} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={sendFormData.recipientName}
                    onChange={(e) =>
                      setSendFormData({
                        ...sendFormData,
                        recipientName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={sendFormData.recipientEmail}
                    onChange={(e) =>
                      setSendFormData({
                        ...sendFormData,
                        recipientEmail: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="$ 25"
                    value={sendFormData.amount}
                    onChange={(e) =>
                      setSendFormData({
                        ...sendFormData,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    value={sendFormData.deliveryDate}
                    onChange={(e) =>
                      setSendFormData({
                        ...sendFormData,
                        deliveryDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Recipient Name
                </label>
                <textarea
                  placeholder="Write a personal message..."
                  value={sendFormData.message}
                  onChange={(e) =>
                    setSendFormData({
                      ...sendFormData,
                      message: e.target.value,
                    })
                  }
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
              >
                Send Gift Card
              </button>
            </form>

            {/* Sent Cards History */}
            {sentCards.length > 0 && (
              <div className="space-y-4">
                {sentCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {card.recipientName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {card.recipientEmail}
                        </p>
                        <div className="mt-2">
                          <p className="text-lg font-bold text-gray-900">
                            ${card.amount}
                          </p>
                          <p className="text-xs text-gray-500">0</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                            card.status === "claimed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {card.status === "claimed" ? "Claimed" : "Pending"}
                        </span>
                        <span className="text-sm text-gray-600">
                          {card.sentDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Redeem Tab */}
        {activeTab === "redeem" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Redeem Card */}
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-8 text-white">
                <FiDownload className="text-4xl mb-3" />
                <h2 className="text-2xl font-bold mb-2">Redeem Gift Card</h2>
                <p className="text-green-100">
                  Enter your gift card code below
                </p>
              </div>

              {/* Redeem Form */}
              <form onSubmit={handleRedeemCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Gift card code
                  </label>
                  <input
                    type="text"
                    placeholder="TB-2025-XXXXXXXXXXXXXX"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-400 bg-yellow-50"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
                >
                  Redeem Now
                </button>
              </form>
            </div>

            {/* How to Redeem */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                How to Redeem
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Enter your unique gift card code above</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>
                    The balance will be added to your account instantly
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Use it for flights, hotels, or car rentals</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* My Cards Tab */}
        {activeTab === "my-cards" && (
          <div className="space-y-8">
            {/* Total Balance */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-lg text-gray-600 mb-2">
                Total Gift Card Balance
              </h2>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                ${totalBalance}
              </div>
              <p className="text-sm text-gray-600">
                {myCards.length} active card{myCards.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* My Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCards.map((card) => (
                <div
                  key={card.id}
                  className={`${card.gradient} rounded-2xl p-6 text-white shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FiGift className="text-2xl" />
                      <span className="font-semibold">{card.design}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-80 mb-1">Balance</div>
                      <div className="text-3xl font-bold">${card.balance}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs opacity-80">Card Code</div>
                      <div className="font-mono text-sm">{card.cardCode}</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="opacity-80">From: </span>
                        <span className="font-semibold">{card.from}</span>
                      </div>
                      <div>
                        <span className="opacity-80">Expires:</span>
                        <span className="font-semibold">{card.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftPage;
