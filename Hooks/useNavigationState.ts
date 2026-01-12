"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// ===============================Types==============================
type NavigationState = Record<string, any>;

interface NavigationHook {
  navigateWithState: (path: string, state: NavigationState) => void;
  getState: <T = NavigationState>() => T | null;
  clearState: () => void;
}

// ===============================Custom Hook==============================
export const useNavigationState = (): NavigationHook => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [navigationState, setNavigationState] =
    useState<NavigationState | null>(null);

  // ===============================Navigate with State==============================
  const navigateWithState = (path: string, state: NavigationState) => {
    // Generate unique navigation ID
    const navId = `nav_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Store state in sessionStorage with unique key
    sessionStorage.setItem(navId, JSON.stringify(state));

    // Navigate with navId as query parameter
    router.push(`${path}?navId=${navId}`);
  };

  // ===============================Get State on Mount==============================
  useEffect(() => {
    const navId = searchParams.get("navId");

    if (navId) {
      // Retrieve state from sessionStorage
      const storedState = sessionStorage.getItem(navId);

      if (storedState) {
        try {
          const parsedState = JSON.parse(storedState);
          setNavigationState(parsedState);
        } catch (error) {
          console.error("Failed to parse navigation state:", error);
          setNavigationState(null);
        }
      }
    }
  }, [searchParams]);

  // ===============================Get State Function==============================
  const getState = <T = NavigationState>(): T | null => {
    return navigationState as T | null;
  };

  // ===============================Clear State==============================
  const clearState = () => {
    const navId = searchParams.get("navId");

    if (navId) {
      sessionStorage.removeItem(navId);
    }

    setNavigationState(null);
  };

  return {
    navigateWithState,
    getState,
    clearState,
  };
};

export default useNavigationState;
