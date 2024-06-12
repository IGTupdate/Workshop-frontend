"use client";
import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { TWorkOrder } from "@/app/types/work-order";
import InspectVehicle from "./InspectVehicle";
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
      children: (
        <OdometerAndFuel
          setSteps={setSteps}
          workOrder={props.workOrder || {}}
        />
      ),
    },
    {
      key: "1",
      label: "Inspect Vehicle",
      children: (
        <InspectVehicle setSteps={setSteps} workOrder={props.workOrder || {}} />
      ),
    },
    {
      key: "2",
      label: "Service Plans",
      children: (
        <SelectServicePlans workOrder={props.workOrder} setSteps={setSteps} />
      ),
    },
    {
      key: "3",
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

/*
1. list screen
*/
