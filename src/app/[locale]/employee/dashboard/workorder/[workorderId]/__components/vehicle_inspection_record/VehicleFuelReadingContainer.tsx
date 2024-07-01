import { TWorkOrderOdometerReading } from "@/app/types/work-order";
import { Image, Typography } from "antd";
import React from "react";

const { Title } = Typography;

type Props = {
  fuelQuantity: TWorkOrderOdometerReading | null;
};

const VehicleFuelReadingContainer = (props: Props) => {
  return (
    <div>
      {props.fuelQuantity && (
        <div>
          <Title level={4} className="mb-0">
            Fuel Reading
          </Title>
          <div>
            {props?.fuelQuantity?.value && (
              <p className="mb-2 font-medium">{props.fuelQuantity.value}</p>
            )}
            <div className="flex gap-4 mb-4">
              {props?.fuelQuantity?.images.map((img, index) => {
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

export default VehicleFuelReadingContainer;
