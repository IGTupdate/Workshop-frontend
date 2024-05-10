"use client";

import { Typography } from "antd";
import React, { useEffect, useState } from "react";

import { TWorkOrder } from "@/app/types/work-order";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import WorkOrderFormContainer from "./WorkOrderFormContainer";
import Loader from "@/app/components/Loader";

const { Title, Text } = Typography;

type Props = {
  workOrderId: string;
};

const WorkOrderPreparePageContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);

  // load work order
  useEffect(() => {
    if (props.workOrderId) {
      (async function () {
        try {
          const required_workorder = await getWorkOrderById(props.workOrderId);
          setWorkOrder(required_workorder);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [props.workOrderId]);

  useEffect(() => {
    console.log(workOrder);
  }, [workOrder]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Loader />
        </div>
      ) : (
        <div>
          {workOrder ? (
            <div>
              <Title level={5} className="mb-8">
                Work Order for #{workOrder.orderNumber}
              </Title>
              <WorkOrderFormContainer workOrder={workOrder} />
            </div>
          ) : (
            <Text>Work Order Not Found</Text>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkOrderPreparePageContainer;
