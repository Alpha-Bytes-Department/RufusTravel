"use client";

import React from "react";
import { useAuth } from "@/Providers/AuthProvider";
import { Button } from "@/components/ui/button";

// ===============================Example Usage Component==============================

export const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  //---------------------- Loading state ----------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  //---------------------- Not authenticated state ----------------
  if (!isAuthenticated || !user) {
    return (
      <div className="p-4">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  //---------------------- Authenticated state ----------------
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-bold text-xl">User Profile</h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {user.firstName}{" "}
          {user.lastName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        {user.phone && (
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
        )}
        {user.role && (
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        )}
      </div>

      <Button onClick={logout} className="mt-6" variant="outline">
        Logout
      </Button>
    </div>
  );
};
