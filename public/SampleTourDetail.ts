import type { TourDetail } from "@/Types/Tour/TourDetail.types";
import type { Tour } from "@/Types/Tour/Tour.types";

// ===============================Sample Tour Detail Data==============================
export const SAMPLE_TOUR_DETAIL: TourDetail = {
  id: "1",
  title: "Old Dhaka Heritage Walk",
  description:
    "Step back in time with a guided walking tour through the historic streets of Old Dhaka. Experience Mughal architecture, bustling bazaars, and authentic street food.",
  location: "Dhaka, Bangladesh",
  city: "Dhaka",
  country: "Bangladesh",
  category: "Cultural",
  images: [
    "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
  ],
  price: 2500,
  currency: "BDT",
  rating: 4.7,
  reviewCount: 121,
  duration: {
    days: 1,
    nights: 0,
    hours: 8,
  },
  maxGroup: 15,
  languages: ["Spanish", "English", "Hindi"],
  nextDate: "12/01/2025",
  groupDiscount: "Group discounts available for 10+ people",
  highlights: [
    { id: "h1", text: "Lalbagh Fort exploration" },
    { id: "h2", text: "Ahsan Manzil (Pink Palace)" },
    { id: "h3", text: "Shankhari Bazar and Armenian Church" },
    { id: "h4", text: "Traditional street food tasting" },
  ],
  requirements: [
    { id: "r1", text: "Good walking stamina" },
    { id: "r2", text: "Comfortable shoes essential" },
    { id: "r3", text: "Modest clothing recommended" },
    { id: "r4", text: "Camera allowed" },
  ],
};

// ===============================Sample Related Tours==============================
export const SAMPLE_RELATED_TOURS: Tour[] = [
  {
    id: "2",
    title: "Sundarbans Mangrove Adventure",
    description:
      "Experience the wild beauty of Sundarbans - the largest mangrove forest in the world. Spot Royal Bengal Tigers and diverse wildlife.",
    location: "Khulna, Bangladesh",
    city: "Khulna",
    country: "Bangladesh",
    category: "Wildlife",
    image: "https://images.unsplash.com/photo-1535262412227-85541e910204?w=800",
    price: 12500,
    currency: "BDT",
    rating: 4.9,
    reviewCount: 321,
    duration: {
      days: 3,
      nights: 2,
    },
  },
  {
    id: "3",
    title: "Ancient Buddhist Vihara Discovery",
    description:
      "Explore ancient Buddhist heritage sites including Somapura Mahavihara, a UNESCO World Heritage Site from the 8th century.",
    location: "Naogaon, Bangladesh",
    city: "Naogaon",
    country: "Bangladesh",
    category: "Religious",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    price: 4500,
    currency: "BDT",
    rating: 4.9,
    reviewCount: 321,
    duration: {
      days: 3,
      nights: 2,
    },
  },
  {
    id: "4",
    title: "Bandarban Hill Tracts Expedition",
    description:
      "Adventure in the hills of Bandarban. Visit tribal villages, waterfalls, and enjoy panoramic mountain views.",
    location: "Bandarban, Bangladesh",
    city: "Bandarban",
    country: "Bangladesh",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    price: 11500,
    currency: "BDT",
    rating: 4.8,
    reviewCount: 243,
    duration: {
      days: 4,
      nights: 3,
    },
  },
];
