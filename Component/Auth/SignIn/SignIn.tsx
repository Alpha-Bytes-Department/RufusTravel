"use client";

import Logo from "@/Component/Shared/Logo";
import React from "react";
import LoginForm from "./LoginForm";
import { useAuth } from "@/Providers/AuthProvider";
import { useRouter } from "next/navigation";
import type { SignInFormData } from "@/Types/Auth/SignIn/Signin";

const SignIn = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  // ===============================Handle Sign In==============================
  const handleSignIn = async (data: SignInFormData) => {
    try {
      console.log("Attempting sign in with:", {
        email: data.email,
        rememberMe: data.rememberMe,
      });

      //---------------------- Call login from auth provider ----------------
      await login(data.email, data.password);

      //---------------------- Redirect on success ----------------
      console.log("Sign in successful, redirecting to dashboard...");
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error; // Let LoginForm handle the error display
    }
  };

  // ===============================Handle Social Logins==============================
  const handleGoogleSignIn = async () => {
    console.log("Google OAuth sign in initiated");
    // TODO: Implement Google OAuth flow
    alert("Google Sign In - To be implemented");
  };

  const handleFacebookSignIn = async () => {
    console.log("Facebook OAuth sign in initiated");
    // TODO: Implement Facebook OAuth flow
    alert("Facebook Sign In - To be implemented");
  };

  const handleForgotPassword = () => {
    console.log("Navigate to forgot password");
    router.push("/forgot");
  };

  // ===============================Render Component==============================
  return (
    <div className="py-10 lg:py-14 min-h-screen px-5 md:px-20 lg:px-40 text-black">
      <div className="flex justify-center pb-8 lg:pb-14">
        <Logo textColor="text-black" />
      </div>
      <h1 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl">
        Welcome Back
      </h1>
      <p className="text-center text-base font-normal lg:text-xl text-gray-600 pb-8">
        Unlock trips, Memories, and Moments with Tripbank. Sign-In to begin
      </p>
      <LoginForm
        onSubmit={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onFacebookSignIn={handleFacebookSignIn}
        onForgotPassword={handleForgotPassword}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SignIn;
