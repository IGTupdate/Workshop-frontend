import VehicleCheckListContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_checklist/VehicleCheckListContainer";
import React from "react";

type Props = {};

const VehicleCheckList = (props: Props) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl">
      <VehicleCheckListContainer />
    </div>
  );
};

export default VehicleCheckList;
