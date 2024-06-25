import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { setAuthLoading } from "@/app/store/slices/authSlice";
import { IVehicleChecklist } from "@/app/types/vehicle-checklist";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NEW_VEHICLE_CHECKLIST } from "../../../__utils/constant";
import { useForm } from "react-hook-form";
import { vehicleCheckListCreateYupSchema } from "@/app/validators/vehicle-checklist";
import { yupResolver } from "@hookform/resolvers/yup";
import VehicleCheckListCreateContainer from "../../../create/__components/VehicleCheckListCreateContainer";

type Props = {
  vehicleCheckListId: string;
};

const VehicleCheckListUpdateContainer = (props: Props) => {
  const [vehicleCheckList, setVehicleCheckList] =
    useState<IVehicleChecklist | null>(null);

  useEffect(() => {
    console.log(props.vehicleCheckListId);
    loadVehicleCheckList();
  }, []);

  const loadVehicleCheckList = async () => {
    try {
      const queryString = `_id=${props.vehicleCheckListId}`;
      const response = await getAllVehicleCheckList(queryString);
      console.log(response);
      if (response && response.data.length > 0) {
        setVehicleCheckList(response.data[0]);
      } else throw "";
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setAuthLoading(false);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      checklist: [NEW_VEHICLE_CHECKLIST],
      vehicle: {
        brand: "",
        model: "",
        type: "",
      },
    },
    resolver: yupResolver(vehicleCheckListCreateYupSchema),
  });

  return (
    <div>
      <VehicleCheckListCreateContainer />
    </div>
  );
};

export default VehicleCheckListUpdateContainer;
