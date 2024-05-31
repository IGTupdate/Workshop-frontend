"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
// import Employ from "../../../../../public/images/mechanic-working.webp";
import { useTranslations } from "next-intl";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/employee/login");
  };
  const t = useTranslations("EmployeeLoginPage");

  return (
    <div className="container mx-auto">
      <div className="gap-6 lg:gap-10 flex flex-wrap justify-center items-center">
        <div>
          <Image
            src={"/images/mechanic-working.webp"}
            alt="Employ"
            className="w-[450px]"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4 text-center xmd:text-start">
            {t("heading")}
          </h1>
          <p className="text-lg mb-6 text-center xmd:text-start">
            {t("subHeading")}
          </p>
          <div className="flex justify-center items-center xmd:justify-start">
            <button
              onClick={handleLoginClick}
              className="bg-customGray text-customLightGray px-4 py-2 rounded-md hover:bg-opacity-85 transition-colors duration-200 text-lg font-semibold focus:outline-none focus:ring focus:ring-blue-400"
            >
              {t("button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
