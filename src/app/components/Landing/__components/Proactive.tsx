import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
// import Left from "../../../../../public/images/left.webp";
// import Right from "../../../../../public/images/right.webp";

const Proactive = () => {
  const t = useTranslations("Proactive");
  const word = t("heading").split(" ");
  const lastWord = word[word.length - 1];
  6;
  const fullWord = t("heading").split(" ");
  fullWord.pop();
  const newWord = fullWord.join(" ");
  return (
    <div className="container relative py-44 md:py-24 pb-16">
      <Image
        fill
        src={"/images/left.webp"}
        alt="left"
        className="absolute top-0 left-0"
      />
      <Image
        fill
        src={"/images/right.webp"}
        alt="left"
        className="absolute top-0 right-0"
      />
      <div>
        <h2 className="font-RobotoFlex font-bold text-white text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px] text-center">
          {newWord} <span className="text-customYellow">{lastWord}</span>
        </h2>
        <p className="text-center text-white font-normal text-base md:text-[22px] md:leading-[25.78px] mt-4 w-full xmd:w-[53%] mx-auto">
          {t("subHeading")}
        </p>

        <div className="flex w-full justify-center items-center">
          <div className="rounded-[100%] w-full xmd:w-[81%] h-6 bg-[#d9d9d90d]"></div>
        </div>
      </div>
    </div>
  );
};

export default Proactive;
