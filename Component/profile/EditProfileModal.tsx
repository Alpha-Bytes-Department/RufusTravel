"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import {
  EditProfileFormData,
  ProfileData,
} from "@/Types/Profile/Profile.types";

// ===============================Props Interface==============================
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onSave: (data: EditProfileFormData) => void;
}

// ===============================Component==============================
const EditProfileModal = ({
  isOpen,
  onClose,
  profileData,
  onSave,
}: EditProfileModalProps) => {
  // ===============================React Hook Form==============================
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      city: profileData.city,
      country: profileData.country,
      zipCode: profileData.zipCode,
    },
  });

  // ===============================Reset Form on Profile Change==============================
  useEffect(() => {
    reset({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      city: profileData.city,
      country: profileData.country,
      zipCode: profileData.zipCode,
    });
  }, [profileData, reset]);

  // ===============================Submit Handler==============================
  const onSubmit = async (data: EditProfileFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
    onSave(data);
    onClose();
  };

  // ===============================Close on Escape Key==============================
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ===============================Modal Header============================== */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* ===============================Modal Body============================== */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* ===============================Personal Information============================== */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+880 1234-567890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* ===============================Address Information============================== */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Address Information
              </h3>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 5,
                      message: "Address must be at least 5 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="House 123, Road 45, Mirpur"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* City and Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("city", {
                      required: "City is required",
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Dhaka"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Bangladesh"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="zipCode"
                  type="text"
                  {...register("zipCode", {
                    required: "Zip code is required",
                    pattern: {
                      value: /^[0-9]{4,6}$/,
                      message: "Invalid zip code (4-6 digits)",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="1230"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* ===============================Form Actions============================== */}
            <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileModal;
