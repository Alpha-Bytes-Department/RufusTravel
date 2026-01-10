// ===============================Booking Types==============================

/**
 * Optional add-on item
 * Represents an optional service that can be added to booking
 */
export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

/**
 * Payment method type
 * Available payment methods
 */
export type PaymentMethod = "paypal" | "stripe" | "paystack" | "coinbase";

/**
 * Payment method option interface
 * Details for each payment method
 */
export interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  icon: string;
}

/**
 * Booking step type
 * Different steps in the booking flow
 */
export type BookingStep = "details" | "addons" | "payment" | "success";

/**
 * Booking form data
 * Data collected throughout the booking process
 */
export interface BookingFormData {
  tourId: string;
  journeyDate: string;
  numberOfGuests: number;
  selectedAddOns: string[];
  paymentMethod: PaymentMethod | null;
  promoCode?: string;
}

/**
 * Booking summary data
 * Summary of booking for display
 */
export interface BookingSummary {
  tourTitle: string;
  tourImage: string;
  journeyDate: string;
  numberOfGuests: number;
  tourPrice: number;
  addOnsTotal: number;
  discount: number;
  subtotal: number;
  total: number;
  currency: string;
}

/**
 * Stepper item interface
 * Individual step in the stepper
 */
export interface StepperItem {
  step: number;
  title: string;
  status: "completed" | "current" | "upcoming";
}
