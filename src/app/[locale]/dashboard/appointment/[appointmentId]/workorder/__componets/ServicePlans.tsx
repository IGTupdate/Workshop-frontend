import WorkOrdersPlansWorkContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrdersPlansWorkContainer";
import { TWorkOrder } from "@/app/types/work-order";
import React from "react";

type Props = {
  workOrderData: TWorkOrder | null;
  showAdditionalWorks?: boolean;
};

const ServicePlans = ({ workOrderData, showAdditionalWorks }: Props) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl">
      <WorkOrdersPlansWorkContainer
        servicePlanId={workOrderData?.servicePlanId || []}
        tasks={workOrderData?.tasks || []}
        showAdditionalWorks={showAdditionalWorks}
        workOrderId={workOrderData?._id}
      />
    </div>
  );
};

export default ServicePlans;
