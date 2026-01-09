// ===============================Tour Detail Types==============================

/**
 * Tour highlight item
 * Represents a single highlight point of the tour
 */
export interface TourHighlight {
  id: string;
  text: string;
}

/**
 * Tour requirement item
 * Represents a single requirement for the tour
 */
export interface TourRequirement {
  id: string;
  text: string;
}

/**
 * Tour info card type
 * Types of information displayed in info cards
 */
export type TourInfoType = "duration" | "maxGroup" | "language" | "nextDate";

/**
 * Tour info card interface
 * Represents an information card in the tour detail
 */
export interface TourInfoCard {
  type: TourInfoType;
  label: string;
  value: string;
  icon?: string;
}

/**
 * Tour tab type
 * Different tabs available in tour detail view
 */
export type TourTab = "Overview" | "Itinerary" | "What's included" | "Reviews";

/**
 * Tour detail interface
 * Complete tour detail information
 */
export interface TourDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  country: string;
  category: string;
  images: string[];
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  duration: {
    days: number;
    nights: number;
    hours?: number;
  };
  maxGroup: number;
  languages: string[];
  nextDate: string;
  groupDiscount?: string;
  highlights: TourHighlight[];
  requirements: TourRequirement[];
  features?: string[];
}

/**
 * Booking form data interface
 * Data collected from booking form
 */
export interface BookingFormData {
  emailAddress: string;
  numberOfGuests: number;
  selectedDate: string;
}

/**
 * Customer support info interface
 * Information about customer support features
 */
export interface CustomerSupportInfo {
  freeCancellation: string;
  instantConfirmation: boolean;
  customerSupport: string;
}
