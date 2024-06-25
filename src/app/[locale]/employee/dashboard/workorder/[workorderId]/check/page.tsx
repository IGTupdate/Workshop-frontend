"use client";

import VehicleCheckList from "@/app/components/WorkOrder/VehicleCheckList";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder } from "@/app/types/work-order";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { workOrderStatusEnum } from "../../__utils/workOrderStatus";
import { TVehicle } from "@/app/types/vehicle";
import Loader from "@/app/components/Loader";

type Props = {};

const Page = (props: Props) => {
  const params = useParams();
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);
  const [inititalLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadWorkOrder();
  }, [params]);

  const loadWorkOrder = async () => {
    setInitialLoading(true);
    try {
      const workOrderId = params.workorderId as string;

      const required_workorder = (await getWorkOrderById(
        workOrderId,
        true,
      )) as TWorkOrder;
      // if(required_workorder.checklist)
      setWorkOrder(required_workorder);
    } catch (err) {
      console.log(err);
    } finally {
      setInitialLoading(false);
    }
  };
  return (
    <div className="">
      {inititalLoading ? (
        <Loader />
      ) : (
        <VehicleCheckList
          workOrderCheckList={
            workOrder?.checklist
              ? typeof workOrder.checklist["technical"] === "string"
                ? null
                : workOrder.checklist["technical"]
              : null
          }
          workOrderVehicle={
            typeof workOrder?.appointmentId === "string"
              ? null
              : (workOrder?.appointmentId.vehicle_id as TVehicle)
          }
          workOrderStatus={workOrder?.status || workOrderStatusEnum.Pending}
          workorderId={workOrder?._id || ""}
        />
      )}
    </div>
  );
};

export default Page;
