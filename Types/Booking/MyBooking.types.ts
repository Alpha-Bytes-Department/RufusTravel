// ===============================My Bookings Types==============================

/**
 * Booking status type
 * Represents the current status of a booking
 */
export type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

/**
 * Booking type enum
 * Different types of bookings available
 */
export type BookingType = "flight" | "hotel" | "trip";

// ===============================Flight Booking==============================

/**
 * Flight booking interface
 * Represents a flight booking with all relevant details
 */
export interface FlightBooking {
  id: string;
  type: "flight";
  bookingReference: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  departureCode: string;
  arrivalCity: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  duration: string;
  class: string;
  passengers: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  bookingDate: string;
}

// ===============================Hotel Booking==============================

/**
 * Hotel amenity interface
 * Represents an amenity available at the hotel
 */
export interface HotelAmenity {
  icon: string;
  label: string;
}

/**
 * Hotel booking interface
 * Represents a hotel booking with all relevant details
 */
export interface HotelBooking {
  id: string;
  type: "hotel";
  bookingReference: string;
  hotelName: string;
  rating: number;
  location: string;
  city: string;
  country: string;
  amenities: HotelAmenity[];
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  checkOutTime: string;
  roomType: string;
  guests: number;
  view: string;
  parking: number;
  totalPrice: number;
  pricePerNight: number;
  currency: string;
  status: BookingStatus;
  bookingDate: string;
}

// ===============================Trip Booking==============================

/**
 * Trip inclusion interface
 * Represents what's included in the trip package
 */
export interface TripInclusion {
  icon: string;
  label: string;
}

/**
 * Trip booking interface
 * Represents a tour/trip booking with all relevant details
 */
export interface TripBooking {
  id: string;
  type: "trip";
  bookingReference: string;
  tripName: string;
  rating: number;
  location: string;
  city: string;
  country: string;
  inclusions: TripInclusion[];
  duration: number;
  groupSize: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  pricePerPerson: number;
  currency: string;
  status: BookingStatus;
  bookingDate: string;
}

// ===============================Combined Booking Type==============================

/**
 * Union type for all booking types
 * Can be used when handling any type of booking
 */
export type Booking = FlightBooking | HotelBooking | TripBooking;

/**
 * Booking statistics interface
 * Summary statistics for all bookings
 */
export interface BookingStatistics {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  completedBookings: number;
}
