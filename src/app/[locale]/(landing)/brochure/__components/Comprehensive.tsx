"use client";
import { useTranslations } from "next-intl";
import React from "react";

const Comprehensive = () => {
  const t = useTranslations("Comprehensive");
  return (
    <div className="container py-8 xmd:py-20 relative z-10">
      <div className="flex justify-center items-center">
        <h2
          className={`border border-customYellow p-2 md:p-0 w-full xmd:w-3/4 rounded-lg text-xl sm:text-2xl md:text-3xl xmd:text-[40px] font-RobotoFlex font-bold text-white xmd:leading-[70.31px] text-center`}
        >
          {t("heading")}
        </h2>
      </div>
      <p
        className={`text-center text-white font-normal font-RobotoFlex text-base md:text-[22px] md:leading-[25.78px] mt-8 w-full xl:w-2/3 mx-auto`}
      >
        {t("para")}
      </p>
    </div>
  );
};

export default Comprehensive;
