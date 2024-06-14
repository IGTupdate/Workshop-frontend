import { TWorkOrderOdometerReading } from "@/app/types/work-order";
import { Image, Typography } from "antd";
import React from "react";

const { Title } = Typography;

type Props = {
  odometerReading: TWorkOrderOdometerReading | null;
};

const VehicleOdometerReadingContainer = (props: Props) => {
  return (
    <div>
      {props.odometerReading && (
        <div>
          <Title level={4} className="mb-0">
            Odometer Reading
          </Title>
          <div>
            <p className="mb-2 font-medium">{props.odometerReading.value}</p>
            <div className="flex gap-4 mb-4">
              {props?.odometerReading?.images.map((img, index) => {
                return (
                  <div key={index} className="w-40">
                    <Image src={img} alt="odometer" className="w-full" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleOdometerReadingContainer;
