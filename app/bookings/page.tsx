import { Suspense } from "react";
import Bookings from "@/Component/Bookings/Bookings";

const page = () => {
  return (
    <div>
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
        <Bookings />
      </Suspense>
    </div>
  );
};

export default page;
