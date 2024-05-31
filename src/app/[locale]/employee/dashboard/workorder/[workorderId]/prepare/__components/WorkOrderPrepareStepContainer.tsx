"use client";
import { Tabs, TabsProps } from "antd";
import React from "react";

import { TWorkOrder } from "@/app/types/work-order";
import InspectVehicle from "../../__components/InspectVehicle";
import SelectServicePlans from "../../__components/SelectServicePlans";
import EstimateTimeAndCosts from "../../__components/EstimateTimeAndCosts";
import OdometerAndFuel from "./OdometerAndFuel";

type Props = {
  workOrder: TWorkOrder | null;
};

const WorkOrderPrepareStepContainer = (props: Props) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Check Odometer & Fuel",
      // children: <CarDashboardAndFule />,
      children: <OdometerAndFuel />,
    },
    {
      key: "2",
      label: "Inspect Vehicle",
      children: <InspectVehicle />,
    },
    {
      key: "3",
      label: "Service Plans",
      children: <SelectServicePlans />,
    },
    {
      key: "4",
      label: "Estimate Time & Costs",
      children: <EstimateTimeAndCosts />,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Tabs defaultActiveKey="0" items={items} centered onChange={onChange} />
    </div>
  );
};

export default WorkOrderPrepareStepContainer;

/*
1. list screen
*/
