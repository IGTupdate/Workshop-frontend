import VehicleCheckListContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/check/[vehicleCheckListId]/__components/VehicleCheckListContainer";
import VehicleChecklistListContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_checklist/VehicleChecklistListContainer";
import { TVehicle } from "@/app/types/vehicle";
import React from "react";

type Props = {
  workOrderVehicle: TVehicle | null;
};

const VehicleCheckList = (props: Props) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl">
      {/* <VehicleCheckListContainer /> */}
      <VehicleChecklistListContainer
        workOrderVehicle={props.workOrderVehicle}
      />
    </div>
  );
};

export default VehicleCheckList;
