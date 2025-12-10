import { id } from "date-fns/locale";
import { Car, Hotel, MapPin, Plane, Sparkles, Wallet } from "lucide-react";

const Cards = () => {
  const content = [
    {
      id: 1,
      icon: <Plane />,
      title: "Flights",
      description: "Book flights to 500+ destinations worldwide",
    },
    {
      id: 2,
      icon: <Hotel />,
      title: "Hotels",
      description: "50,000+ hotels and resorts to choose from",
    },
    {
      id: 3,
      icon: <MapPin />,
      title: "Cars",
      description: "Rent a car for your perfect road trip",
    },
    {
      id: 4,
      icon: <Sparkles />,
      title: "Tours",
      description: "Guided tours and experiences everywhere",
    },
    {
      id: 5,
      icon: <Wallet />,
      title: "Lifestyle",
      description: "Premium experiences and luxury packages",
    },
    {
      id: 6,
      icon: <Plane />,
      title: "Wallet",
      description: "Secure payments and exclusive rewards",
    },
  ];
  return (
    <div
      className="mx-auto grid max-w-[80vw] py-8 lg:py-14 grid-cols-2 md:grid-cols-3
       gap-6  lg:grid-cols-6"
    >
      {content.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-linear-to-br from-yellow-50 to-yellow-100 px-3 py-8 text-center shadow-lg transition-transform hover:scale-105 "
        >
          <div className="mx-auto mb-4 flex size-14 text-yellow-800  items-center justify-center rounded-full bg-yellow-200 sm:size-16">
            {item.icon}
          </div>

          <h3 className="mb-4 font-semibold text-gray-900 text-lg sm:text-xl">
            {item.title}
          </h3>
          <p className="mb-3 text-gray-600 text-sm sm:text-base">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
