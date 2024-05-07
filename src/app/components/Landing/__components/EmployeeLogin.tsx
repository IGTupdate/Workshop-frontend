"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Employ from "../../../../../public/images/mechanic-working.webp";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/employee/login");
  };

  return (
    <div className="container mx-auto">
      <div className="gap-6 lg:gap-10 flex flex-wrap justify-center items-center">
        <div>
          <Image src={Employ} alt="Employ" className="w-[450px]" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4 text-center xmd:text-start">
            Are you an employee?
          </h1>
          <p className="text-lg mb-6 text-center xmd:text-start">
            Login to access employee features.
          </p>
          <div className="flex justify-center items-center xmd:justify-start">
            <button
              onClick={handleLoginClick}
              className="bg-customGray text-customLightGray px-4 py-2 rounded-md hover:bg-opacity-85 transition-colors duration-200 text-lg font-semibold focus:outline-none focus:ring focus:ring-blue-400"
            >
              Employee Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
