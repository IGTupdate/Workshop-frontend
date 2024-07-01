import React, { useEffect, useState } from "react";
import VehicleCheckListBasedOnTypeContainer from "./VehicleCheckListBasedOnTypeContainer";
import { IVehicleChecklist } from "@/app/types/checklist";
import { TVehicle } from "@/app/types/vehicle";

type Props = {
  vehicleCheckLists: IVehicleChecklist[];
  workOrderVehicle: TVehicle | null;
};

const RecommandedChecklistList = (props: Props) => {
  const [recommandedCheckList, setRecommandedCheckList] = useState<
    IVehicleChecklist[]
  >([]);

  useEffect(() => {
    setRecommandedCheckList(() => {
      return props.vehicleCheckLists.filter((item) => {
        if (!props.workOrderVehicle) return false;
        if (
          props.workOrderVehicle.vehicle_type.toLocaleLowerCase() ===
            item.vehicle.type.toLocaleLowerCase() &&
          props.workOrderVehicle.vehicle_model.toLocaleLowerCase() ===
            item.vehicle.brand?.toLocaleLowerCase()
        )
          return true;
        return false;
      });
    });
  }, [props.vehicleCheckLists]);

  return (
    <div>
      <VehicleCheckListBasedOnTypeContainer
        heading="Recommanded Checks"
        checkListItem={recommandedCheckList}
      />
    </div>
  );
};

export default RecommandedChecklistList;
