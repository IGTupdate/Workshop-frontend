"use client";

import Loader from "@/app/components/Loader";
import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { IVehicleChecklist } from "@/app/types/checklist";
import { TVehicle } from "@/app/types/vehicle";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import MoreVehicleChecklistListContainer from "./MoreVehicleChecklistListContainer";
import RecommandedChecklistList from "./RecommandedChecklistList";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";

const { Title } = Typography;

type Props = {
  workOrderVehicle: TVehicle | null;
};

const VehicleChecklistListContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);

  const [vehicleCheckLists, setVehicleCheckLists] = useState<
    IVehicleChecklist[]
  >([]);

  const ability = useAbility();

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
          {ability?.can(
            casl_action.update,
            casl_subject.workorder,
            "checklist",
          ) && (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleChecklistListContainer;
