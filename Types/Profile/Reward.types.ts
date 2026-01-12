import { JSX } from "react";

// ===============================Reward Types==============================
export interface MembershipTier {
  name: string;
  pointsRequired: number;
  color: string;
  icon: JSX.Element;
  isCurrentTier: boolean;
}

// ===============================Reward Statistics==============================
export interface RewardStats {
  tripsTaken: number;
  pointsEarned: number;
  rewardsClaimed: number;
}

// ===============================Benefit Item==============================
export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  status: "active" | "locked";
}

// ===============================Quick Action==============================
export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  bgColor: string;
  onClick: () => void;
}

// ===============================Points Expiry==============================
export interface PointsExpiry {
  points: number;
  expiryDate: string;
}

// ===============================Membership Progress==============================
export interface MembershipProgress {
  currentTier: string;
  currentPoints: number;
  nextTier: string;
  pointsToNextTier: number;
  progressPercentage: number;
  estimatedAchievementDate: string;
}
