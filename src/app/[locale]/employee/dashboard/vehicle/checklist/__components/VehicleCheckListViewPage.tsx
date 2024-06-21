"use client";

import VehicleCheckList from "@/app/components/WorkOrder/VehicleCheckList";
import React, { useEffect, useState } from "react";
import VehicleCheckListTableContainer from "./VehicleCheckListTableContainer";
import Loader from "@/app/components/Loader";
import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import {
  IVehicleChecklist,
  TVehicleCheckListDataTable,
} from "@/app/types/checklist";
import { setLocale } from "yup";

type Props = {};

const VehicleCheckListViewPage = (props: Props) => {
  const [vehicleCheckListsLoading, setVehicleCheckListsLoading] =
    useState(true);

  const [vehicleCheckLists, setVehicleCheckLists] = useState<
    TVehicleCheckListDataTable[]
  >([]);

  useEffect(() => {
    loadVehicleCheckLists();
  }, []);

  const loadVehicleCheckLists = async () => {
    try {
      const response = await getAllVehicleCheckList();
      console.log(response);

      if (response.data) {
        const vehicleCheckListsData = response.data as IVehicleChecklist[];
        setVehicleCheckLists(() => {
          return vehicleCheckListsData.map((list, index) => {
            return {
              _id: list._id,
              levels: list.checklist.length,
              vehicle_type: list.vehicle.type,
              vehicle: list.vehicle,
              remarks: list.remarks?.toString() || "",
            };
          });
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setVehicleCheckListsLoading(false);
    }
  };
  return (
    <div>
      {vehicleCheckListsLoading ? (
        <div
          style={{ height: "calc(100vh - 300px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div>
          <VehicleCheckListTableContainer
            vehicleCheckLists={vehicleCheckLists}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleCheckListViewPage;
