"use client";

import React, { type ReactNode } from "react";
import { AxiosProvider } from "./AxiosProvider";
import { AuthProvider } from "./AuthProvider";

// ===============================Combined Providers Component==============================

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AxiosProvider>
      <AuthProvider>{children}</AuthProvider>
    </AxiosProvider>
  );
};
