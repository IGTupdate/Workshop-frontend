import React from "react";
import CustomSlider from "./CustomSlider";
import SliderItems from "@/app/utils/SliderItmes";
import { useTranslations } from "next-intl";

const Modules = () => {
  const t = useTranslations("Modules");
  return (
    <div className="container py-0 md:py-10">
      <h2 className="font-RobotoFlex font-bold text-2xl sm:text-3xl md:text-4xl xmd:text-[61px] xmd:leading-[71.48px] text-center text-white mb-4  md:mb-8">
        {t("heading")}
      </h2>
      <CustomSlider SliderItems={SliderItems} />
    </div>
  );
};

export default Modules;
