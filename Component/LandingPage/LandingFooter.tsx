"use client";
import { Button, Link } from 'react-aria-components';

const LandingFooter = () => {
  return (
    <section className="bg-yellow-800 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl text-center">
        {/* ===============================Section Title============================== */}
        <h2 className="mb-4 font-bold text-2xl text-white sm:text-3xl lg:mb-6 lg:text-4xl">
          Ready to Start Your Journey?
        </h2>

        {/* ===============================Section Description============================== */}
        <p className="mb-8 text-base text-yellow-50 sm:text-lg lg:mb-10 lg:text-xl">
          Join millions of travelers who trust Tripbank for their adventures
        </p>

        {/* ===============================Action Buttons============================== */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link href="/explore">
            <Button className="h-11 w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 duration-500 text-lg rounded-xl px-8 sm:h-12 sm:w-auto sm:px-10">
              Explore Deal Now
            </Button>
          </Link>
        
        </div>
      </div>
    </section>
  );
}

export default LandingFooter