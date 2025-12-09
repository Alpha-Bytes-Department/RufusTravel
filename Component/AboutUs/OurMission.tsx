import { Award } from "lucide-react";

const OurMission = () => {
  return (
    <section className="bg-linear-to-br from-yellow-50 to-orange-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 font-bold text-2xl text-gray-900 sm:text-3xl lg:text-4xl">
          Our Mission
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700 text-base sm:text-lg lg:text-xl">
          At Tripbank, we believe that travel should be accessible to everyone.
          Our mission is to empower travelers worldwide with the tools,
          technology, and support they need to explore the world confidently and
          affordably. We're not just a booking platform — we're your trusted
          travel companion.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md sm:px-6 sm:py-3">
          <Award className="size-5 text-yellow-600 sm:size-6" />
          <span className="font-medium text-gray-800 text-sm sm:text-base">
            Award-Winning Travel Platform 2025
          </span>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
