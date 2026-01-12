// ===============================Flight Search State==============================
export interface FlightSearchState {
  tripType: "oneWay" | "roundTrip" | "multiWay";
  from: string;
  to: string;
  journeyDate: string;
  returnDate?: string;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  class: string;
  segments?: FlightSegment[];
}

export interface FlightSegment {
  from: string;
  to: string;
  date: string;
}

// ===============================Car Search State==============================
export interface CarSearchState {
  tripType: "oneWay" | "roundTrip";
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  carType?: string;
  transmission?: string;
}

// ===============================Hotel Search State==============================
export interface HotelSearchState {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  rooms: number;
}

// ===============================Tour Search State==============================
export interface TourSearchState {
  destination: string;
  journeyDate: string;
  guests: number;
  tourType: string;
}

// ===============================Tour Booking State==============================
export interface TourBookingState {
  tourId: string;
  tourTitle: string;
  tourImage: string;
  price: number;
  currency: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  numberOfGuests: number;
  journeyDate: string;
}

// ===============================Generic Search State==============================
export type SearchState =
  | FlightSearchState
  | CarSearchState
  | HotelSearchState
  | TourSearchState;
