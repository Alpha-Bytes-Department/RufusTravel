import { Suspense } from "react";
import Landing from "@/Component/LandingPage/Landing";
import { useAxios } from "@/Hooks/useAxios";
import { useAuth } from "@/Providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" mx-auto ">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        }
      >
        <Landing />
      </Suspense>
    </div>
  );
}
