// ===============================Car Booking Types==============================

/**
 * Car search form data
 * Data submitted from car rental search form
 */
export interface CarSearchFormData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  driverAge: number;
}

/**
 * Car type enum
 * Different categories of rental cars
 */
export type CarType =
  | "Economy"
  | "Compact"
  | "Midsize"
  | "Standard"
  | "SUV"
  | "Luxury"
  | "Van";

/**
 * Car transmission type
 * Type of transmission available
 */
export type TransmissionType = "Automatic" | "Manual";

/**
 * Car feature interface
 * Features available in the rental car
 */
export interface CarFeature {
  id: string;
  name: string;
  icon: string;
}

/**
 * Car card data interface
 * Data displayed in car rental search results card
 */
export interface CarCardData {
  id: string;
  name: string;
  image: string;
  carType: CarType;
  transmission: TransmissionType;
  seats: number;
  luggage: number;
  features: CarFeature[];
  fuelPolicy: string;
  mileage: string;
  pricePerDay: number;
  totalPrice: number;
  currency: string;
  company: string;
  companyLogo: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
}

/**
 * Car filter state interface
 * Filter options for car rental search results
 */
export interface CarFilterState {
  priceRange: [number, number];
  carType: CarType[];
  transmission: TransmissionType[];
  seats: number[];
  company: string[];
  features: string[];
}
