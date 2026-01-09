export interface CabinOption {
  name: string;
  description: string;
  price?: number;
}

export interface AddOn {
  name: string;
  description: string;
  price: number;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  rating: number;
  ratingLabel: string;
  reviews: number;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: string;
  aircraft: string;
  onTimePerformance: number;
  badge?: string;
  price: number;
  images: string[];
  cabins: CabinOption[];
  addons: AddOn[];
}


