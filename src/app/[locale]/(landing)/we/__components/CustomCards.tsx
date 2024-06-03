import { useTranslations } from "next-intl";
import React from "react";
// import LineFive from "../../../../../../public/images/line5.webp";
// import LineSix from "../../../../../../public/images/line6.webp";
import Image from "next/image";

const CustomCards = () => {
  const t = useTranslations("CustomCards");

  const data = [
    {
      heading: `${t("mission")}`,
      text: `${t("missionText")}`,
    },
    {
      heading: `${t("vision")}`,
      text: `${t("visionText")}`,
    },
    {
      heading: `${t("philosophy")}`,
      text: `${t("philosophyText")}`,
    },
  ];
  return (
    <>
      <Image
        fill
        src={"/images/line5.webp"}
        alt="line"
        className="absolute left-auto bottom-auto right-0 top-0 xl:top-[-253px] z-[1] h-max"
      />
      <Image
        fill
        src={"/images/line6.webp"}
        alt="line"
        className="absolute left-0 top-auto right-auto bottom-0 xl:bottom-[-320px] z-[1] h-max"
      />

      <div
        style={{ background: "#0000001A", backdropFilter: "blur(3px)" }}
        className="absolute top-0 right-0 bottom-0 left-0 z-[2]"
      ></div>
      <div className="container relative z-10">
        <div className="flex justify-center xl:justify-between gap-8 items-center flex-wrap py-20">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full md:w-[341px] min-h-32 md:min-h-60"
            >
              <h2 className="text-white font-RobotoFlex font-bold text-2xl md:text-3xl py-2 mx-4 border border-customYellow rounded-lg text-center mb-4">
                {item.heading}
              </h2>
              <p className="text-white font-RobotoFlex font-normal text-base md:text-xl text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomCards;
