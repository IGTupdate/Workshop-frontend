"use client";
import InventoryOrderContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/InventoryOrderContainer";
import WorkOrderAdvisorDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderAdvisorDetails";
import WorkOrderMechanicDetailContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderMechanicDetailContainer";
import WorkOrderRampDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderRampDetails";
import { useAppSelector } from "@/app/store/reduxHooks";
import { TWorkOrder } from "@/app/types/work-order";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React from "react";
type Props = {
  workOrderData: TWorkOrder | null;
  handleUpdateWorkOrderData: any;
  params: {
    workorderId: string;
  };
};
const StaffAndRamps = ({
  workOrderData,
  handleUpdateWorkOrderData,
  params,
}: Props) => {
  const { authData } = useAppSelector((state) => state.auth);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 bg-white p-4 rounded-xl shadow-xl">
      <WorkOrderAdvisorDetails
        advisor={
          workOrderData?.advisorId &&
          typeof workOrderData?.advisorId !== "string"
            ? workOrderData?.advisorId
            : ""
        }
      />

      <WorkOrderMechanicDetailContainer
        advisorId={workOrderData?.advisorId || ""}
        assigned_mechanics={workOrderData?.mechanicId || []}
        handleUpdateWorkOrderData={handleUpdateWorkOrderData}
      />

      <WorkOrderRampDetails
        advisorId={workOrderData?.advisorId || ""}
        ramp={workOrderData?.rampId || ""}
        handleUpdateWorkOrderData={handleUpdateWorkOrderData}
      />

      {/* {workOrderData?.status === "Pending" ? (
        <div>
          {((typeof workOrderData.advisorId === "string" &&
            workOrderData.advisorId === authData._id) ||
            (typeof workOrderData.advisorId !== "string" &&
              workOrderData.advisorId._id === authData._id)) && (
            <div>
              <Title level={5}>Prepare WorkOrder</Title>
              <Button
                type="primary"
                onClick={() => {
                  router.push(
                    `/employee/dashboard/workorder/${params.workorderId}/prepare`,
                  );
                }}
              >
                Prepare
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <InventoryOrderContainer
            parts={workOrderData?.partsRequested || []}
          />
        </div>
      )} */}
      {/* <VehicleInspectionImagesContainer /> */}
    </div>
  );
};

export default StaffAndRamps;
