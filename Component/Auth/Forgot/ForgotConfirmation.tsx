"use client";
import Logo from '@/Component/Shared/Logo';
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import {ResetFormData as FormData} from '@/Types/Auth/Forgot/forgot';


const ForgotConfirmation = () => {
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
    const navigation = useRouter();

    const onSubmit = async (data: FormData) => {
        console.log(data);
        // Add any additional logic here, e.g., API call
        navigation.push('/signin'); // Example navigation after reset
    };

    return (
      <div className="py-10 lg:py-14 min-h-screen px-5 md:px-20 lg:px-40 text-black">
        <div className="flex justify-center pb-8 lg:pb-14">
          <Logo textColor="text-black" />
        </div>
        <h1 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl">
          Reset Your Password
        </h1>
        <p className="text-center text-base font-normal lg:text-xl text-gray-600 pb-8">
          Enter your new password below
        </p>
        <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
          <h1 className="mb-6 font-bold text-2xl sm:text-3xl md:mb-8">
            Forgot Password 
          </h1>

          {/* ===============================General Error Message============================== */}
          {generalError && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-600 text-sm">
              {generalError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-5"
          >
            {/* ===============================Password Field============================== */}
            <div className="space-y-2">
              <Label htmlFor="password"> Create password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`pl-3 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ===============================Confirm Password Field============================== */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Re-write Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`pl-3 pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value, { password }) =>
                      value === password || "Passwords do not match",
                  })}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* ===============================Reset Password Button============================== */}
            <Button
              type="submit"
              className="h-11 w-full rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>

            {/* ===============================Back to Sign In Link============================== */}
            <p className="pt-2 text-center text-xs sm:pt-4 sm:text-sm">
              Remember your password?{" "}
              <Link
                href="/signin"
                className="font-semibold text-yellow-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
};

export default ForgotConfirmation;