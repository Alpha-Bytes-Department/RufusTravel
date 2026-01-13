// ===============================Gift Card Design==============================
export interface GiftCardDesign {
  id: string;
  name: string;
  color: string;
  gradient: string;
}

// ===============================Amount Option==============================
export interface AmountOption {
  value: number;
  label: string;
}

// ===============================Buy Card Form==============================
export interface BuyCardFormData {
  designId: string;
  amount: number;
  customAmount?: number;
}

// ===============================Send Card Form==============================
export interface SendCardFormData {
  recipientName: string;
  recipientEmail: string;
  amount: number;
  deliveryDate: string;
  message: string;
}

// ===============================Sent Card==============================
export interface SentCard {
  id: string;
  recipientName: string;
  recipientEmail: string;
  amount: number;
  sentDate: string;
  status: "claimed" | "pending";
}

// ===============================Redeem Form==============================
export interface RedeemFormData {
  giftCardCode: string;
}

// ===============================My Card==============================
export interface MyGiftCard {
  id: string;
  cardCode: string;
  design: string;
  balance: number;
  from: string;
  expiryDate: string;
  gradient: string;
}

// ===============================Tab Type==============================
export type GiftTab = "buy" | "send" | "redeem" | "my-cards";
