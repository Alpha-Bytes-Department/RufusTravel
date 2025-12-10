"use client";

import { Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "Absolutely amazing experience! The booking process was seamless and the customer service was top-notch. They helped me plan the perfect vacation to Paris. Highly recommend!",
    avatar: "/images/avatars/avatar1.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    text: "Best travel platform I've ever used. The deals are incredible and the variety of destinations is outstanding. Booked my honeymoon through them and it was perfect!",
    avatar: "/images/avatars/avatar2.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    text: "I travel frequently for work and pleasure, and this platform has become my go-to. The user interface is intuitive, prices are competitive, and their support team is always helpful.",
    avatar: "/images/avatars/avatar3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[80vw]">
        {/* ===============================Section Header============================== */}
        <div className="mb-12 gap-4 ">
          <div>
            <h2 className="mb-2 font-bold text-3xl text-gray-900 md:text-4xl lg:text-5xl">
              What Our Travelers Say
            </h2>
            <p className="text-gray-600 text-lg">
              Real experiences from real travelers
            </p>
          </div>
        </div>

        {/* ===============================Testimonials Grid============================== */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:border-yellow-500 hover:shadow-xl"
            >
              {/* ---Rating Stars--- */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              {/* ---Testimonial Text--- */}
              <p className="mb-6 text-gray-700 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* ---Customer Info--- */}
              <div className=" items-center gap-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-gray-600 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex justify-between pt-2">
            <div></div>
            <Link
              href={'/'}
              className="group  flex items-center gap-2 text-yellow-600 hover:text-yellow-700"
            >
              View All
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
