"use client";
import { Tabs, TabsProps } from "antd";
import React from "react";
import CarDashboardAndFule from "../../__components/CarDashboardAndFule";

type Props = {};

const WorkOrderPrepareStepContainer = (props: Props) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Check Odometer & Fuel",
      children: <CarDashboardAndFule />,
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
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
