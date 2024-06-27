"use client";

import Loader from "@/app/components/Loader";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder } from "@/app/types/work-order";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VehicleChecklistListContainer from "../__components/vehicle_checklist/VehicleChecklistListContainer";

type Props = {};

const Page = (props: Props) => {
  const params = useParams();
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);
  const [inititalLoading, setInitialLoading] = useState(true);

  const searchParams = useSearchParams();

  const router = useRouter();

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

  useEffect(() => {
    const checklistType = searchParams.get("checklistType");
    if (
      checklistType &&
      workOrder &&
      workOrder.checklist &&
      workOrder.checklist[checklistType]
    ) {
      const requiredCheckist = workOrder.checklist[checklistType];
      let redirectUrl = `/employee/dashboard/workorder/${workOrder._id}/check/`;
      if (typeof requiredCheckist === "string") {
        redirectUrl += requiredCheckist;
      } else {
        redirectUrl += requiredCheckist._id;
      }

      // router.push(redirectUrl);
    }
  }, [workOrder, searchParams]);

  return (
    <div className="p-4 bg-white rounded-md">
      {inititalLoading ? (
        <Loader />
      ) : (
        <>
          <VehicleChecklistListContainer
            workOrderVehicle={
              typeof workOrder?.appointmentId !== "string" &&
              workOrder?.appointmentId.vehicle_id &&
              typeof workOrder?.appointmentId.vehicle_id !== "string"
                ? workOrder.appointmentId.vehicle_id
                : null
            }
            checklistType={searchParams.get("checklistType") || ""}
          />
        </>
      )}
    </div>
  );
};

export default Page;
