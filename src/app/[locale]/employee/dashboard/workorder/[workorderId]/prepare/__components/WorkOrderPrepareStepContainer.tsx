"use client";
import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { TWorkOrder } from "@/app/types/work-order";
import InspectVehicle from "../../__components/InspectVehicle";
import SelectServicePlans from "../../__components/SelectServicePlans";
import EstimateTimeAndCosts from "../../__components/EstimateTimeAndCosts";
import OdometerAndFuel from "./OdometerAndFuel";

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
      children: <OdometerAndFuel setSteps={setSteps} />,
    },
    {
      key: "1",
      label: "Inspect Vehicle",
      children: <InspectVehicle setSteps={setSteps} />,
    },
    {
      key: "2",
      label: "Service Plans",
      children: (
        <SelectServicePlans id={props.workOrder?._id} setSteps={setSteps} />
      ),
    },
    {
      key: "3",
      label: "Estimate Time & Costs",
      children: (
        <EstimateTimeAndCosts id={props.workOrder?._id} setSteps={setSteps} />
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey={"0"} activeKey={steps} items={items} centered />
    </div>
  );
};

export default WorkOrderPrepareStepContainer;
