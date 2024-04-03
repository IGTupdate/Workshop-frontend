'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const LandingPage: React.FC = () => {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/employee/login');
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mr-10">
        <Image src="/images/mechanic-working.jpg" alt="Company Logo" height={500} width={600} />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4">Are you an employee?</h1>
        <p className="text-lg mb-6">Login to access employee features.</p>
        <button 
          onClick={handleLoginClick} 
          className='bg-customGray text-customLightGray px-4 py-2 rounded-md hover:bg-opacity-85 transition-colors duration-200 text-lg font-semibold focus:outline-none focus:ring focus:ring-blue-400'
        >
          Employee Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
