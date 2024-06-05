"use client";
import { useTranslations } from "next-intl";
import React from "react";

const Marketing = () => {
  const t = useTranslations("Marketing");
  return (
    <div className="container pt-10">
      <div className="p-8 transbox z-[5] rounded-xl mb-14">
        <h2 className="font-bold font-RobotoFlex text-lg sm:text-xl md:text-3xl xmd:text-[40px] leading-5 sm:leading-[52px] text-white text-center mb-8">
          {t("heading")}
        </h2>
        <p className="text-white font-RobotoFlex text-base sm:text-lg md:text-xl xmd:text-3xl font-normal text-center">
          {t("para")}
        </p>
      </div>
      <div className="p-8 transbox z-[5] rounded-xl mb-14">
        <h2 className="font-bold font-RobotoFlex text-lg sm:text-xl md:text-3xl xmd:text-[40px] leading-5 sm:leading-[52px] text-white text-center mb-8">
          {t("headingTwo")}
        </h2>
        <p className="text-white font-RobotoFlex text-base sm:text-lg md:text-xl xmd:text-3xl font-normal text-center">
          {t("paraTwo")}
        </p>
      </div>
    </div>
  );
};

export default Marketing;
