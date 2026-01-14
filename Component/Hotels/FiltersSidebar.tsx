
import { MdSearch, MdMap,  MdRestaurant, MdHotel, MdStar, MdLocalAirport, MdSpa, MdPool, MdHotTub, MdFitnessCenter, MdAcUnit, MdCasino, MdLocalBar, MdPets, MdKitchen, MdGolfCourse } from 'react-icons/md';

interface FiltersSidebarProps {
  filters: {
    search: string;
    priceRanges: string[];
    accessibility: string[];
    mealPlans: string[];
    propertyTypes: string[];
    travelerExperience: string[];
    starRatings: number[];
    amenities: string[];
  };
  onFilterChange: (newFilters: FiltersSidebarProps['filters']) => void;
}

export default function FiltersSidebar({ filters, onFilterChange }: FiltersSidebarProps) {
  const handleCheckboxChange = (category: keyof typeof filters, value: string | number, checked: boolean) => {
    const updated = checked
      ? [...(filters[category] as any[]), value]
      : (filters[category] as any[]).filter(v => v !== value);
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <aside className="w-full md:w-1/4 bg-white p-4 border-r space-y-4">
      <h2 className="text-lg font-bold">Filter results</h2>

      {/* Hotel Name Search */}
      <div className='bg-yellow-400 rounded-xl p-6'>
        <label className="block">Search by hotel name</label>
        <div className="relative">
          <input 
            type="text"
            placeholder="E.g. The Fullerton Hotel"
            className="w-full border rounded-lg bg-white mt-2 p-2 pl-8"
            value={filters.search}
            onChange={e => onFilterChange({ ...filters, search: e.target.value })}
          />
          <MdSearch className="absolute left-2 top-5 text-2xl text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block bg-yellow-400 px-2 py-3 rounded-t-lg">Price Range</label>
        <div className="space-y-1">
          {['0-200', '200-500', '500-1000', '1000-2000', '2000+'].map(range => (
            <div key={range} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.priceRanges.includes(range)}
                onChange={e => handleCheckboxChange('priceRanges', range, e.target.checked)}
              />
              <span className="ml-2">${range.replace('+', ' - $5,000')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map View */}
      <button className="w-full bg-white border p-2 flex items-center justify-between">
        View on Map <MdMap />
      </button>

      {/* Accessibility */}
      <div>
        <label className="block">Accessibility</label>
        <div className="space-y-1">
          {['Lift', 'Roll-in shower', 'Accessible bathroom', 'Stair-free path to entrance', 'Wheelchair-accessible parking', 'Service animals allowed', 'Sign language-capable staff'].map(item => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.accessibility.includes(item)}
                onChange={e => handleCheckboxChange('accessibility', item, e.target.checked)}
              />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans */}
      <div>
        <label className="block">Meal plans available</label>
        <div className="space-y-1">
          {['Breakfast included', 'All-inclusive', 'Full board', 'Half board'].map(item => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.mealPlans.includes(item)}
                onChange={e => handleCheckboxChange('mealPlans', item, e.target.checked)}
              />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block">Property Type</label>
        <div className="space-y-1">
          {['Hotel', 'Bed & Breakfast', 'Apartment', 'Traveler experience', 'Luxury', 'Adult only', 'Budget', 'Romantic'].map(item => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.propertyTypes.includes(item)}
                onChange={e => handleCheckboxChange('propertyTypes', item, e.target.checked)}
              />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>


      <div>
        <label className="block">Star Rating</label>
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map(star => (
            <div key={star} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.starRatings.includes(star)}
                onChange={e => handleCheckboxChange('starRatings', star, e.target.checked)}
              />
              <span className="ml-2 flex">
                {Array(star).fill(0).map((_, i) => <MdStar key={i} className="text-yellow-400" />)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities - Icons */}
      <div>
        <label className="block">Amenities</label>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => handleCheckboxChange('amenities', 'Airport shuttle', !filters.amenities.includes('Airport shuttle'))} className="flex flex-col items-center">
            <MdLocalAirport size={24} />
            <span className="text-xs">Airport shuttle</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Spa', !filters.amenities.includes('Spa'))} className="flex flex-col items-center">
            <MdSpa size={24} />
            <span className="text-xs">Spa</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Pool', !filters.amenities.includes('Pool'))} className="flex flex-col items-center">
            <MdPool size={24} />
            <span className="text-xs">Pool</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Hot tub', !filters.amenities.includes('Hot tub'))} className="flex flex-col items-center">
            <MdHotTub size={24} />
            <span className="text-xs">Hot tub</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Restaurant', !filters.amenities.includes('Restaurant'))} className="flex flex-col items-center">
            <MdRestaurant size={24} />
            <span className="text-xs">Restaurant</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Gym', !filters.amenities.includes('Gym'))} className="flex flex-col items-center">
            <MdFitnessCenter size={24} />
            <span className="text-xs">Gym</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Air conditioned', !filters.amenities.includes('Air conditioned'))} className="flex flex-col items-center">
            <MdAcUnit size={24} />
            <span className="text-xs">Air conditioned</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Casino', !filters.amenities.includes('Casino'))} className="flex flex-col items-center">
            <MdCasino size={24} />
            <span className="text-xs">Casino</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Bar', !filters.amenities.includes('Bar'))} className="flex flex-col items-center">
            <MdLocalBar size={24} />
            <span className="text-xs">Bar</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Pet-friendly', !filters.amenities.includes('Pet-friendly'))} className="flex flex-col items-center">
            <MdPets size={24} />
            <span className="text-xs">Pet-friendly</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Outdoor space', !filters.amenities.includes('Outdoor space'))} className="flex flex-col items-center">
            <MdHotel size={24} /> {/* Placeholder */}
            <span className="text-xs">Outdoor space</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Kitchen', !filters.amenities.includes('Kitchen'))} className="flex flex-col items-center">
            <MdKitchen size={24} />
            <span className="text-xs">Kitchen</span>
          </button>
          <button onClick={() => handleCheckboxChange('amenities', 'Golf', !filters.amenities.includes('Golf'))} className="flex flex-col items-center">
            <MdGolfCourse size={24} />
            <span className="text-xs">Golf</span>
          </button>
        </div>
      </div>
    </aside>
  );
}