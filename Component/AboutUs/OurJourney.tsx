import {  CircleCheckBig } from "lucide-react";

const OurJourney = () => {
  // ===============================Milestones Data==============================
  const milestones = [
    {
      year: "2025",
      title: "Tripbank Founded",
      description: "Our journey begins with a vision to revolutionize travel",
    },
  ];

  return (
    <section className="bg-linear-to-br from-yellow-50 to-orange-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl">
        {/* ===============================Section Header============================== */}
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="mb-3 font-bold text-2xl text-gray-900 sm:text-3xl lg:text-4xl">
            Our Journey
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-base sm:text-lg">
            Key milestones in the Tripbank story
          </p>
        </div>

        {/* ===============================Timeline============================== */}
        <div className="flex flex-col  items-center">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="group relative w-full cursor-pointer max-w-xs rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl sm:p-10"
            >
              {/* ===============================Calendar Icon============================== */}
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-yellow-500 transition-transform group-hover:scale-110 sm:size-20">
                <CircleCheckBig className="size-8 text-white sm:size-10" />
              </div>

              {/* ===============================Year============================== */}
              <h3 className="mb-2 text-center font-bold text-3xl text-gray-900 sm:text-4xl">
                {milestone.year}
              </h3>

              {/* ===============================Title============================== */}
              <h4 className="mb-2 text-center font-semibold text-gray-900 text-lg sm:text-xl">
                {milestone.title}
              </h4>

              {/* ===============================Description============================== */}
              <p className="text-center text-gray-600 text-sm sm:text-base">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
