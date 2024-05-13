"use client";

import { TEmployee } from "@/app/types/employee";
import { Typography } from "antd";
import React from "react";
import ManageMechanicDrawer from "./ManageMechanicDrawer";
import { TWorkOrder } from "@/app/types/work-order";
import Watermark from "@/app/components/Text/WatermarkText";
import { useAppSelector } from "@/app/store/reduxHooks";

const { Title, Text } = Typography;

type Props = {
  advisorId: string | TEmployee;
  assigned_mechanics: string[] | TEmployee[];
  handleUpdateWorkOrderData: (field: keyof TWorkOrder, fieldData: any) => void;
};

const WorkOrderMechanicDetailContainer = (props: Props) => {
  const { authData } = useAppSelector((state) => state.auth);
  return (
    <div>
      <div className="flex justify-between">
        <Title level={5}>Mechanic Details</Title>

        {/* can only manage if it is advisor */}
        {((typeof props.advisorId === "string" &&
          props.advisorId === authData._id) ||
          (typeof props.advisorId !== "string" &&
            props.advisorId._id === authData._id)) && (
          <ManageMechanicDrawer
            handleUpdateWorkOrderData={props.handleUpdateWorkOrderData}
            assigned_mechanics={props.assigned_mechanics}
          />
        )}
      </div>
      <div>
        {props.assigned_mechanics.length > 0 ? (
          <ul className="grid grid-cols-2">
            {props.assigned_mechanics.length > 0 &&
              props.assigned_mechanics.map((el, ind) => {
                return (
                  <li key={ind}>{typeof el === "string" ? el : el.fullName}</li>
                );
              })}
          </ul>
        ) : (
          <div className="relative py-8">
            <Watermark text="No Mechanics are assigned" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkOrderMechanicDetailContainer;
