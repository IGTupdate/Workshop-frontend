import Image from "next/image";
import React from "react";
// import CarDashboards from "../../../../../../public/images/cardashboard.webp";
import { useTranslations } from "next-intl";
// import Line from "../../../../../../public/images/line4.webp";

type props = {
  card?: boolean;
};

const CarDashboard = ({ card }: props) => {
  const t = useTranslations("CarDashboard");
  return (
    <div
      className={`${card ? "h-[242px] md:h-[264px] xmd:h-[342px] xl:h-[434px] 2xl:h-[540px]" : "h-[380px] sm:h-[350px] xmd:h-[434px]"} overflow-hidden relative`}
    >
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
        className="w-full h-full sm:h-max relative"
      />

      {card ? (
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
      ) : (
        <div className="container absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] p-8 transbox z-[5] rounded-xl">
          <h2 className="font-bold font-RobotoFlex text-lg sm:text-xl md:text-3xl xmd:text-[40px] leading-5 sm:leading-[52px] text-white text-center mb-4 xmd:mb-8">
            {t("newHeading")}
          </h2>
          <p className="text-white font-RobotoFlex text-base sm:text-lg md:text-xl xmd:text-3xl font-normal text-center w-full xl:w-3/4 mx-auto">
            {t("para")}
          </p>
        </div>
      )}

      <div
        className={`absolute left-0 ${card ? "bottom-[-80px] sm:bottom-[28px] md:bottom-[30px] xmd:bottom-[40px]" : "bottom-[-180px] sm:bottom-[-90px] md:bottom-[-50px] xmd:bottom-[14px]"}   xl:bottom-[58px] 2xl:bottom-[78px] h-full w-full`}
      >
        <Image
          fill
          src={"/images/line4.webp"}
          alt="Line"
          className="w-full h-max relative"
        />
      </div>
    </div>
  );
};

export default CarDashboard;
