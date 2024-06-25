"use client";

import { IChecklist } from "@/app/types/vehicle-checklist";
import { Collapse, CollapseProps } from "antd";
import React, { useEffect, useState } from "react";
import VehicleCheckListLevelViewContainer from "./VehicleCheckListLevelViewContainer";

type Props = {
  checkList: IChecklist[];
};

const VehicleCheckListContainer = (props: Props) => {
  const [collapsabelItem, setCollapsableItem] =
    useState<CollapseProps["items"]>();

  useEffect(() => {
    setCollapsableItem(() => {
      return props.checkList.map((el, index) => {
        return {
          key: index,
          label: (
            <div className="flex justify-between items-center">
              <h2>Level {index + 1}</h2>
            </div>
          ),
          children: <VehicleCheckListLevelViewContainer levelData={el} />,
        };
      });
    });
  }, [props.checkList]);

  return (
    <div>
      <Collapse items={collapsabelItem} />
    </div>
  );
};

export default VehicleCheckListContainer;
