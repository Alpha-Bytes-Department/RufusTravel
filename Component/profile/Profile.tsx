"use client";

import { useState } from "react";
import {
  FiEdit2,
  FiMapPin,
  FiChevronRight,
  FiHeart,
  FiClock,
  FiCreditCard,
  FiHelpCircle,
  FiFileText,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import {
  IoBagCheckOutline,
  IoStorefrontOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { GiBigDiamondRing, GiDiamondTrophy } from "react-icons/gi";
import { FaStar, FaCrown } from "react-icons/fa";
import { TbCrown } from "react-icons/tb";
import {
  ProfileData,
  RewardTier,
  SettingOption,
  EditProfileFormData,
} from "@/Types/Profile/Profile.types";
import EditProfileModal from "./EditProfileModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ===============================Component==============================
const Profile = () => {
  // ===============================State==============================
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Akash Saha",
    email: "akash.saha@example.com",
    phone: "+880 1234-567890",
    address: "House 123, Road 45, Mirpur",
    city: "Dhaka",
    country: "Bangladesh",
    zipCode: "1230",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    isPremium: true,
    rewardPoints: 15216,
  });

  const [rewardTiers] = useState<RewardTier[]>([
    {
      name: "Gold",
      icon: <TbCrown className="text-3xl" />,
      color: "bg-yellow-500",
      active: true,
    },
    {
      name: "Platinum",
      icon: <GiBigDiamondRing className="text-3xl" />,
      color: "bg-cyan-500",
      active: false,
    },
    {
      name: "Diamond",
      icon: <GiDiamondTrophy className="text-3xl" />,
      color: "bg-blue-500",
      active: false,
    },
  ]);

  // ===============================Event Handlers==============================
  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (data: EditProfileFormData) => {
    setProfileData({
      ...profileData,
      ...data,
    });
    console.log("Profile updated:", data);
    // TODO: Add API call to save profile data
  };



  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout logic here
  };

  // ===============================Settings Options==============================
  const settingsOptions: SettingOption[] = [
    {
      id: "bookings",
      label: "Track My Bookings",
      icon: <IoBagCheckOutline className="text-xl text-yellow-600" />,
      onClick: () => console.log("Track bookings"),
    },
    {
      id: "saved",
      label: "Saved",
      icon: <FiHeart className="text-xl text-yellow-600" />,
      onClick: () => console.log("Saved items"),
    },
    {
      id: "chatbot",
      label: "AI Chatbot",
      icon: <IoChatbubbleEllipsesOutline className="text-xl text-yellow-600" />,
      onClick: () => console.log("AI Chatbot"),
    },
    {
      id: "history",
      label: "My History",
      icon: <FiClock className="text-xl text-yellow-600" />,
      onClick: () => console.log("My history"),
    },
    {
      id: "packing",
      label: "Packing Tips",
      icon: <FiPackage className="text-xl text-yellow-600" />,
      onClick: () => console.log("Packing tips"),
    },
    {
      id: "payment",
      label: "Payment Method",
      icon: <FiCreditCard className="text-xl text-yellow-600" />,
      onClick: () => console.log("Payment method"),
    },
    {
      id: "help",
      label: "Help Centre",
      icon: <FiHelpCircle className="text-xl text-yellow-600" />,
      onClick: () => console.log("Help centre"),
    },
    {
      id: "legal",
      label: "Legal Info",
      icon: <FiFileText className="text-xl text-yellow-600" />,
      onClick: () => console.log("Legal info"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ===============================Profile Header============================== */}
        <div className="bg-linear-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-sm border border-yellow-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:justify-between">
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-yellow-400 p-2.5 rounded-full shadow-lg hover:bg-yellow-500 transition-colors cursor-pointer"
                  aria-label="Upload profile picture"
                >
                  <FiEdit2 className="text-gray-900 text-lg" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name and Details */}
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {profileData.name}
                </h1>
                {profileData.isPremium && (
                  <div className="flex items-center gap-2 text-yellow-600 justify-center md:justify-start">
                    <FaCrown className="text-lg" />
                    <span className="font-medium">Premium user</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-600 justify-center md:justify-start">
                  <FiMapPin className="text-lg" />
                  <span>
                    My Address: {profileData.address}, {profileData.city}-
                    {profileData.zipCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={handleEditProfile}
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center gap-2 shadow-md"
            >
              <FiEdit2 className="text-lg" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* ===============================TripBank Rewards============================== */}
        <div className="bg-linear-to-br from-yellow-100 to-yellow-50 rounded-2xl shadow-sm border-2 border-yellow-300 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Points Info */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                TripBank Rewards
              </h2>
              <div className="flex items-center gap-2 text-yellow-600">
                <FaStar className="text-xl" />
                <span className="text-lg font-semibold">
                  {profileData.rewardPoints.toLocaleString()} Points
                </span>
              </div>
              <Link
                href="/profile/rewards"
                className="text-yellow-700 font-medium hover:text-yellow-800 transition-colors underline"
              >
                View Details
              </Link>
            </div>

            {/* Reward Tiers */}
            <div className="flex gap-4 md:gap-6">
              {rewardTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    onClick={() => {
                      if (tier.active) router.push("/profile/rewards");
                    }}
                    className={`w-16 h-16 cursor-pointer rounded-full ${
                      tier.color
                    } flex items-center justify-center text-white shadow-lg ${
                      tier.active
                        ? "ring-4  ring-yellow-400 scale-110"
                        : "hover:shadow-2xl"
                    } transition-transform duration-300 ease-in-out`}
                  >
                    {tier.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {tier.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===============================Account Settings============================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Account Settings
          </h2>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settingsOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.onClick}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  {option.icon}
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
                </div>
                <FiChevronRight className="text-gray-400 text-xl group-hover:text-yellow-600 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* ===============================Logout Button============================== */}
        <button
          onClick={handleLogout}
          className="w-full max-w-md mx-auto bg-red-50 text-red-600 py-4 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-3 border border-red-200 shadow-sm"
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </div>

      {/* ===============================Edit Profile Modal============================== */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
