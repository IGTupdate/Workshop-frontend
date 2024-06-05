import React from "react";
import { useTranslations } from "use-intl";

const Inventory = () => {
  const t = useTranslations("Inventory");
  return (
    <div className="container py-8 sm:py-16 px-4 xl:px-36">
      <div className="flex justify-center items-center w-full flex-col">
        <h2 className="font-bold font-RobotoFlex text-lg sm:text-xl md:text-3xl xmd:text-[40px] leading-5 sm:leading-[52px] text-white">
          {t("heading")}
        </h2>
        <h2 className="font-bold font-RobotoFlex text-lg sm:text-xl md:text-3xl xmd:text-[40px] leading-5 sm:leading-[52px] text-white">
          {t("headingTwo")}
        </h2>

        <p className="text-white text-center font-RobotoFlex text-base sm:text-lg md:text-xl xmd:text-3xl font-normal mt-4 sm:mt-8">
          {t("para")}
        </p>
      </div>
    </div>
  );
};

export default Inventory;
