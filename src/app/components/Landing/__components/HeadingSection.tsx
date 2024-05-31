import React from "react";
// import Bg from "../../../../../public/images/Rectangle-2.webp";
// import Line from "../../../../../public/svg/line1.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HeadingSection = () => {
  const t = useTranslations("HeadingSection");
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-[5]"
        style={{
          background:
            "linear-gradient(180deg, #000000 -26.92%, rgba(13, 13, 13, 0) 100%)",
        }}
      ></div>

      <div className="absolute right-0 top-0 h-full overflow-hidden">
        <Image src={"/images/Rectangle-2.webp"} alt="Line" />
      </div>
      <Image
        src={"/images/Rectangle-2.webp"}
        alt="Bg"
        className="h-[270px] sm:h-[350px] md:h-[400px] xmd:h-[655px] w-full"
      />

      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-25%] w-full z-[6] px-4">
        <h1 className="text-white font-RobotoFlex font-bold text-center text-2xl sm:text-3xl md:text-4xl xmd:text-7xl xmd:leading-[85px]">
          {t("heading")}
        </h1>
        <h1 className="text-white font-RobotoFlex font-bold text-center text-2xl sm:text-3xl md:text-4xl xmd:text-7xl xmd:leading-[85px]">
          {t("headingTwo")}
        </h1>
        <p className="text-white font-RobotoFlex font-normal text-center text-base md:text-xl">
          {t("subHeading")}
        </p>
      </div>
    </div>
  );
};

export default HeadingSection;
