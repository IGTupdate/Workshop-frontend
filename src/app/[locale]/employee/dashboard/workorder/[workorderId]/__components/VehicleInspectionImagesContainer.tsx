"use client";

import { Typography } from "antd";
import Image from "next/image";
import React from "react";

const { Title } = Typography;

type Props = {};

const VehicleInspectionImagesContainer = (props: Props) => {
  return (
    <div>
      <Title level={5}>Pre Exist Damage to the Vehicle</Title>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
        <div className="w-[220px] h-[110px] aspect-square relative">
          <Image
            fill={true}
            className="absolute w-full"
            src={"/images/mechanic-working.jpg"}
            alt="vehicle inspection"
          />
        </div>
        <div className="md:w-[220px] w-[120px] md:h-[110px] h-[60px] aspect-square relative">
          <Image
            fill={true}
            className="absolute w-full"
            src={"/images/mechanic-working.jpg"}
            alt="vehicle inspection"
          />
        </div>
        <div className="md:w-[220px] w-[120px] md:h-[110px] h-[60px] aspect-square relative">
          <Image
            fill={true}
            className="absolute w-full"
            src={"/images/mechanic-working.jpg"}
            alt="vehicle inspection"
          />
        </div>
        <div className="md:w-[220px] w-[120px] md:h-[110px] h-[60px] aspect-square relative">
          <Image
            fill={true}
            className="absolute w-full"
            src={"/images/mechanic-working.jpg"}
            alt="vehicle inspection"
          />
        </div>
        <div className="md:w-[220px] w-[120px] md:h-[110px] h-[60px] aspect-square relative">
          <Image
            fill={true}
            className="absolute w-full"
            src={"/images/mechanic-working.jpg"}
            alt="vehicle inspection"
          />
        </div>
        <div className="md:w-[220px] w-[120px] md:h-[110px] h-[60px] aspect-square relative">
          <Image
            fill={true}
            className="absolute w-full"
            src={"/images/mechanic-working.jpg"}
            alt="vehicle inspection"
          />
        </div>
        <div className="md:w-[220px] w-[120px] md:h-[110px] h-[60px] aspect-square relative">
          <Image
            fill={true}
            className="absolute w-full"
            src={"/images/mechanic-working.jpg"}
            alt="vehicle inspection"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleInspectionImagesContainer;
