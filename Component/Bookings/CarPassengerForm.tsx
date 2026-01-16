"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CarPassengerInfo } from "@/Types/Booking/CarBooking.types";

// ===============================Interface==============================
interface CarPassengerFormProps {
  onSubmit: (data: CarPassengerInfo) => void;
  initialData?: Partial<CarPassengerInfo>;
}

// ===============================Component==============================
const CarPassengerForm = ({ onSubmit, initialData }: CarPassengerFormProps) => {
  // ===============================State==============================
  const [formData, setFormData] = useState<CarPassengerInfo>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CarPassengerInfo, string>>
  >({});

  // ===============================Handlers==============================
  /**
   * Handles input change
   */
  const handleChange = (field: keyof CarPassengerInfo, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Auto-submit when all fields are filled
    if (
      updatedData.firstName.trim() &&
      updatedData.lastName.trim() &&
      updatedData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.email) &&
      updatedData.phone.trim() &&
      /^\+?[\d\s-()]+$/.test(updatedData.phone)
    ) {
      onSubmit(updatedData);
    }
  };

  /**
   * Validates form data
   */
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CarPassengerInfo, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // ===============================Render==============================
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ===============================Header============================== */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Passenger Information
        </h2>
        <p className="text-sm text-gray-600">
          Please provide the driver&apos;s details
        </p>
      </div>

      {/* ===============================Form Fields============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <Label htmlFor="firstName" className="text-gray-700 font-medium">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Enter first name"
            className={`mt-1 ${
              errors.firstName ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <Label htmlFor="lastName" className="text-gray-700 font-medium">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Enter last name"
            className={`mt-1 ${
              errors.lastName ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
            className={`mt-1 ${
              errors.email ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-gray-700 font-medium">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 555-0100"
            className={`mt-1 ${
              errors.phone ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default CarPassengerForm;
