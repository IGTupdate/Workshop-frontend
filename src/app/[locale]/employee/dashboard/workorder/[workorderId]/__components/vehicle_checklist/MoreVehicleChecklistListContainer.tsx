"use client";

import { Button } from "antd";
import React, { useState } from "react";
import VehicleCheckListBasedOnTypeContainer from "./VehicleCheckListBasedOnTypeContainer";
import { IChecklist, IVehicleChecklist } from "@/app/types/checklist";

type Props = {
  vehicleCheckLists: IVehicleChecklist[];
};

const MoreVehicleChecklistListContainer = (props: Props) => {
  const [viewMore, setViewMore] = useState(false);
  return (
    <div>
      {!viewMore && (
        <div className="flex justify-end">
          <Button onClick={() => setViewMore(true)} type="link">
            View All
          </Button>
        </div>
      )}
      {viewMore && (
        <VehicleCheckListBasedOnTypeContainer
          heading="All Available Checks"
          checkListItem={props.vehicleCheckLists}
        />
      )}
    </div>
  );
};

export default MoreVehicleChecklistListContainer;
