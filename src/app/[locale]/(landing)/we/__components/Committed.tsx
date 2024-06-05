import { useTranslations } from "next-intl";
import React from "react";

type props = {
  reverse: boolean;
  para: string | undefined;
  heading: string | undefined;
  headingTwo: string | undefined;
  headingThree: string | undefined;
};

const Committed = ({
  reverse,
  para,
  heading,
  headingTwo,
  headingThree,
}: props) => {
  const t = useTranslations("Committed");
  return (
    <div>
      <div className="container">
        <div
          className={`flex ${reverse ? "flex-row-reverse" : "flex-row"} flex-wrap xl:flex-nowrap gap-4 xl:gap-0 justify-between items-center py-6 md:py-12`}
        >
          <p
            className={`w-full xl:w-1/2 p-0 xl:pe-4 text-center ${reverse ? "xl:text-start" : "xl:text-end"} font-RobotoFlex font-light md:font-normal text-white text-base md:text-2xl`}
          >
            {para}
          </p>
          <div
            className={`w-full xl:w-1/2 p-0 xl:ps-4 flex flex-col ${reverse ? "justify-center items-center" : "justify-start items-start"}`}
          >
            <h2 className="font-RobotoFlex font-bold text-customYellow text-center xl:text-start text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
              {heading}
            </h2>
            <h2 className="font-RobotoFlex font-bold text-customYellow text-center xl:text-start text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
              {headingTwo}
            </h2>
            <h2 className="font-RobotoFlex font-bold text-customYellow text-center xl:text-start text-2xl sm:text-3xl md:text-4xl xmd:text-[60px] xmd:leading-[70.31px]">
              {headingThree}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committed;
