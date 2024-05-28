import { TVehicle } from "@/app/types/vehicle";
import { Descriptions, Typography } from "antd";
import React from "react";
const { Title } = Typography;

type Props = {
  vehicle: string | TVehicle;
};

const WorkOrderVehicleDetails = (props: Props) => {
  return (
    <div>
      <div>
        <Title level={5}>Vehicle Details</Title>
      </div>
      <Descriptions column={{ sm: 1, md: 2 }}>
        <Descriptions.Item label="Vehicle Reg No">
          {typeof props.vehicle !== "string"
            ? props.vehicle.registeration_number
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="VIN">
          {typeof props.vehicle !== "string" ? props?.vehicle?.vin : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Make">
          {typeof props.vehicle !== "string"
            ? props?.vehicle?.vehicle_make
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Model">
          {typeof props.vehicle !== "string"
            ? props?.vehicle?.vehicle_model
            : "-"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default WorkOrderVehicleDetails;
