"use client";

import { useState } from "react";
import { FiGift, FiUsers, FiTrendingUp, FiAlertCircle } from "react-icons/fi";
import {
  IoBagCheckOutline,
  IoAirplaneOutline,
  IoCarOutline,
  IoWifiOutline,
  IoFastFoodOutline,
  IoRocketOutline,
} from "react-icons/io5";
import { LuPlane } from "react-icons/lu";
import { TbCrown, TbDiamond } from "react-icons/tb";
import { FaCrown, FaGifts } from "react-icons/fa";
import { GiDiamondTrophy } from "react-icons/gi";
import {
  MembershipTier,
  RewardStats,
  BenefitItem,
  QuickAction,
  PointsExpiry,
  MembershipProgress,
} from "@/Types/Profile/Reward.types";
import { useRouter } from "next/navigation";

// ===============================Component==============================
const Reward = () => {
  // ===============================State==============================
  const [membershipData] = useState<MembershipProgress>({
    currentTier: "Platinum",
    currentPoints: 15216,
    nextTier: "Diamond",
    pointsToNextTier: 38432,
    progressPercentage: 86,
    estimatedAchievementDate: "March 2025",
  });
  const router=useRouter()
  const [stats] = useState<RewardStats>({
    tripsTaken: 24,
    pointsEarned: 18432,
    rewardsClaimed: 8,
  });

  const [pointsExpiry] = useState<PointsExpiry>({
    points: 2148,
    expiryDate: "December 31, 2025",
  });

  const [membershipTiers] = useState<MembershipTier[]>([
    {
      name: "Silver",
      pointsRequired: 5000,
      color: "bg-gray-400",
      icon: <div className="w-6 h-6 rounded-full bg-gray-400" />,
      isCurrentTier: false,
    },
    {
      name: "Gold",
      pointsRequired: 10000,
      color: "bg-yellow-500",
      icon: <TbCrown className="text-2xl text-yellow-500" />,
      isCurrentTier: false,
    },
    {
      name: "Platinum",
      pointsRequired: 15000,
      color: "bg-cyan-500",
      icon: <FaCrown className="text-2xl text-cyan-500" />,
      isCurrentTier: true,
    },
    {
      name: "Diamond",
      pointsRequired: 25000,
      color: "bg-blue-400",
      icon: <GiDiamondTrophy className="text-2xl text-blue-400" />,
      isCurrentTier: false,
    },
  ]);

  const [benefits] = useState<BenefitItem[]>([
    {
      id: "priority-boarding",
      title: "Priority Boarding",
      description: "Board the plane at airports",
      icon: <IoAirplaneOutline className="text-2xl text-yellow-600" />,
      status: "active",
    },
    {
      id: "room-upgrades",
      title: "Room Upgrades",
      description: "Free hotel room upgrades",
      icon: <IoBagCheckOutline className="text-2xl text-yellow-600" />,
      status: "active",
    },
    {
      id: "car-rental",
      title: "Car Rental Discount",
      description: "20% off on car rentals",
      icon: <IoCarOutline className="text-2xl text-yellow-600" />,
      status: "active",
    },
    {
      id: "airport-lounge",
      title: "Airport Lounge",
      description: "Complimentary lounge access",
      icon: <IoWifiOutline className="text-2xl text-gray-400" />,
      status: "locked",
    },
    {
      id: "extra-baggage",
      title: "Extra Baggage",
      description: "+10kg baggage allowance",
      icon: <IoBagCheckOutline className="text-2xl text-gray-400" />,
      status: "locked",
    },
    {
      id: "fast-track",
      title: "Fast Track",
      description: "Priority security clearance",
      icon: <IoRocketOutline className="text-2xl text-gray-400" />,
      status: "locked",
    },
  ]);

  const [quickActions] = useState<QuickAction[]>([
    {
      id: "gift-cards",
      title: "Gift Cards",
      description: "Earn gift ideas",
      icon: <FiGift className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-600",
      onClick: () => router.push("/profile/gift"),
    },
    {
      id: "refer-friends",
      title: "Refer Friends",
      description: "Earn 1,000 points",
      icon: <FiUsers className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      onClick: () => router.push("/profile/refer"),
    },
  ]);

  // ===============================Event Handlers==============================
  const handleUsePoints = () => {
    console.log("Use points clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-[95vw] lg:max-w-[80vw] mx-auto space-y-6">
        {/* ===============================Header Section============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-6">
          {/* Main Membership Card */}
          <div className="bg-linear-to-br flex flex-col justify-between from-[#00D5BE] to-cyan-600 rounded-2xl shadow-lg p-6 md:p-8 text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {membershipData.currentTier}
                </h2>
                <p className="text-cyan-100 text-sm">Member</p>
                <p className="text-cyan-100 text-sm mt-4">
                  Since November 2024
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl md:text-4xl font-bold">
                  {membershipData.currentPoints.toLocaleString()}
                </div>
                <p className="text-cyan-100 text-sm">Points Available</p>
              </div>
            </div>

            <div className="space-y-2 ">
              <div className="flex justify-between items-center ">
                <span className="text-cyan-100">
                  Progress to {membershipData.nextTier}
                </span>
                <span className="font-semibold">
                  {membershipData.progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-cyan-400 rounded-full h-3">
                <div
                  className="bg-white rounded-full h-3 transition-all duration-500"
                  style={{ width: `${membershipData.progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-cyan-100 mt-3">
                <span>Remaining points earned!</span>
                <span className="font-semibold">
                  {membershipData.pointsToNextTier.toLocaleString()} points
                </span>
              </div>
              <p className="text-cyan-100 text-sm px-3 py-1 rounded-full bg-[#efecf728] mt-2">
                You are on track to reach {membershipData.nextTier} by{" "}
                {membershipData.estimatedAchievementDate}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <LuPlane className="text-3xl text-yellow-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {stats.tripsTaken}
              </div>
              <p className="text-sm text-gray-600">Trips Taken</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <IoRocketOutline className="text-3xl text-yellow-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {stats.pointsEarned.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Points Earned</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <FaGifts className="text-3xl text-yellow-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">
                {String(stats.rewardsClaimed).padStart(2, "0")}
              </div>
              <p className="text-sm text-gray-600">Rewards Claimed</p>
            </div>
          </div>
        </div>

        {/* ===============================Membership Tiers & Benefits============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Membership Tiers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Membership Tiers
            </h3>
            <div className="space-y-4">
              {membershipTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    tier.isCurrentTier
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${tier.color} flex items-center justify-center text-white`}
                    >
                      {tier.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{tier.name}</h4>
                      <p className="text-sm text-gray-600">
                        {tier.isCurrentTier ? "Current Tier" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {tier.pointsRequired.toLocaleString()} pts
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Points Expiring Soon */}
            <div className="mt-6 bg-linear-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <FiAlertCircle className="text-2xl text-yellow-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    Points Expiring Soon
                  </h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">
                      {pointsExpiry.points.toLocaleString()} points
                    </span>{" "}
                    will expire on
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {pointsExpiry.expiryDate}
                  </p>
                </div>
              </div>
              <button
                onClick={handleUsePoints}
                className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Use Points Now
              </button>
            </div>
          </div>

          {/* Your Benefits */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Your Benefits
            </h3>
            <div className="space-y-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-yellow-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {benefit.icon}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    {benefit.status === "active" ? (
                      <span className="px-4 py-1.5 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-4 py-1.5 bg-gray-100 text-gray-500 text-sm font-semibold rounded-full">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===============================Quick Actions============================== */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.onClick}
                className={`${action.bgColor} rounded-2xl shadow-lg p-6 md:p-8 text-white text-left hover:shadow-xl transition-shadow cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  {action.icon}
                  <div>
                    <h4 className="text-xl font-bold">{action.title}</h4>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
