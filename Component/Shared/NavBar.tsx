"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Heart, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ===============================Navigation Links==============================
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // ===============================Check Active Link==============================
  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  // ===============================Toggle Mobile Menu==============================
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ===============================Close Mobile Menu==============================
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* ===============================Logo Section============================== */}
          <div className="shrink-0">
            <Link href="/" onClick={closeMobileMenu}>
              <Logo textColor="text-gray-900" />
            </Link>
          </div>

          {/* ===============================Desktop Navigation Links============================== */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-base transition-colors hover:text-yellow-600 ${
                  isActiveLink(link.href) ? "text-yellow-600" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ===============================Desktop Actions============================== */}
          <div className="hidden items-center gap-4 md:flex">
            {/* ===============================Favorites Icon============================== */}
            <Link
              href="/favorites"
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              aria-label="Favorites"
            >
              <Heart className="size-5 text-gray-700" />
            </Link>

            {/* ===============================Bookings Icon============================== */}
            <Link
              href="/bookings"
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              aria-label="Bookings"
            >
              <Calendar className="size-5 text-gray-700" />
            </Link>

            {/* ===============================Login Button============================== */}
            <Link href="/signin">
              <Button
                variant="outline"
                className="h-10 rounded-full border-yellow-500 px-6 text-yellow-600 hover:bg-yellow-50"
              >
                Login
              </Button>
            </Link>

            {/* ===============================Sign Up Button============================== */}
            <Link href="/signup">
              <Button className="h-10 rounded-full bg-yellow-500 px-6 text-gray-900 hover:bg-yellow-600">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* ===============================Mobile Menu Button============================== */}
          <button
            onClick={toggleMobileMenu}
            className="flex size-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* ===============================Mobile Menu Overlay============================== */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-gray-700 opacity-80 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* ===============================Mobile Menu============================== */}
      <div
        className={`fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4">
          {/* ===============================Mobile Navigation Links============================== */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block rounded-lg px-4 py-3 font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? "bg-yellow-50 text-yellow-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ===============================Divider============================== */}
          <div className="my-4 border-t border-gray-200" />

          {/* ===============================Mobile Quick Actions============================== */}
          <div className="space-y-2">
            <Link
              href="/favorites"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Heart className="size-5" />
              <span className="font-medium">Favorites</span>
            </Link>
            <Link
              href="/bookings"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Calendar className="size-5" />
              <span className="font-medium">My Bookings</span>
            </Link>
          </div>

          {/* ===============================Mobile Auth Buttons============================== */}
          <div className=" space-y-3 pt-4">
            <Link href="/signin" onClick={closeMobileMenu}>
              <Button
                variant="outline"
                className="h-11 w-full rounded-lg border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup" onClick={closeMobileMenu}>
              <Button className="h-11 mt-2 w-full rounded-lg bg-yellow-500 text-gray-900 hover:bg-yellow-600">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
