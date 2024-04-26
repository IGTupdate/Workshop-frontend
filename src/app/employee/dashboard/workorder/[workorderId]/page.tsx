"use client";

import React, { useEffect, useState } from "react";
import { Divider, Typography } from "antd";
import VehicleInspectionImagesContainer from "./__components/VehicleInspectionImagesContainer";
import VehicleFuelDetailContainer from "./__components/VehicleFuelDetailContainer";
import { TWorkOrder } from "@/app/types/work-order";
import WorkOrderCustomerDetails from "./__components/WorkOrderCustomerDetails";
import WorkOrderObservations from "./__components/WorkOrderObservations";
import WorkOrdersPlansWorkContainer from "./__components/WorkOrdersPlansWorkContainer";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import Loader from "@/app/components/Loader";

const { Text } = Typography;

type Props = {
  params: {
    workorderId: string;
  };
};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);

  // load work order
  useEffect(() => {
    if (props.params.workorderId) {
      (async function () {
        try {
          const required_workorder = await getWorkOrderById(
            props.params.workorderId,
            true
          );
          setWorkOrder(required_workorder);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [props.params.workorderId]);

  return (
    <div className="p-4 bg-white rounded-md">
      {loading ? (
        <Loader />
      ) : workOrder ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              WorkOrders - #{workOrder.orderNumber}
            </h2>
            <div></div>
          </div>

          <div>
            <WorkOrderCustomerDetails
            // customer={workOrder.appointmentId}
            // vehicle={""}
            />
            <Divider />
            <div className=" mt-4">
              <WorkOrdersPlansWorkContainer
                servicePlanId={workOrder.servicePlanId || []}
                tasks={workOrder.tasks}
              />
              <div className="grid grid-cols-2 gap-4">
                <WorkOrderObservations observations={workOrder.observations} />
                <VehicleFuelDetailContainer />
              </div>
              {/* <VehicleObservationContainer /> */}
              <VehicleInspectionImagesContainer />
            </div>
          </div>
        </div>
      ) : (
        <Text>Work Order not found</Text>
      )}
    </div>
  );
};

export default Page;