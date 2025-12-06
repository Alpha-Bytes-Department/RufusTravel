"use client";
import Logo from '@/Component/Shared/Logo';
import  { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { FormData } from '@/Types/Auth/Forgot/forgot';
import { useRouter } from "next/navigation";


const Forgot = () => {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const navigation = useRouter();

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigation.push('/forgot/sent');
  };

  return (
    <div className="py-10 lg:py-14 min-h-screen px-5 md:px-20 lg:px-40 text-black">
      <div className="flex justify-center pb-8 lg:pb-14">
        <Logo textColor="text-black" />
      </div>
      <h1 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl">
        Forgot Your Password?
      </h1>
      <p className="text-center text-base font-normal lg:text-xl text-gray-600 pb-8">
        Enter your email and we’ll send you a reset link
      </p>
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
        <h1 className="mb-6 font-bold text-2xl sm:text-3xl md:mb-8">Reset Password</h1>

        {/* ===============================General Error Message============================== */}
        {generalError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-600 text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          {/* ===============================Email Address Field============================== */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className={`pl-9 sm:pl-10 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", { required: "Email is required" })}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* ===============================Send Reset Link Button============================== */}
          <Button
            type="submit"
            className="h-11 w-full rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
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
}

export default Forgot;
