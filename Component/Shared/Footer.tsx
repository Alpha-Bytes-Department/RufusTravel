"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  // ===============================Newsletter Subscription Handler==============================
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Newsletter subscription:", email);
    // TODO: Implement newsletter subscription API call
  };

  return (
    <footer className="bg-[#3A3A3A] text-white">
      {/* ===============================Main Footer Content============================== */}
      <div className="mx-auto max-w-[80vw] px-4 py-4 lg:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* ===============================Brand Section============================== */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Logo textColor="text-white" />
            <p className="max-w-xs text-sm leading-relaxed text-gray-300">
              Your trusted travel companion for unforgettable journeys around
              the world.
            </p>

            {/* ===============================Social Media Links============================== */}
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                aria-label="Facebook"
              >
                <Facebook className="size-5 text-gray-800" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                aria-label="Twitter"
              >
                <Twitter className="size-5 text-gray-800" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                aria-label="Instagram"
              >
                <Instagram className="size-5 text-gray-800" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5 text-gray-800" />
              </Link>
            </div>
          </div>

          {/* ===============================Quick Links Section============================== */}
          <div>
            <h3 className="mb-4 font-semibold text-base sm:text-lg">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/destinations"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* ===============================Our Services Section============================== */}
          <div>
            <h3 className="mb-4 font-semibold text-base sm:text-lg">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/flights"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  Flight Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/hotels"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  Hotel Reservations
                </Link>
              </li>
              <li>
                <Link
                  href="/car-rentals"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  Car Rentals
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  Guided Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/insurance"
                  className="text-gray-300 transition-colors hover:text-yellow-500"
                >
                  Travel Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* ===============================Newsletter Section============================== */}
          <div>
            <h3 className="mb-4 font-semibold text-base sm:text-lg">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-300">
              Subscribe to get special offers and travel tips.
            </p>

            {/* ===============================Newsletter Form============================== */}
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                className="h-10 border-gray-600 bg-gray-700 text-white placeholder:text-gray-400 focus:border-yellow-500"
                required
              />
              <Button
                type="submit"
                className="h-10 w-full rounded-lg bg-yellow-500 text-gray-900 hover:bg-yellow-600"
              >
                Subscribe
              </Button>
            </form>

            {/* ===============================Contact Information============================== */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="size-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="size-4" />
                <span>support@tripbank.io</span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="size-4 mt-0.5" />
                <span>123 Travel St, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===============================Footer Bottom============================== */}
      <div className="border-t border-gray-700">
        <div className="mx-auto max-w-[80vw] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-gray-400 sm:text-left">
              © 2025 Tripbank. All rights reserved.
            </p>

            {/* ===============================Legal Links============================== */}
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:gap-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 transition-colors hover:text-yellow-500"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-400 transition-colors hover:text-yellow-500"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-gray-400 transition-colors hover:text-yellow-500"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
