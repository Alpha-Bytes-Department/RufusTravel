"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useAxios } from "@/Hooks/useAxios";

// ===============================Type Definitions==============================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role?: string;
  [key: string]: unknown;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUserData: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ===============================Context Creation==============================

const AuthContext = createContext<AuthContextType | null>(null);

// ===============================Auth Provider Component==============================

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const axios = useAxios();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ===============================Initialize User from Storage==============================

  useEffect(() => {
    const initializeAuth = () => {
      try {
        //---------------------- Load user from localStorage ----------------
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");

        if (storedUser && accessToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        //---------------------- Clear corrupted data ----------------
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ===============================Login Function==============================

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);

        //---------------------- Make login API request ----------------
        const response = await axios.post("/users/login", {
          email,
          password,
        });

        const { user: userData, accessToken, refreshToken } = response.data;

        //---------------------- Store tokens and user data ----------------
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);

        console.log("Login successful");
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [axios]
  );

  // ===============================Logout Function==============================

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      //---------------------- Call logout API endpoint ----------------
      try {
        await axios.post("/users/logout");
      } catch (error) {
        //---------------------- Continue with logout even if API call fails ----------------
        console.error("Logout API call failed:", error);
      }

      //---------------------- Clear all auth data ----------------
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.clear();

      setUser(null);

      //---------------------- Redirect to signin page ----------------
      window.location.href = "/signin";

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  // ===============================Update User Function==============================

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;

      const updatedUser = { ...prevUser, ...userData };

      //---------------------- Persist updated user data ----------------
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  }, []);

  // ===============================Refresh User Data==============================

  const refreshUserData = useCallback(async () => {
    try {
      //---------------------- Fetch fresh user data from API ----------------
      const response = await axios.get("/users/profile");
      const userData = response.data;

      //---------------------- Update user state and storage ----------------
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("User data refreshed");
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      throw error;
    }
  }, [axios]);

  // ===============================Context Value==============================

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUserData,
  };

  // ===============================Render Provider==============================

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// ===============================useAuth Hook==============================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
