import BannerImage from "@/public/bannerBackground.webp";
import { id } from "date-fns/locale";
import { Phone, Mail, MapPin } from "lucide-react";

const Banner = ({ page }: { page: String }) => {
  const contactUscontent = [
    {
      id: 1,
      icon: <Phone />,
      title: "Phone Support",
      description: "Available 24/7 for your convenience",
      contact: "+1 (555) 123-4567",
    },
    {
      id: 2,
      icon: <Mail />,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      contact: "support@tripbank.io",
    },
    {
      id: 3,
      icon: <MapPin />,
      title: "Visit Us",
      description: "Stop by our headquarters",
      contact: "123 Travel St, NY 10001",
    },
  ];
  const aboutUscontent = [
    {
      id: 1,
      title: "5M+",
      description: "Happy Travelers Worldwide",
    },
    {
      id: 2,
      title: "500+",
      description: "Destinations Covered",
    },
    { id: 3, title: "50k+", description: "Hotels & Tours" },

    {
      id: 4,
      title: "24/7",
      description: "Customer Support",
    },
  ];
  return (
    <div className="">
      {/* ===============================Banner Background Section============================== */}
      <div
        className=" flex h-[60vh] items-center justify-center  bg-cover bg-center "
        style={{
          backgroundImage: `url(${BannerImage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* ===============================Banner Content============================== */}
        <div className=" px-4 text-center text-white">
          <h1 className="mb-3 font-bold text-3xl text-white sm:text-4xl md:mb-4 md:text-5xl lg:text-6xl">
            {page === "about" ? "About Tripbank" : "Contact Us"}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-100 sm:text-lg md:text-xl">
            {page === "about"
              ? "Have questions? We're to help you plan your perfect journey"
              : "Making travel accessible, affordable, and unforgettable for everyone"}
          </p>
        </div>
      </div>

      <div>
        {page === "contact" && (
          <div className="mx-auto grid max-w-[80vw] py-8 lg:py-14 grid-cols-1 px-10 lg:px-8 gap-4 sm:gap-6 md:grid-cols-3">
            {contactUscontent.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-linear-to-br from-yellow-50 to-yellow-300 p-6 text-center shadow-lg transition-transform hover:scale-105 sm:p-8"
              >
                <div className="mx-auto mb-4 flex size-14 text-yellow-800 items-center justify-center rounded-full bg-yellow-100 sm:size-16">
                  {item.icon}
                </div>

                <h3 className="mb-2 font-semibold text-gray-900 text-lg sm:text-xl">
                  {item.title}
                </h3>
                <p className="mb-3 text-gray-600 text-sm sm:text-base">
                  {item.description}
                </p>
                <a
                  href="tel:+15551234567"
                  className="font-medium text-yellow-900 text-sm hover:text-yellow-700 sm:text-base"
                >
                  {item.contact}
                </a>
              </div>
            ))}
          </div>
        )}
        {page === "about" && (
          <div className=" mx-auto max-w-[80vw] px-5 py-8 lg:py-16 lg:px-0 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {aboutUscontent.map((item) => (
              <div key={item.id} className=" text-center">
                <h2 className="md:text-4xl text-xl font-bold text-yellow-900">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Banner;
