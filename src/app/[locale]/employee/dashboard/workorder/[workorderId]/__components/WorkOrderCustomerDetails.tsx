import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { TCustomer } from "@/app/types/customer";
import { TVehicle } from "@/app/types/vehicle";
import { Descriptions, Typography } from "antd";
import React from "react";
const { Title } = Typography;

type Props = {
  customer: string | TCustomer;
};

const WorkOrderCustomerDetails = (props: Props) => {
  return (
    <div>
      <div>
        <Title level={5}>Customer Details</Title>
      </div>
      <Descriptions column={{ sm: 1, md: 2 }}>
        {/* <DescriptionItem title="Name" content={typeof props.customer !== "string" ? props?.customer?.fullName : "-"}/> */}
        <Descriptions.Item label="Name">
          {typeof props.customer !== "string" ? props?.customer?.fullName : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {typeof props.customer !== "string"
            ? props?.customer?.contactNumber
            : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {typeof props.customer !== "string" ? props?.customer?.email : "-"}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Vehicle Reg No">
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
        </Descriptions.Item> */}
      </Descriptions>
    </div>
  );
};

export default WorkOrderCustomerDetails;
