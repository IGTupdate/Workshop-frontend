import Image from "next/image";
import React from "react";
import Map from "../../../../../public/images/map.webp";
import { useTranslations } from "next-intl";
import { Button } from "antd";
const Operating = () => {
  const t = useTranslations("Operating");
  return (
    <div className="container relative">
      <Image src={Map} alt="map" />
      <div className="absolute right-8 top-1/2 translate-y-[-50%] w-[37rem]">
        <h2 className="text-customWhite font-normal text-[40px] leading-[46.88px]">
          {t("heading")}
        </h2>
        <h2 className="font-RobotoFlex text-customYellow font-bold text-[61px] leading-[71.48px]">
          {t("headingTwo")}
        </h2>
        <p className="font-RobotoFlex text-white font-normal text-[22px] leading-[28.78px] mt-4">
          {t("para")}
        </p>
        <button className="bg-customYellow text-black font-Inter font-semibold text-xl  px-10 py-2 mt-8 rounded-full hover:bg-matalicYellow">
          {t("button")}
        </button>
      </div>
    </div>
  );
};

export default Operating;
