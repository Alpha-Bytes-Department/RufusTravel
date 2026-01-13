// ===============================Referral Data==============================
export interface ReferralData {
  referralCode: string;
  referralLink: string;
  pointsPerReferral: number;
}

// ===============================How It Works Step==============================
export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

// ===============================Milestone Reward==============================
export interface MilestoneReward {
  id: string;
  referralsRequired: number;
  bonusPoints: number;
  isClaimed: boolean;
}

// ===============================Referred User==============================
export interface ReferredUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: "joined" | "pending";
  bookingsCount: number;
  pointsEarned: number;
}

// ===============================Share Method==============================
export type ShareMethod = "email" | "link" | "social";
