"use client";

import { IChecklist, IVehicleChecklist } from "@/app/types/checklist";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import MoreVehicleChecklistListContainer from "./MoreVehicleChecklistListContainer";
import VehicleCheckListBasedOnTypeContainer from "./VehicleCheckListBasedOnTypeContainer";
import Loader from "@/app/components/Loader";
import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import RecommandedChecklistList from "./RecommandedChecklistList";
import { TWorkOrder } from "@/app/types/work-order";
import { TVehicle } from "@/app/types/vehicle";

const { Title } = Typography;

type Props = {
  workOrderVehicle: TVehicle | null;
};

const VehicleChecklistListContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);

  const [vehicleCheckLists, setVehicleCheckLists] = useState<
    IVehicleChecklist[]
  >([]);

  useEffect(() => {
    loadAllCheckList();
  }, []);

  const loadAllCheckList = async () => {
    setLoading(true);
    try {
      const response = await getAllVehicleCheckList();
      console.log(response);
      setVehicleCheckLists(response.data as IVehicleChecklist[]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          {/* recommanded checks */}
          <RecommandedChecklistList
            workOrderVehicle={props.workOrderVehicle}
            vehicleCheckLists={vehicleCheckLists}
          />

          <div className="mt-4">
            <MoreVehicleChecklistListContainer
              vehicleCheckLists={vehicleCheckLists}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleChecklistListContainer;
