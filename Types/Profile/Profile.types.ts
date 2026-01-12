// ===============================Profile Types==============================
export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  avatar: string;
  isPremium: boolean;
  rewardPoints: number;
}

// ===============================Edit Profile Form Data==============================
export interface EditProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

// ===============================Reward Tier==============================
export interface RewardTier {
  name: string;
  icon: JSX.Element;
  color: string;
  active: boolean;
}

// ===============================Setting Option==============================
export interface SettingOption {
  id: string;
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}
