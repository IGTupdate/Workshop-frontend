"use client";

import React, { useEffect, useState } from "react";
import VehicleCheckListManageContainer from "../__components/VehicleCheckListManageContainer";
import { TvehicleCheckListCreateYupSchema } from "@/app/validators/vehicle-checklist";
import {
  getAllVehicleCheckList,
  updateVehicleCheckList,
} from "@/app/services/operations/workorder/vehicle-checklist";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IVehicleChecklist } from "@/app/types/vehicle-checklist";
import Loader from "@/app/components/Loader";

type Props = {
  params: {
    vehicleChecklistId: string;
  };
};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [vehicleCheckList, setVehicleCheckList] =
    useState<IVehicleChecklist | null>(null);

  const router = useRouter();

  // fetching
  useEffect(() => {
    loadVehicleCheckList();
  }, []);

  const loadVehicleCheckList = async () => {
    try {
      const queryString = `_id=${props.params.vehicleChecklistId}`;
      const response = await getAllVehicleCheckList(queryString);
      console.log(response);
      if (response && response.data.length > 0) {
        setVehicleCheckList(response.data[0]);
      } else throw "";
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TvehicleCheckListCreateYupSchema) => {
    console.log(data);
    try {
      const response = await updateVehicleCheckList(
        props.params.vehicleChecklistId,
        data,
      );
      toast.success(response.message);
      console.log(response);
      router.push(
        `/employee/dashboard/vehicle/checklist/${props.params.vehicleChecklistId}`,
      );
    } catch (err: any) {
      toast.error(err?.response?.data?.message || COMMON_ERROR);
      console.log(err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Update CheckList</h2>
          </div>

          {vehicleCheckList ? (
            <VehicleCheckListManageContainer
              handleOnSave={onSubmit}
              defaultData={vehicleCheckList}
            />
          ) : (
            <>Not found</>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
