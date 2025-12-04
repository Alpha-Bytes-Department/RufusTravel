import Logo from '@/Component/Shared/Logo'
import React from 'react'
import Form from './Form';

const SignUp = () => {
  return (
    <div className="py-10 lg:py-14 min-h-screen px-20 text-black">
      <div className="flex justify-center pb-8 lg:pb-14">
        <Logo textColor="text-black" />
      </div>
      <h1 className="  text-center font-semibold text-xl md:text-2xl lg:text-3xl">
        Create Your Account
      </h1>
      <p className=' text-center text-base font-thin lg:text-xl text-gray-600 pb-8'>Provide your information and create an account</p>
      <Form />
    </div>
  );
}

export default SignUp