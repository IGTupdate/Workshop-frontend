"use client";
import React from "react";
import CarDashboard from "./__components/CarDashboard";
import Committed from "./__components/Committed";
import CustomCards from "./__components/CustomCards";
import Icons from "./__components/Icons";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Committed");

  return (
    <div>
      <CarDashboard card={true} />

      <div className="bg-[#1F1F1F]">
        <Committed
          reverse={false}
          para={t("para")}
          heading={t("heading")}
          headingTwo={t("headingTwo")}
          headingThree={t("headingThree")}
        />
      </div>

      <div className="bg-black relative overflow-hidden">
        <CustomCards />
      </div>

      <div className="bg-[#1F1F1F]">
        <Icons />
      </div>
    </div>
  );
};

export default Page;
