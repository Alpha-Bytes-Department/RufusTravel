import Logo from '@/Component/Shared/Logo';
import React from 'react'

const Forgot = () => {
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
      
    </div>
  );
}

export default Forgot