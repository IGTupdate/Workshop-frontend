import PrepareWorkOrderButtonContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/PrepareWorkOrderButtonContainer";
import WorkOrdersPlansWorkContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrdersPlansWorkContainer";
import { TWorkOrder } from "@/app/types/work-order";
import { Watermark } from "antd";
import React from "react";

type Props = {
  workOrderData: TWorkOrder | null;
  showAdditionalWorks?: boolean;
};

const ServicePlans = ({ workOrderData, showAdditionalWorks }: Props) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl">
      {workOrderData ? (
        workOrderData && workOrderData.status === "Pending" ? (
          <PrepareWorkOrderButtonContainer workOrderId={workOrderData._id} />
        ) : (
          <WorkOrdersPlansWorkContainer
            notes={workOrderData.notes || "-"}
            servicePlanId={workOrderData?.servicePlanId || []}
            tasks={workOrderData?.tasks || []}
            showAdditionalWorks={showAdditionalWorks}
            workOrderId={workOrderData?._id}
          />
        )
      ) : (
        <Watermark content={"No Work Order Found"} />
      )}
    </div>
  );
};

export default ServicePlans;
