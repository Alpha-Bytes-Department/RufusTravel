import { Hotel } from '@/Types/Hotel/hotel';
import Image from 'next/image';
import { MdStar, MdLocationOn } from 'react-icons/md';


interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="bg-white border p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <Image
        src={hotel.image} 
        alt={hotel.name}
        width={200}
        height={150}
        className="object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold">{hotel.name}</h3>
        <div className="flex items-center">
          {Array(Math.floor(hotel.rating)).fill(0).map((_, i) => <MdStar key={i} className="text-yellow-400" />)}
          <span className="ml-2">{hotel.rating} ({hotel.reviews} Reviews)</span>
        </div>
        <p className="text-sm text-gray-600">{hotel.description}</p>
        <div className="flex items-center text-sm text-gray-600">
          <MdLocationOn className="mr-1" /> {hotel.location}
        </div>
        <button className="bg-yellow-400 text-white px-4 py-2 mt-2 rounded" onClick={() => console.log(`Selected ${hotel.name}`)}>
          Select
        </button>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">${hotel.price}</p>
        <p className="text-sm">1 room 1 night</p>
        <p className="text-sm">Taxes incl.</p>
        
      </div>
    </div>
  );
}