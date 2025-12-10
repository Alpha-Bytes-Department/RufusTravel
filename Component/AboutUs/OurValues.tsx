"use client";

import React from "react";
import { Shield, Users, Globe, DollarSign, Lightbulb, Zap } from "lucide-react";

const OurValues = () => {
  // ===============================Values Data==============================
  const values = [
    {
      icon: Users,
      title: "Customer First",
      description:
        "Your satisfaction is our top priority. We go above and beyond to ensure every step is seamless.",
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Your data and payments are secured with industry-leading encryption and security measures.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Access to 500+ destinations worldwide with local expertise and international standards.",
    },
    {
      icon: DollarSign,
      title: "Best Value",
      description:
        "We guarantee the best prices with our price-match promise and exclusive member deals.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Cutting-edge AI technology to personalize your travel experience and provide smart recommendations.",
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description:
        "Book in minutes with our streamlined booking process and instant confirmation for peace of mind.",
    },
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[80vw]">
        {/* ===============================Section Header============================== */}
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="mb-3 font-bold text-2xl text-gray-900 sm:text-3xl lg:text-4xl">
            Our Values
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-base sm:text-lg">
            The principles that guide everything we do
          </p>
        </div>

        {/* ===============================Values Grid============================== */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg sm:p-8"
              >
                {/* ===============================Icon============================== */}
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-yellow-100 transition-colors group-hover:bg-yellow-500 sm:size-14">
                  <IconComponent className="size-6 text-yellow-600 transition-colors group-hover:text-white sm:size-7" />
                </div>

                {/* ===============================Title============================== */}
                <h3 className="mb-3 font-semibold text-gray-900 text-lg sm:text-xl">
                  {value.title}
                </h3>

                {/* ===============================Description============================== */}
                <p className="leading-relaxed text-gray-600 text-sm sm:text-base">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
