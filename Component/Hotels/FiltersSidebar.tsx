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
    <aside className="w-full lg:w-80 bg-white space-y-4 overflow-y-auto   ">
      <h2 className="text-xl font-bold text-gray-900 sticky top-0 bg-white z-10  ">
        Filter results
      </h2>

      {/* Hotel Name Search */}
      <div className="bg-linear-to-br from-[#FFC107] to-[#FFD54F] rounded-2xl p-3 shadow-md">
        <label className="block font-bold mb-4 text-gray-900">
          Search by hotel name
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="E.g. The Fullerton Hotel"
            className="w-full border-2 border-gray-300 rounded-xl bg-white mt-2 p-3 pl-10 focus:outline-none focus:border-[#D4A60A] transition-colors"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
          />
          <MdSearch className="absolute left-3 top-5 text-2xl text-gray-500" />
        </div>
      </div>

      <div className="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <label className="block bg-linear-to-r from-[#FFC107] to-[#FFD54F] px-4 py-3 font-bold text-gray-900">
          Price Range
        </label>
        <div className="space-y-3 p-4 bg-white">
          {["0-200", "200-500", "500-1000", "1000-2000", "2000+"].map(
            (range) => (
              <div key={range} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filters.priceRanges.includes(range)}
                  onChange={(e) =>
                    handleCheckboxChange("priceRanges", range, e.target.checked)
                  }
                  className="w-5 h-5 accent-[#22C55E] cursor-pointer"
                />
                <span className="text-gray-700">
                  ${range.replace("+", " - $5,000")}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      

      {/* Accessibility */}
      <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
        <label className="block font-bold mb-4 text-gray-900">
          Accessibility
        </label>
        <div className="space-y-3">
          {[
            "Lift",
            "Roll-in shower",
            "Accessible bathroom",
            "Stair-free path to entrance",
            "Wheelchair-accessible parking",
            "Service animals allowed",
            "Sign language-capable staff",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.accessibility.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange("accessibility", item, e.target.checked)
                }
                className="w-5 h-5 accent-[#22C55E] cursor-pointer"
              />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans */}
      <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
        <label className="block font-bold mb-4 text-gray-900">
          Meal plans available
        </label>
        <div className="space-y-3">
          {[
            "Breakfast included",
            "All-inclusive",
            "Full board",
            "Half board",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.mealPlans.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange("mealPlans", item, e.target.checked)
                }
                className="w-5 h-5 accent-[#22C55E] cursor-pointer"
              />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
        <label className="block font-bold mb-4 text-gray-900">
          Property Type
        </label>
        <div className="space-y-3">
          {["Hotel", "Bed & Breakfast", "Aparthotel"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.propertyTypes.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange("propertyTypes", item, e.target.checked)
                }
                className="w-5 h-5 accent-[#22C55E] cursor-pointer"
              />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traveller experience */}
      <div className="border-2 border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
        <label className="block font-bold mb-4 text-gray-900">
          Traveller experience
        </label>
        <div className="space-y-3">
          {["Luxury", "Adult only", "Budget", "Romantic"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={filters.travelerExperience.includes(item)}
                onChange={(e) =>
                  handleCheckboxChange(
                    "travelerExperience",
                    item,
                    e.target.checked
                  )
                }
                className="w-5 h-5 accent-[#22C55E] cursor-pointer"
              />
              <span className="text-gray-700">{item}</span>
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
          {[
            { icon: MdLocalAirport, label: "Airport shuttle" },
            { icon: MdSpa, label: "Spa" },
            { icon: MdPool, label: "Pool" },
            { icon: MdHotTub, label: "Hot tub" },
            { icon: MdRestaurant, label: "Restaurant" },
            { icon: MdFitnessCenter, label: "Gym" },
            { icon: MdAcUnit, label: "Air conditioned" },
            { icon: MdCasino, label: "Casino" },
            { icon: MdLocalBar, label: "Bar" },
            { icon: MdPets, label: "Pet-friendly" },
            { icon: MdHotel, label: "Outdoor space" },
            { icon: MdKitchen, label: "Kitchen" },
            { icon: MdGolfCourse, label: "Golf" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() =>
                handleCheckboxChange(
                  "amenities",
                  label,
                  !filters.amenities.includes(label)
                )
              }
              className={`flex flex-col items-center justify-center gap-2 border-2 rounded-xl p-4 transition-all ${
                filters.amenities.includes(label)
                  ? "border-[#D4A60A] bg-[#FFF9E6] text-[#D4A60A]"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#FFC107]"
              }`}
            >
              <Icon size={32} />
              <span className="text-xs font-medium text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
