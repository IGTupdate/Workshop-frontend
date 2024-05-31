import React from "react";
import CustomSlider from "./CustomSlider";
import SliderItmes from "@/app/utils/SliderItmes";
import { useTranslations } from "next-intl";

const Modules = () => {
  const t = useTranslations("Modules");
  return (
    <div className="container md:px-0 py-10">
      <h2 className="font-RobotoFlex font-bold text-2xl sm:text-3xl md:text-4xl xmd:text-[61px] xmd:leading-[71.48px] text-center text-white mb-8">
        {t("heading")}
      </h2>
      {/* <CustomSlider SliderItems={SliderItmes} /> */}
    </div>
  );
};

export default Modules;
