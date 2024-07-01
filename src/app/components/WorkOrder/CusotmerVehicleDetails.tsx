import PrepareWorkOrderButtonContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/PrepareWorkOrderButtonContainer";
import VehicleFuelDetailContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/VehicleFuelDetailContainer";
import WorkOrderCustomerDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_details/WorkOrderCustomerDetails";
import WorkOrderObservations from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderObservations";
import WorkOrderServiceDetailContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderServiceDetailContainer";
import WorkOrderVehicleDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_details/WorkOrderVehicleDetails";
import { TWorkOrder } from "@/app/types/work-order";
import React from "react";

type Props = {
  workOrderData: TWorkOrder | null;
};

const CusotmerVehicleDetails = ({ workOrderData }: Props) => {
  return (
    <div>
      {workOrderData ? (
        <div className="bg-white p-4 rounded-xl shadow-xl">
          <WorkOrderCustomerDetails
            key="customer-details"
            // vehicle={
            //   workOrderData?.appointmentId &&
            //   typeof workOrderData.appointmentId !== "string"
            //     ? workOrderData.appointmentId.vehicle_id
            //     : ""
            // }
            customer={
              workOrderData?.appointmentId &&
              typeof workOrderData.appointmentId !== "string"
                ? workOrderData.appointmentId.customer_id
                : ""
            }
          />

          <WorkOrderVehicleDetails
            key="vehicle-details"
            vehicle={
              workOrderData?.appointmentId &&
              typeof workOrderData.appointmentId !== "string"
                ? workOrderData.appointmentId.vehicle_id
                : ""
            }
          />

          {workOrderData.status === "Pending" && (
            <PrepareWorkOrderButtonContainer
              workOrderId={workOrderData._id || ""}
            />
          )}
        </div>
      ) : (
        <div>WorkOrder Not Found</div>
      )}
    </div>
  );
};

export default CusotmerVehicleDetails;
