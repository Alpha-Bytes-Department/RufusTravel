import type { AddOn } from "@/Types/Booking/Booking.types";

// ===============================Sample Add-ons Data==============================
export const SAMPLE_ADDONS: AddOn[] = [
  {
    id: "addon-1",
    name: "Travel Insurance",
    description: "$500 per person",
    price: 500,
    currency: "BDT",
  },
  {
    id: "addon-2",
    name: "Professional Photography",
    description: "$1,500 per person",
    price: 1500,
    currency: "BDT",
  },
  {
    id: "addon-3",
    name: "Extra Meal Package",
    description: "$800 per person",
    price: 800,
    currency: "BDT",
  },
  {
    id: "addon-4",
    name: "Private Guide Upgrade",
    description: "$2,000 per person",
    price: 2000,
    currency: "BDT",
  },
];
