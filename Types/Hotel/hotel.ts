export interface Hotel {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  price: number;
  starRating?: number;
  amenities?: string[];
  accessibility?: string[];
  mealPlans?: string[];
  propertyType?: string;
  travelerExperience?: string[];
}
