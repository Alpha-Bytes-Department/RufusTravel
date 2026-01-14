import { Hotel } from '@/Types/Hotel/hotel';
import HotelCard from './HotelCard';


interface HotelListProps {
  hotels: Hotel[];
}

export default function HotelList({ hotels }: HotelListProps) {
  return (
    <main className="w-full md:w-3/4 space-y-4">
      {hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)
      )}
    </main>
  );
}