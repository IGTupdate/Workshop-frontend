import React from "react";
// import Bg from "../../../../../public/images/Rectangle-2.webp";
// import Line from "../../../../../public/svg/line1.svg";
import Image, { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

type props = {
  height?: string | undefined;
  heading?: string | undefined;
  headingTwo?: string | undefined;
  subheading?: string | undefined;
  Logo?: string | undefined;
};

const HeadingSection = ({
  height,
  heading,
  headingTwo,
  subheading,
  Logo,
}: props) => {
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
        <Image
          fill={true}
          src={"/svg/line1.svg"}
          alt="Line"
          className="h-max static"
        />
      </div>
      <Image
        src={"/images/Rectangle-2.webp"}
        alt="Bg"
        fill
        className={`static h-[200px] sm:h-[350px] md:h-[400px]  ${height === "default" ? "xmd:h-[655px]" : "xmd:h-[710px]"} w-full`}
      />

      <div className="absolute top-0 left-0 flex flex-col justify-end sm:justify-center items-center w-full h-full z-[6] px-4">
        <div className="flex justify-center items-center w-full mb-4">
          {Logo && (
            <div className="relative">
              <Image
                src={Logo}
                fill
                alt="Logo"
                className="w-max h-max relative"
                sizes="10"
              />
            </div>
          )}
        </div>

        <div>
          {heading && (
            <h1 className="text-white font-RobotoFlex font-bold text-center text-xl sm:text-3xl md:text-4xl xmd:text-7xl xmd:leading-[85px]">
              {heading}
            </h1>
          )}
        </div>

        <div>
          {headingTwo && (
            <h1 className="text-white font-RobotoFlex font-bold text-center text-xl sm:text-3xl md:text-4xl xmd:text-7xl xmd:leading-[85px]">
              {headingTwo}
            </h1>
          )}
        </div>

        <div>
          {subheading && (
            <p className="text-white font-RobotoFlex font-normal text-center text-base md:text-xl mb-4 sm:mb-0">
              {subheading}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadingSection;
