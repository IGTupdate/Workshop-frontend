"use client";

import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { TWorkOrder } from "@/app/types/work-order";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import WorkOrderFormContainer from "./WorkOrderFormContainer";
import Loader from "@/app/components/Loader";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { useAppSelector } from "@/app/store/reduxHooks";
import WorkOrderPrepareStepContainer from "./WorkOrderPrepareStepContainer";

const { Title, Text } = Typography;

type Props = {
  workOrderId: string;
};

const WorkOrderPreparePageContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);

  const ability = useAbility();
  const { authData } = useAppSelector((state) => state.auth);

  const { accessData } = useAppSelector((state) => state.access);

  // load work order
  useEffect(() => {
    console.log(accessData);
    if (ability && ability.can(casl_action.update, casl_subject.workorder)) {
      if (props.workOrderId) {
        loadWorkorder(props.workOrderId);
      }
    }
  }, [props.workOrderId, ability]);

  const loadWorkorder = async (workOrderId: string) => {
    try {
      const required_workorder = await getWorkOrderById(workOrderId);
      setWorkOrder(required_workorder);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(ability?.can(casl_action.update, casl_subject.workorder));
  console.log(workOrder);

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
              {/* <WorkOrderFormContainer workOrder={workOrder} /> */}
              <WorkOrderPrepareStepContainer workOrder={workOrder} />
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
