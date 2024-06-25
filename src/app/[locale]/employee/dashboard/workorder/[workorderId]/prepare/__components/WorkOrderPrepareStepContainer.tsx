"use client";
import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { TWorkOrder } from "@/app/types/work-order";
import InspectVehicle from "./InspectVehicle";
import SelectServicePlans from "./SelectServicePlans";
import EstimateTimeAndCosts from "./EstimateTimeAndCosts";
import OdometerAndFuel from "./OdometerAndFuel";
import PrepareVehicleCheck from "./PrepareVehicleCheck";
import { TVehicle } from "@/app/types/vehicle";

type Props = {
  workOrder: TWorkOrder | null;
};

const WorkOrderPrepareStepContainer = (props: Props) => {
  const [steps, setSteps] = useState("0");

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "Check Odometer & Fuel",
      // children: <CarDashboardAndFule />,
      children: (
        <OdometerAndFuel
          setSteps={setSteps}
          workOrder={props.workOrder || {}}
        />
      ),
    },
    {
      key: "1",
      label: "Vehicle Check",
      children: (
        <PrepareVehicleCheck
          workOrdeId={props.workOrder?._id || ""}
          workOrderChecklist={props.workOrder?.checklist}
          workOrderVehicle={
            typeof props.workOrder?.appointmentId === "string"
              ? null
              : (props.workOrder?.appointmentId.vehicle_id as TVehicle)
          }
          setSteps={setSteps}
        />
      ),
    },
    {
      key: "2",
      label: "Inspect Vehicle",
      children: (
        <InspectVehicle setSteps={setSteps} workOrder={props.workOrder || {}} />
      ),
    },
    {
      key: "3",
      label: "Service Plans",
      children: (
        <SelectServicePlans workOrder={props.workOrder} setSteps={setSteps} />
      ),
    },
    {
      key: "4",
      label: "Estimate Time & Costs",
      children: (
        <EstimateTimeAndCosts workOrder={props.workOrder} setSteps={setSteps} />
      ),
    },
  ];

  const onTabChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey={"0"}
        activeKey={steps}
        items={items}
        centered
        onChange={onTabChange}
      />
    </div>
  );
};

export default WorkOrderPrepareStepContainer;
