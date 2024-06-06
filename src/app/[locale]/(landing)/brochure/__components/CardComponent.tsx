import Image from "next/image";
import React from "react";

type props = {
  CardComponentData: any;
};

const CardComponent = ({ CardComponentData }: props) => {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center flex-wrap lg:flex-nowrap gap-8">
        {CardComponentData().map((item: any, index: any) => (
          <div
            style={{
              boxShadow:
                "-5px -5px 10px 0px #00000040 inset,5px 5px 12.6px 4px #0000004D inset",
            }}
            key={index}
            className="w-full lg:w-1/2 p-8 rounded-xl relative z-[2] min-h-max lg:min-h-[264px]"
          >
            <h3
              className={`text-xl sm:text-2xl md:text-3xl xmd:text-[40px] font-RobotoFlex font-bold text-white xmd:leading-[46.88px]`}
            >
              {item.heading}
            </h3>
            <p className="text-white font-RobotoFlex font-normal text-base md:text-[22px] md:leading-[25.78px] mt-8">
              {item.para}
            </p>

            <Image
              src={item.image}
              alt="icon"
              className="absolute right-0 top-1/2 translate-y-[-50%] left-auto bottom-auto w-[303px] h-full z-[-1]"
              style={{ height: "auto", width: "auto" }}
              height={150}
              width={150}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
