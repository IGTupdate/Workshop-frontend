import Image from "next/image";
import React from "react";
import Map from "../../../../../public/images/map.webp";
import { useTranslations } from "next-intl";
import { Button } from "antd";
const Operating = () => {
  const t = useTranslations("Operating");
  return (
    <div className="container relative h-[300px] md:h-[350px] xmd:h-[500px]">
      <Image src={Map} alt="map" className="w-full xmd:w-[80%] h-full" />
      <div className="absolute px-4 xmd:px-0 right-0 xmd:right-16 top-1/2 translate-y-[-50%] w-full xmd:w-[37rem]">
        <h2 className="text-customWhite font-normal text-xl sm:text-2xl md:text-3xl xmd:text-[40px] xmd:leading-[46.88px]">
          {t("heading")}
        </h2>
        <h2 className="font-RobotoFlex text-customYellow font-bold text-2xl sm:text-3xl md:text-4xl xmd:text-[61px] xmd:leading-[71.48px]">
          {t("headingTwo")}
        </h2>
        <p className="font-RobotoFlex text-white font-normal texts-base md:text-lg xmd:text-[22px] xmd:leading-[28.78px] mt-4">
          {t("para")}
        </p>
        <button className="bg-customYellow text-black font-Inter font-medium sm:font-semibold text-base sm:text-xl  px-10 py-2 mt-8 rounded-full hover:bg-matalicYellow">
          {t("button")}
        </button>
      </div>
    </div>
  );
};

export default Operating;
