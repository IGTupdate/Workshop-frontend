"use client";

import React, { useEffect, useState } from "react";
import { Button, Divider, Typography } from "antd";
import VehicleFuelDetailContainer from "./__components/VehicleFuelDetailContainer";
import { TWorkOrder } from "@/app/types/work-order";
import WorkOrderCustomerDetails from "./__components/WorkOrderCustomerDetails";
import WorkOrderObservations from "./__components/WorkOrderObservations";
import WorkOrdersPlansWorkContainer from "./__components/WorkOrdersPlansWorkContainer";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import Loader from "@/app/components/Loader";
import InventoryOrderContainer from "./__components/InventoryOrderContainer";
import { useRouter } from "next/navigation";
import WorkOrderMechanicDetailContainer from "./__components/WorkOrderMechanicDetailContainer";
import WorkOrderAdvisorDetails from "./__components/WorkOrderAdvisorDetails";
import WorkOrderServiceDetailContainer from "./__components/WorkOrderServiceDetailContainer";
import WorkOrderRampDetails from "./__components/WorkOrderRampDetails";
import { workOrderStatusText } from "../__utils/workOrderStatus";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { useAppSelector } from "@/app/store/reduxHooks";

const { Text, Title } = Typography;

type Props = {
  params: {
    workorderId: string;
  };
};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);

  const ability = useAbility();

  const { authData } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // load work order
  useEffect(() => {
    // console.log("hello from work order", props.params.workorderId);

    if (ability && ability.can(casl_action.get, casl_subject.workorder)) {
      if (props.params.workorderId) {
        (async function () {
          try {
            const required_workorder = await getWorkOrderById(
              props.params.workorderId,
              true,
            );
            setWorkOrder(required_workorder);
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        })();
      }
    }
  }, [props.params.workorderId, ability]);

  const handleUpdateWorkOrderData = (
    field: keyof TWorkOrder,
    fieldData: any,
  ) => {
    setWorkOrder((prv) => {
      return {
        ...prv,
        [field]: fieldData,
      } as TWorkOrder;
    });
  };

  return (
    <div className="p-4 bg-white rounded-md">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Loader />
        </div>
      ) : workOrder ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Work Order - #{workOrder.orderNumber}
            </h2>
            <div>
              {workOrderStatusText[workOrder.status]}

              {/* <Tag> {workOrder.status}</Tag> */}
            </div>
          </div>

          <div>
            <WorkOrderCustomerDetails
              vehicle={
                typeof workOrder.appointmentId !== "string"
                  ? workOrder.appointmentId.vehicle_id
                  : ""
              }
              customer={
                typeof workOrder.appointmentId !== "string"
                  ? workOrder.appointmentId.customer_id
                  : ""
              }
            />
            <Divider />
            <WorkOrderAdvisorDetails advisor={workOrder.advisorId} />
            <Divider />
            <WorkOrderMechanicDetailContainer
              advisorId={workOrder.advisorId}
              assigned_mechanics={workOrder.mechanicId}
              handleUpdateWorkOrderData={handleUpdateWorkOrderData}
            />
            <Divider />
            <WorkOrderRampDetails
              advisorId={workOrder.advisorId}
              ramp={workOrder.rampId}
              handleUpdateWorkOrderData={handleUpdateWorkOrderData}
            />
            <Divider />

            {workOrder.status === "Pending" ? (
              <div>
                {((typeof workOrder.advisorId === "string" &&
                  workOrder.advisorId === authData._id) ||
                  (typeof workOrder.advisorId !== "string" &&
                    workOrder.advisorId._id === authData._id)) && (
                  <div>
                    <Title level={5}>Prepare WorkOrder</Title>
                    <Button
                      type="primary"
                      onClick={() => {
                        router.push(
                          `/employee/dashboard/workorder/${props.params.workorderId}/prepare`,
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
                <WorkOrderServiceDetailContainer workOrder={workOrder} />
                <Divider />
                <WorkOrdersPlansWorkContainer
                  servicePlanId={workOrder.servicePlanId || []}
                  tasks={workOrder.tasks}
                />
                <Divider />
                <div className="grid grid-cols-2 gap-4">
                  <WorkOrderObservations
                    observations={workOrder.observations}
                  />
                  <VehicleFuelDetailContainer />
                </div>
                <Divider />
                <InventoryOrderContainer parts={workOrder.partsRequested} />
              </div>
            )}
            {/* <VehicleInspectionImagesContainer /> */}
          </div>
        </div>
      ) : (
        <Text>Work Order not found</Text>
      )}
    </div>
  );
};

export default Page;
