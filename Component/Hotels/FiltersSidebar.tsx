import {
  MdSearch,
  MdMap,
  MdRestaurant,
  MdHotel,
  MdStar,
  MdLocalAirport,
  MdSpa,
  MdPool,
  MdHotTub,
  MdFitnessCenter,
  MdAcUnit,
  MdCasino,
  MdLocalBar,
  MdPets,
  MdKitchen,
  MdGolfCourse,
} from "react-icons/md";

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
  onFilterChange: (newFilters: FiltersSidebarProps["filters"]) => void;
}

export default function FiltersSidebar({
  filters,
  onFilterChange,
}: FiltersSidebarProps) {
  const handleCheckboxChange = (
    category: keyof typeof filters,
    value: string | number,
    checked: boolean
  ) => {
    const updated = checked
      ? [...(filters[category] as any[]), value]
      : (filters[category] as any[]).filter((v) => v !== value);
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <aside className="w-full md:w-1/4 bg-white p-4 border-r space-y-4">
      <h2 className="text-lg font-bold">Filter results</h2>

      {/* Hotel Name Search */}
      <div className="bg-yellow-400 rounded-xl p-6">
        <label className="block font-bold mb-4">Search by hotel name</label>
        <div className="relative">
          <input
            type="text"
            placeholder="E.g. The Fullerton Hotel"
            className="w-full border rounded-lg bg-white mt-2 p-2 pl-8"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
          />
          <MdSearch className="absolute left-2 top-5 text-2xl text-gray-500" />
        </div>
      </div>

      <div>
        <label className="block bg-yellow-400 px-2 py-3 rounded-t-lg">
          Price Range
        </label>
        <div className="space-y-1 border p-2">
          {["0-200", "200-500", "500-1000", "1000-2000", "2000+"].map(
            (range) => (
              <div key={range} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(range)}
                  onChange={(e) =>
                    handleCheckboxChange("priceRanges", range, e.target.checked)
                  }
                />
                <span className="ml-2">${range.replace("+", " - $5,000")}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Map View */}
      <button className="w-full bg-white border p-2 flex items-center justify-between">
        View on Map <MdMap />
      </button>

      {/* Accessibility */}
      <div className="border p-2 rounded-lg">
        <label className="block font-bold mb-4">Accessibility</label>
        <div className="space-y-1">
          {[
            "Lift",
            "Roll-in shower",
            "Accessible bathroom",
            "Stair-free path to entrance",
            "Wheelchair-accessible parking",
            "Service animals allowed",
            "Sign language-capable staff",
          ].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.accessibility.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange("accessibility", item, e.target.checked)
                }
              />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans */}
      <div className="border p-2 rounded-lg">
        <label className="block font-bold mb-4">Meal plans available</label>
        <div className="space-y-1">
          {[
            "Breakfast included",
            "All-inclusive",
            "Full board",
            "Half board",
          ].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.mealPlans.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange("mealPlans", item, e.target.checked)
                }
              />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="border p-2 rounded-lg">
        <label className="block font-bold mb-4">Property Type</label>
        <div className="space-y-1">
          {["Hotel", "Bed & Breakfast", "Aparthotel"].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.propertyTypes.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange("propertyTypes", item, e.target.checked)
                }
              />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traveller experiecce */}
      <div className="border p-2 rounded-lg">
        <label className="block font-bold">Traveller experiecce</label>
        <div className="space-y-1">
          {["Luxury", "Adult only", "Budget", "Romantic"].map((item) => (
            <div key={item} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.propertyTypes.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange("propertyTypes", item, e.target.checked)
                }
              />
              <span className="ml-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Star rating */}
      <div className="border rounded-2xl p-4 shadow-sm bg-white">
        <div className="flex justify-between mb-3">
          <h3 className="font-semibold text-lg">Star rating</h3>
          <span className="font-semibold text-lg">From</span>
        </div>

        <div className="space-y-3">
          {[
            { label: "5 stars", price: "$31" },
            { label: "4 stars", price: "$19" },
            { label: "3 stars", price: "$13" },
            { label: "2 stars", price: "$10" },
            { label: "1 stars", price: "$8" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-md accent-black"
                  checked={filters.propertyTypes.includes(item.label)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "propertyTypes",
                      item.label,
                      e.target.checked
                    )
                  }
                />
                <span className="text-base text-gray-700">{item.label}</span>
              </div>

              {/* Right side */}
              <span className="text-base text-gray-700">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

 
      {/* Amenities - Icons */}
      <div>
        <label className="block font-bold mt-4 mb-10">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Airport shuttle",
                !filters.amenities.includes("Airport shuttle")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdLocalAirport size={32} />
            <span className="text-xs">Airport shuttle</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Spa",
                !filters.amenities.includes("Spa")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdSpa size={32} />
            <span className="text-xs">Spa</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Pool",
                !filters.amenities.includes("Pool")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdPool size={32} />
            <span className="text-xs">Pool</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Hot tub",
                !filters.amenities.includes("Hot tub")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdHotTub size={32} />
            <span className="text-xs">Hot tub</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Restaurant",
                !filters.amenities.includes("Restaurant")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdRestaurant size={32} />
            <span className="text-xs">Restaurant</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Gym",
                !filters.amenities.includes("Gym")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdFitnessCenter size={32} />
            <span className="text-xs">Gym</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Air conditioned",
                !filters.amenities.includes("Air conditioned")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdAcUnit size={32} />
            <span className="text-xs">Air conditioned</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Casino",
                !filters.amenities.includes("Casino")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdCasino size={32} />
            <span className="text-xs">Casino</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Bar",
                !filters.amenities.includes("Bar")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdLocalBar size={32} />
            <span className="text-xs">Bar</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Pet-friendly",
                !filters.amenities.includes("Pet-friendly")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdPets size={32} />
            <span className="text-xs">Pet-friendly</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Outdoor space",
                !filters.amenities.includes("Outdoor space")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdHotel size={32} /> {/* Placeholder */}
            <span className="text-xs">Outdoor space</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Kitchen",
                !filters.amenities.includes("Kitchen")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdKitchen size={32} />
            <span className="text-xs">Kitchen</span>
          </button>
          <button
            onClick={() =>
              handleCheckboxChange(
                "amenities",
                "Golf",
                !filters.amenities.includes("Golf")
              )
            }
            className="flex flex-col items-center border p-6"
          >
            <MdGolfCourse size={32} />
            <span className="text-xs">Golf</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
