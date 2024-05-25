import PrepareWorkOrderButtonContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/PrepareWorkOrderButtonContainer";
import VehicleFuelDetailContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/VehicleFuelDetailContainer";
import WorkOrderCustomerDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderCustomerDetails";
import WorkOrderObservations from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderObservations";
import WorkOrderServiceDetailContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderServiceDetailContainer";
import { TWorkOrder } from "@/app/types/work-order";
import React from "react";

type Props = {
  workOrderData: TWorkOrder | null;
};

const VehicleDetails = ({ workOrderData }: Props) => {
  return (
    <div>
      {workOrderData ? (
        <div className="bg-white p-4 rounded-xl shadow-xl">
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

          {workOrderData.status === "Pending" ? (
            <PrepareWorkOrderButtonContainer
              workOrderId={workOrderData._id || ""}
            />
          ) : (
            <div>
              <WorkOrderServiceDetailContainer workOrder={workOrderData} />

              <div className="grid items-center grid-flow-col-1 md:grid-cols-2 gap-4">
                <WorkOrderObservations
                  observations={
                    workOrderData?.observations &&
                    typeof workOrderData?.observations !== "string"
                      ? workOrderData?.observations
                      : []
                  }
                />
                <VehicleFuelDetailContainer
                  fuelQuantity={workOrderData?.fuelQuantity}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>WorkOrder Not Found</div>
      )}
    </div>
  );
};

export default VehicleDetails;
