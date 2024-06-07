import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { StaticImageData } from "next/image";
import React from "react";
type props = {
  heading?: string | undefined;
  subHeading: string | undefined;
  para: string | undefined;
  Img?: string | StaticImageData | StaticImport;
  Icon?: any;
  blur?: boolean;
};

const Characteristics = ({
  heading,
  subHeading,
  para,
  Img,
  Icon,
  blur = true,
}: props) => {
  return (
    <div className="container pt-0 pb-0 xmd:pb-8 sm:pt-8 sm:pb-16">
      {heading && (
        <h2 className="text-center md:text-end font-bold font-RobotoFlex mt-4 sm:mt-0 text-xl sm:text-2xl md:text-3xl xmd:text-[61px] text-white ">
          {heading}
        </h2>
      )}

      <div
        className={`flex ${Img ? "flex-row xmd:flex-row-reverse" : "flex-row"} flex-wrap xmd:flex-nowrap justify-between items-center gap-4 xmd:gap-16 w-full rounded-3xl ${blur ? "transbox" : ""} py-4 px-4 xmd:px-8 xmd:py-8 mb-8 xmd:mb-0 mt-8`}
      >
        <div>
          {Icon && (
            <Icon
              className={"text-[100px] xmd:text-[230px] text-white opacity-20"}
            />
          )}

          {Img && (
            <Image
              src={Img}
              alt="icon"
              height={150}
              width={250}
              className="relative w-[170px] h-max xmd:w-[850px] xmd:h-[170px]"
            />
          )}
        </div>

        <div>
          {subHeading && (
            <h3 className="font-bold font-RobotoFlex text-lg sm:text-xl md:text-3xl xmd:text-[40px] leading-5 sm:leading-[52px] text-white mb-4">
              {subHeading}
            </h3>
          )}

          {para && (
            <p className="text-white font-RobotoFlex text-base sm:text-lg md:text-xl xmd:text-3xl font-normal">
              {para}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Characteristics;
