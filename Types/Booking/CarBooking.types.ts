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

/**
 * Payment method type
 * Available payment methods for car booking
 */
export type PaymentMethodType =
  | "PayPal"
  | "Stripe"
  | "Paystack"
  | "Coinbase Commerce";

/**
 * Passenger information interface
 * Customer details for car rental booking
 */
export interface CarPassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/**
 * Car booking data interface
 * Complete booking information for car rental
 */
export interface CarBookingData {
  id: string;
  bookingReference: string;
  car: CarCardData;
  passenger: CarPassengerInfo;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  subtotal: number;
  taxes: number;
  fees: number;
  total: number;
  currency: string;
  paymentMethod?: PaymentMethodType;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

/**
 * Car bill summary interface
 * Breakdown of costs for car rental
 */
export interface CarBillSummary {
  baseFare: number;
  taxAmount: number;
  vatAmount: number;
  otherCharges: number;
  total: number;
  currency: string;
}
