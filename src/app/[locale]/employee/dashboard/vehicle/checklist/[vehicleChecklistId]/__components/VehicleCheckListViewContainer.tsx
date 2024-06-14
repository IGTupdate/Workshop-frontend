"use client";

import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import Loader from "@/app/components/Loader";
import NotFound from "@/app/not-found";
import { getAllVehicleCheckList } from "@/app/services/operations/workorder/vehicle-checklist";
import { IVehicleChecklist } from "@/app/types/checklist";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { Typography, Watermark } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import VehicleCheckListContainer from "./VehicleCheckListContainer";

const { Title } = Typography;

type Props = {
  vehicleCheckListId: string;
};

const VehicleCheckListViewContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {vehicleCheckList === null ? (
            <NotFound />
          ) : (
            <div>
              {/* vehicle Description */}
              <div>
                <Title level={5}>Vehicle Description</Title>
                <div className="grid grid-cols-2 gap-3">
                  <DescriptionItem
                    title="Type"
                    content={vehicleCheckList.vehicle.type || "-"}
                  />
                  <DescriptionItem
                    title="Brand"
                    content={vehicleCheckList.vehicle.brand || "-"}
                  />
                  <DescriptionItem
                    title="Model"
                    content={vehicleCheckList.vehicle.model || "-"}
                  />
                  <DescriptionItem
                    title="Year"
                    content={vehicleCheckList.vehicle.year || "-"}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Title level={5}>CheckList Description</Title>
                <VehicleCheckListContainer
                  checkList={vehicleCheckList?.checklist}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleCheckListViewContainer;
