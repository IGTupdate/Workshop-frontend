import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
// import Left from "../../../../../public/images/left.webp";
// import Right from "../../../../../public/images/right.webp";

type props = {
  border?: boolean | undefined;
  para: string | undefined;
};

const Proactive = ({ border, para }: props) => {
  const t = useTranslations("Proactive");
  const word = t("heading").split(" ");
  const lastWord = word[word.length - 1];
  6;
  const fullWord = t("heading").split(" ");
  fullWord.pop();
  const newWord = fullWord.join(" ");
  return (
    <div className="container w-full relative py-16 md:pt-32 xmd:pt-44 xl:py-24 pb-16">
      <Image
        fill
        src={"/images/left.webp"}
        alt="left"
        className={`absolute top-0 left-0 w-16 ${border ? "h-16 md:w-[100.77px] md:h-[125.56px] opacity-50" : "h-16 md:w-[100.77px] md:h-[125.56px] xmd:w-[140.77px] xmd:h-[165.56px]"}`}
        sizes="10"
      />
      <Image
        fill={true}
        src={"/images/right.webp"}
        alt="right"
        className={`absolute top-0 left-auto !right-0 w-16 ${border ? "h-16 md:w-[100.77px] md:h-[125.56px] opacity-50" : "h-16 md:w-[100.77px] md:h-[125.56px] xmd:w-[140.77px] xmd:h-[165.56px]"}`}
        sizes="10"
      />
      <div>
        <div className="flex justify-center items-center">
          <h2
            className={`${border ? "border border-customYellow p-2 md:p-0 w-full xmd:w-5/6 rounded-lg text-xl sm:text-2xl md:text-3xl xmd:text-[40px] " : "text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] "} font-RobotoFlex font-bold text-white xmd:leading-[70.31px] text-center`}
          >
            {newWord}{" "}
            <span className={`${!border && "text-customYellow"}`}>
              {lastWord}
            </span>
          </h2>
        </div>
        <p
          className={`text-center text-white font-normal text-base md:text-[22px] md:leading-[25.78px] mt-8 ${border ? "w-full xl:w-5/6" : " w-full xl:w-[53%]"} mx-auto`}
        >
          {para}
        </p>

        {!border && (
          <div className="flex w-full justify-center items-center">
            <div className="rounded-[100%] w-full xmd:w-[81%] h-6 bg-[#d9d9d90d]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proactive;
