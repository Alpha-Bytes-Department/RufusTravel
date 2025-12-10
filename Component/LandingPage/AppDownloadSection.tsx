"use client";

import React from "react";
import Image from "next/image";
import { Apple, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Mobile from "@/public/Mobile.png";

const AppDownloadSection = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      {/* ===============================Decorative Circles============================== */}
      {/* Yellow circle - top left behind phone */}
      <div className="absolute top-1/4 left-[5%] size-48 rounded-full bg-yellow-300 opacity-40 blur-3xl sm:size-64 lg:left-[15%] lg:size-80"></div>

      {/* Yellow circle - bottom left */}
      <div className="absolute bottom-10 left-[10%] size-32 rounded-full bg-yellow-400 opacity-50 sm:size-40 lg:bottom-20 lg:left-[8%]"></div>

      {/* Yellow circle - middle right */}
      <div className="absolute top-1/3 right-[15%] size-24 rounded-full bg-yellow-300 opacity-40 sm:size-32 lg:right-[25%] lg:size-40"></div>

      {/* Gray circles - background */}
      <div className="absolute top-10 right-[5%] size-20 rounded-full bg-gray-300 opacity-30 sm:size-28 lg:top-16 lg:right-[10%]"></div>
      <div className="absolute bottom-1/4 right-[8%] size-24 rounded-full bg-gray-200 opacity-30 sm:size-32 lg:bottom-1/3"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
          {/* ===============================Phone Mockup============================== */}
          <div className="relative z-10 flex w-full flex-1 justify-center lg:justify-start">
            <div className="relative">
              {/* Yellow glow behind phone */}
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-yellow-200 opacity-30 blur-3xl"></div>

              <Image
                src={Mobile}
                alt="TripBank Mobile App"
                width={280}
                height={560}
                className="h-auto w-[280px] drop-shadow-2xl sm:w-[320px] lg:w-[350px]"
                priority
              />
            </div>
          </div>

          {/* ===============================Content============================== */}
          <div className="relative z-10 flex-1 text-center lg:text-left">
            {/* ---Heading--- */}
            <h2 className="mb-4 font-bold text-3xl text-gray-900 sm:text-4xl lg:mb-6 lg:text-5xl">
              Download App & Get The Voucher!
            </h2>

            {/* ---Subheading--- */}
            <p className="mb-6 text-base text-gray-600 sm:text-lg lg:mb-8 lg:text-xl">
              Get <span className="font-bold text-gray-900">30% off</span> for
              first transaction using{" "}
              <span className="font-semibold">TripBank mobile app</span> for
              now.
            </p>

            {/* ---App Store Buttons--- */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start lg:gap-4">
              {/* ---Apple App Store--- */}
              <Button
                variant="outline"
                className="flex h-auto items-center justify-center gap-3 rounded-lg bg-black px-5 py-3 text-white transition-all hover:bg-gray-800 sm:px-6"
              >
                <Apple className="size-7 fill-white sm:size-8" />
                <div className="text-left">
                  <p className="text-[10px] leading-tight sm:text-xs">
                    Download on the
                  </p>
                  <p className="font-semibold text-sm leading-tight sm:text-base">
                    App Store
                  </p>
                </div>
              </Button>

              {/* ---Google Play Store--- */}
              <Button
                variant="outline"
                className="flex h-auto items-center justify-center gap-3 rounded-lg bg-black px-5 py-3 text-white transition-all hover:bg-gray-800 sm:px-6"
              >
                <Play className="size-7 fill-white sm:size-8" />
                <div className="text-left">
                  <p className="text-[10px] leading-tight sm:text-xs">
                    Get it on
                  </p>
                  <p className="font-semibold text-sm leading-tight sm:text-base">
                    Play Store
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
