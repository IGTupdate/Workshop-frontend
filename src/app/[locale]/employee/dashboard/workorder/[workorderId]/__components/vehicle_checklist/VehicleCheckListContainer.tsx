"use client";

import { useEffect, useState } from "react";
import CheckListContainer from "./CheckListContainer";
import { demodata } from "./demodata";
import { IVehicleChecklist } from "@/app/types/checklist";
import { Typography } from "antd";
import { IWorkorderChecklist } from "@/app/types/workorder-checklist";

const { Title } = Typography;

type Props = {};

const VehicleCheckListContainer: React.FC<Props> = (props) => {
  const [mechanicCheckList, setMechanicCheckList] =
    useState<IWorkorderChecklist | null>(null);

  useEffect(() => {
    loadMechanicCheckList();
  }, []);

  const loadMechanicCheckList = () => {
    setMechanicCheckList(demodata);
  };

  return (
    <div>
      {/* <CheckListContainer
                mechanicCheckList={demodata}
            /> */}

      <div className="mb-4">
        <Title level={4}>Perform Check on Vehicle</Title>
      </div>

      {mechanicCheckList ? (
        <CheckListContainer vehicleCheckList={mechanicCheckList} />
      ) : (
        <div>No Checklist found</div>
      )}

      {/* <ul>
                <li>
                    <div>


                    </div>
                </li>
            </ul> */}
    </div>
  );
};

export default VehicleCheckListContainer;
