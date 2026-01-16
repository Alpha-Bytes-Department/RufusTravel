// ===============================Hotel Booking Types==============================

/**
 * Hotel search form data
 * Data submitted from hotel search form
 */
export interface HotelSearchFormData {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  guests: {
    adults: number;
    children: number;
  };
}

/**
 * Hotel amenity interface
 * Represents available amenities in a hotel
 */
export interface HotelAmenity {
  id: string;
  name: string;
  icon: string;
}

/**
 * Hotel card data interface
 * Data displayed in hotel search results card
 */
export interface HotelCardData {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: {
    city: string;
    country: string;
    address: string;
  };
  amenities: HotelAmenity[];
  roomType: string;
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  availability: number;
  isFeatured: boolean;
  cancellationPolicy: "free" | "non-refundable" | "partial";
}

/**
 * Hotel filter state interface
 * Filter options for hotel search results
 */
export interface HotelFilterState {
  priceRange: [number, number];
  rating: number[];
  amenities: string[];
  propertyType: string[];
  cancellationPolicy: string[];
  mealPlan: string[];
}
