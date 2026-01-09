// ===============================Tour Types==============================

/**
 * Tour category type
 * Represents different categories of tours available
 */
export type TourCategory =
  | "All"
  | "Adventure"
  | "Beach"
  | "Nature"
  | "Cultural"
  | "Hill Tracts"
  | "Wildlife"
  | "Religious"
  | "City Tours";

/**
 * Tour interface
 * Represents a complete tour/destination offering
 */
export interface Tour {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  country: string;
  category: TourCategory;
  image: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  duration: {
    days: number;
    nights: number;
  };
  features?: string[];
}

// ===============================Filter Types==============================

/**
 * Sort option type
 * Different ways to sort tour results
 */
export type SortOption =
  | "most-popular"
  | "price-low-high"
  | "price-high-low"
  | "rating"
  | "duration";

/**
 * Duration filter type
 * Different duration ranges for filtering tours
 */
export type DurationFilter = "1-days" | "2-3-days" | "4-6-days" | "1-week-plus";

/**
 * Star rating filter type
 * Different star rating thresholds for filtering
 */
export type StarRating = "4.5+" | "4+" | "3.5+" | "3+" | "2.5+";

/**
 * Filter state interface
 * Represents the complete state of all tour filters
 */
export interface TourFilterState {
  searchQuery: string;
  category: TourCategory;
  sortBy: SortOption;
  duration: DurationFilter[];
  starRating: StarRating[];
  priceRange: {
    min: number;
    max: number;
  };
}

// ===============================Pagination Types==============================

/**
 * Pagination state interface
 * Manages pagination state for tour results
 */
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
