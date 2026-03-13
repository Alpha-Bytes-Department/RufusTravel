"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type {
  SignInFormData,
  SignInProps,
  SignInErrors,
} from "@/Types/Auth/SignIn/Signin";

// ===============================Mock User Data==============================
const MOCK_USERS = [
  {
    id: "usr_001",
    email: "user@test.com",
    password: "password123",
    firstName: "Test",
    lastName: "User",
    phone: "+1234567890",
    role: "user",
  },
  {
    id: "usr_002",
    email: "admin@test.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    phone: "+1987654321",
    role: "admin",
  },
  {
    id: "usr_003",
    email: "demo@rufus.com",
    password: "demo123",
    firstName: "Demo",
    lastName: "User",
    phone: "+1122334455",
    role: "user",
  },
];

// ===============================Mock Token Generator==============================
const generateMockToken = (userId: string) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    }),
  );
  const signature = btoa(`mock-signature-${userId}-${Date.now()}`);
  return `${header}.${payload}.${signature}`;
};

const LoginForm: React.FC<SignInProps> = ({
  onSubmit,
  onGoogleSignIn,
  onFacebookSignIn,
  onForgotPassword,
  isLoading = false,
}) => {
  const router = useRouter();

  // ===============================Form State==============================
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<SignInErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================Input Change Handler==============================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //---------------------- Clear error on input change ----------------
    if (errors[name as keyof SignInErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ===============================Validation Function==============================
  const validateForm = (): boolean => {
    const newErrors: SignInErrors = {};

    //---------------------- Email validation ----------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    //---------------------- Password validation ----------------
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================Submit Handler==============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //---------------------- Validate form ----------------
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      //---------------------- Simulate network delay ----------------
      await new Promise((resolve) => setTimeout(resolve, 800));

      //---------------------- Check mock credentials ----------------
      const matchedUser = MOCK_USERS.find(
        (u) => u.email === formData.email && u.password === formData.password,
      );

      if (matchedUser) {
        //---------------------- Generate mock tokens ----------------
        const accessToken = generateMockToken(matchedUser.id);
        const refreshToken = generateMockToken(`refresh-${matchedUser.id}`);

        //---------------------- Build user object matching AuthProvider format ----------------
        const userData = {
          id: matchedUser.id,
          email: matchedUser.email,
          firstName: matchedUser.firstName,
          lastName: matchedUser.lastName,
          phone: matchedUser.phone,
          role: matchedUser.role,
        };

        //---------------------- Store tokens and user in localStorage ----------------
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));

        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        console.log("Login successful:", userData);

        //---------------------- Redirect to home page ----------------
        router.push("/");
      } else {
        //---------------------- Invalid credentials ----------------
        setErrors({
          general: "Invalid email or password. Please try again.",
        });
        console.log("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setErrors({
        general: "Sign in failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===============================Social Login Handlers==============================
  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked");
    if (onGoogleSignIn) {
      onGoogleSignIn();
    }
  };

  const handleFacebookSignIn = () => {
    console.log("Facebook Sign In clicked");
    if (onFacebookSignIn) {
      onFacebookSignIn();
    }
  };

  const handleForgotPasswordClick = () => {
    console.log("Forgot Password clicked");
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  // ===============================Render Component==============================
  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
      <h1 className="mb-6 font-bold text-2xl sm:text-3xl md:mb-8">Sign In</h1>

      {/* ===============================General Error Message============================== */}
      {errors.general && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-600 text-sm">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* ===============================Email Address Field============================== */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              className={`pl-9 sm:pl-10 ${
                errors.email ? "border-red-500" : ""
              }`}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* ===============================Password Field============================== */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 sm:size-5" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`pl-9 pr-10 sm:pl-10 ${
                errors.password ? "border-red-500" : ""
              }`}
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="size-4 sm:size-5" />
              ) : (
                <Eye className="size-4 sm:size-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        {/* ===============================Remember Me & Forgot Password============================== */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  rememberMe: checked as boolean,
                }))
              }
              disabled={isLoading}
            />
            <Label
              htmlFor="rememberMe"
              className="cursor-pointer font-normal text-sm"
            >
              Remember me
            </Label>
          </div>
          <button
            type="button"
            onClick={handleForgotPasswordClick}
            className="font-medium text-sm text-yellow-600 hover:underline"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* ===============================Demo Credentials Info============================== */}
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-xs sm:text-sm">
          <p className="mb-2 font-semibold text-yellow-800">
            Demo Credentials:
          </p>
          <div className="space-y-1 text-yellow-700">
            <p className="flex items-center gap-2">
              <Mail className="size-3 sm:size-4" /> user@test.com |
              <Lock className="size-3 sm:size-4" /> password123
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-3 sm:size-4" /> admin@test.com |
              <Lock className="size-3 sm:size-4" /> admin123
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-3 sm:size-4" /> demo@rufus.com |
              <Lock className="size-3 sm:size-4" /> demo123
            </p>
          </div>
        </div>

        {/* ===============================Sign In Button============================== */}
        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12"
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        {/* ===============================Divider============================== */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* ===============================Social Login Buttons============================== */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-lg border border-gray-300 text-sm sm:h-12 sm:text-base"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg className="mr-2 size-4 sm:size-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-lg border border-gray-300 text-sm sm:h-12 sm:text-base"
            onClick={handleFacebookSignIn}
            disabled={isLoading}
          >
            <svg
              className="mr-2 size-4 sm:size-5"
              fill="#1877F2"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>
        </div>

        {/* ===============================Sign Up Link============================== */}
        <p className="pt-2 text-center text-xs sm:pt-4 sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-yellow-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
