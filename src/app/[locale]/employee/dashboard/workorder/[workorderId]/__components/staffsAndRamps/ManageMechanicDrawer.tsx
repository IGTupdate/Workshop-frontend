"use client";

import { TEmployee } from "@/app/types/employee";
import { Button, Drawer, Tabs, Typography } from "antd";
import React, { useState } from "react";
import type { TabsProps } from "antd";
import AssignMechanicDrawerContainer from "../AssignMechanicDrawerContainer";
import RemoveMechanicDrawerContainer from "./RemoveMechanicDrawerContainer";
import { TWorkOrder } from "@/app/types/work-order";

type Props = {
  assigned_mechanics: string[] | TEmployee[];
  handleUpdateWorkOrderData: (field: keyof TWorkOrder, fieldData: any) => void;
};

const ManageMechanicDrawer = (props: Props) => {
  const [openParentDrawer, setOpenParentDrawer] = useState(false);

  // parent
  const handleParentDrawerOnClose = () => {
    setOpenParentDrawer(false);
  };
  const handleParentopenDrawer = () => {
    setOpenParentDrawer(true);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Assign",
      children: (
        <AssignMechanicDrawerContainer
          assigned_mechanics={props.assigned_mechanics}
          handleUpdateWorkOrderData={props.handleUpdateWorkOrderData}
        />
      ),
    },
    {
      key: "2",
      label: "Remove",
      children: (
        <RemoveMechanicDrawerContainer
          assigned_mechanics={props.assigned_mechanics}
          handleUpdateWorkOrderData={props.handleUpdateWorkOrderData}
        />
      ),
    },
  ];

  return (
    <div>
      <Button onClick={handleParentopenDrawer} type="primary">
        Manage Mechanic
      </Button>

      <Drawer
        title="Mechanics Status"
        width={520}
        // closable={false}
        onClose={handleParentDrawerOnClose}
        open={openParentDrawer}
        // extra={

        // }
      >
        <div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </Drawer>
    </div>
  );
};

export default ManageMechanicDrawer;
