import WorkOrderCustomerDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderCustomerDetails";
import WorkOrderServiceDetailContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderServiceDetailContainer";
import { TWorkOrder } from "@/app/types/work-order";
import React from "react";

type Props = {
  workOrderData: TWorkOrder | null;
};

const VehicleDetails = ({ workOrderData }: Props) => {
  return (
    <div>
      <WorkOrderCustomerDetails
        key="customer-details"
        vehicle={
          workOrderData?.appointmentId &&
          typeof workOrderData.appointmentId !== "string"
            ? workOrderData.appointmentId.vehicle_id
            : ""
        }
        customer={
          workOrderData?.appointmentId &&
          typeof workOrderData.appointmentId !== "string"
            ? workOrderData.appointmentId.customer_id
            : ""
        }
      />

      <WorkOrderServiceDetailContainer workOrder={workOrderData} />
    </div>
  );
};

export default VehicleDetails;
