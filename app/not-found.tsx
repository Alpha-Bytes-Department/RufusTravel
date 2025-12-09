import Link from "next/link";
import notFoundImage from "@/public/404NotFound.webp";

const NotFound = () => {
  return (
    <div
      className="flex h-[80vh] items-center justify-center  bg-cover bg-center "
      style={{
        backgroundImage: `url(${notFoundImage.src})`,
        backgroundRepeat: "no-repeat", // Ensure the image doesn't repeat
        backgroundSize: "fit", // Make the image cover the entire container
        backgroundPosition: "center center", // Center the image
      }}
    >
      <div className="bg-white/70 p-8 rounded-lg shadow-lg text-center"></div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404 - Page Not Found</h1>
        <p className="text-lg mb-6 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
   
  );
};

export default NotFound;
