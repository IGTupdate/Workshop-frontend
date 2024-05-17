import { useTranslations } from "next-intl";
import React from "react";

const Committed = () => {
  const t = useTranslations("Committed");
  return (
    <div>
      <div className="container">
        <div className="flex flex-wrap xl:flex-nowrap gap-4 xl:gap-0 justify-between items-center py-6 md:py-12">
          <p className="w-full xl:w-1/2 p-0 xl:pe-4 text-center xl:text-end font-RobotoFlex font-light md:font-normal text-white text-base md:text-2xl">
            {t("para")}
          </p>
          <div className="w-full xl:w-1/2 p-0 xl:ps-4">
            <h2 className="font-RobotoFlex font-bold text-customYellow text-center xl:text-start text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
              {t("heading")}
            </h2>
            <h2 className="font-RobotoFlex font-bold text-customYellow text-center xl:text-start text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
              {t("headingTwo")}
            </h2>
            <h2 className="font-RobotoFlex font-bold text-customYellow text-center xl:text-start text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
              {t("headingThree")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committed;
