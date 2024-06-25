"use client";

import { Button } from "antd";
import React, { useState } from "react";
import VehicleCheckListBasedOnTypeContainer from "./VehicleCheckListBasedOnTypeContainer";
import { IChecklist, IVehicleChecklist } from "@/app/types/vehicle-checklist";
import { useParams, useRouter } from "next/navigation";

type Props = {
  vehicleCheckLists: IVehicleChecklist[];
};

const MoreVehicleChecklistListContainer = (props: Props) => {
  const [viewMore, setViewMore] = useState(false);
  const router = useRouter();
  const params = useParams();
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
          onCheckListSelect={(checkListId: string) => {
            router.push(
              `/employee/dashboard/workorder/${params.workorderId}/check/${checkListId}`,
            );
          }}
        />
      )}
    </div>
  );
};

export default MoreVehicleChecklistListContainer;
