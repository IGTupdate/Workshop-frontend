"use client";
import { useTranslations } from "next-intl";
import React from "react";

const BillingAndPayment = () => {
  const t = useTranslations("BillingAndPayment");
  return (
    <div className="container px-4 pe-4 xmd:px-20 xmd:pe-28 py-8 xmd:py-16">
      <h2 className="font-bold font-RobotoFlex text-lg sm:text-xl md:text-3xl xmd:text-[40px] leading-5 sm:leading-[52px] text-white mb-4 sm:mb-8">
        {t("heading")}
      </h2>
      <p className="text-white font-RobotoFlex text-base sm:text-lg md:text-xl xmd:text-3xl font-normal">
        {t("para")}
      </p>
    </div>
  );
};

export default BillingAndPayment;
