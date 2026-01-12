"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  ReferralData,
  HowItWorksStep,
  MilestoneReward,
  ReferredUser,
} from "@/Types/Profile/Refer.types";
import ReferralBanner from "./ReferralBanner";
import ReferralCodeSection from "./ReferralCodeSection";
import ShareOptions from "./ShareOptions";
import HowItWorks from "./HowItWorks";
import MilestoneRewards from "./MilestoneRewards";
import YourReferrals from "./YourReferrals";

// ===============================Component==============================
const ReferAFriend = () => {
  // ===============================State==============================
  const [referralData] = useState<ReferralData>({
    referralCode: "Diya288000000",
    referralLink: "https://tripbank.com/refer/di...",
    pointsPerReferral: 1650,
  });

  const [howItWorks] = useState<HowItWorksStep[]>([
    {
      step: 1,
      title: "Share your code",
      description: "Send your unique code to friends",
    },
    {
      step: 2,
      title: "They sign-up",
      description: "Friends create account using your code",
    },
    {
      step: 3,
      title: "You both earn",
      description: "Get points when they make their first booking",
    },
  ]);

  const [milestoneRewards] = useState<MilestoneReward[]>([
    {
      id: "1",
      referralsRequired: 5,
      bonusPoints: 1000,
      isClaimed: false,
    },
    {
      id: "2",
      referralsRequired: 10,
      bonusPoints: 1500,
      isClaimed: false,
    },
    {
      id: "3",
      referralsRequired: 25,
      bonusPoints: 3000,
      isClaimed: false,
    },
    {
      id: "4",
      referralsRequired: 50,
      bonusPoints: 7500,
      isClaimed: false,
    },
  ]);

  const [referrals] = useState<ReferredUser[]>([
    {
      id: "1",
      name: "Emma Wilson",
      email: "emma@example.com",
      joinDate: "15 Dec 24 13:30",
      status: "joined",
      bookingsCount: 3,
      pointsEarned: 1250.0,
    },
    {
      id: "2",
      name: "James Brown",
      email: "james@example.com",
      joinDate: "14 Dec 24 10:15",
      status: "joined",
      bookingsCount: 1,
      pointsEarned: 2890.0,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===============================Toast Container============================== */}
      <Toaster />

      {/* ===============================Banner============================== */}
      <ReferralBanner pointsPerReferral={referralData.pointsPerReferral} />

      {/* ===============================Content============================== */}
      <div className="w-[95vw] lg:max-w-[80vw] mx-auto py-8 space-y-8">
        {/* ===============================Referral Code & Share Section============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReferralCodeSection
            referralCode={referralData.referralCode}
            referralLink={referralData.referralLink}
          />
          <ShareOptions
            referralCode={referralData.referralCode}
            referralLink={referralData.referralLink}
            pointsPerReferral={referralData.pointsPerReferral}
          />
        </div>

        {/* ===============================How it Works & Milestone Rewards============================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HowItWorks steps={howItWorks} />
          <MilestoneRewards milestones={milestoneRewards} />
        </div>

        {/* ===============================Your Referrals============================== */}
        <YourReferrals referrals={referrals} />
      </div>
    </div>
  );
};

export default ReferAFriend;
