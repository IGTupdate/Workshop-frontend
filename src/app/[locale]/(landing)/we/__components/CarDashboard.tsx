import Image from "next/image";
import React from "react";
// import CarDashboards from "../../../../../../public/images/cardashboard.webp";
import { useTranslations } from "next-intl";
// import Line from "../../../../../../public/images/line4.webp";

const CarDashboard = () => {
  const t = useTranslations("CarDashboard");
  return (
    <div className="h-[228px] md:h-[250px] xmd:h-[328px] xl:h-[410px] 2xl:h-[540px] overflow-hidden relative">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-[5]"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, rgba(13, 13, 13, 0) 100%)",
        }}
      ></div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-[5]"
        style={{
          background:
            "linear-gradient(180deg, #000000 0%, rgba(13, 13, 13, 0) 100%)",
        }}
      ></div>

      <Image
        fill
        src={"/images/cardashboard.webp"}
        alt="car dashboard"
        className="w-full"
      />

      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-20%] md:translate-y-[-25%] w-full z-[6] px-4">
        <div className="container p-0 md:ps-6">
          <h1 className="text-white font-RobotoFlex font-bold text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
            {t("heading")}
          </h1>
          <h1 className="text-white font-RobotoFlex font-bold text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
            {t("headingTwo")}
          </h1>
          <h1 className="text-white font-RobotoFlex font-bold text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
            {t("headingThree")}
          </h1>
        </div>
      </div>

      <div className="absolute left-0 bottom-[-80px] sm:bottom-[28px] md:bottom-[30px] xmd:bottom-[40px] xl:bottom-[58px] 2xl:bottom-[78px] h-full w-full">
        <Image fill src={"/images/line4.webp"} alt="Line" className="w-full" />
      </div>
    </div>
  );
};

export default CarDashboard;
