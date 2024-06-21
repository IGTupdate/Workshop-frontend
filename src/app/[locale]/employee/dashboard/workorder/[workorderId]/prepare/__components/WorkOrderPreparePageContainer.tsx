"use client";

import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import { TWorkOrder } from "@/app/types/work-order";
import {
  getWorkOrderById,
  updateWorkOrder,
} from "@/app/services/operations/workorder/workorder";
import WorkOrderFormContainer from "./WorkOrderFormContainer";
import Loader from "@/app/components/Loader";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { useAppSelector } from "@/app/store/reduxHooks";

import {
  workOrderStatus,
  workOrderStatusEnum,
} from "../../../__utils/workOrderStatus";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import WorkOrderPrepareStepContainer from "./WorkOrderPrepareStepContainer";

const { Title, Text } = Typography;

type Props = {
  workOrderId: string;
};

const WorkOrderPreparePageContainer = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);

  const router = useRouter();

  const ability = useAbility();
  const { authData } = useAppSelector((state) => state.auth);

  const { accessData } = useAppSelector((state) => state.access);

  // load work order
  useEffect(() => {
    if (ability && ability.can(casl_action.update, casl_subject.workorder)) {
      if (props.workOrderId) {
        loadWorkorder(props.workOrderId);
      }
    }
  }, [props.workOrderId, ability]);

  const loadWorkorder = async (workOrderId: string) => {
    try {
      setLoading(true);
      const required_workorder = await getWorkOrderById(workOrderId);
      if (required_workorder?.status === workOrderStatusEnum.Pending) {
        setWorkOrder(required_workorder);
      } else {
        toast("WorkOrder Already Prepared.");
        router.push(`/admin/dashboard/workorder/${workOrderId}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div>
          {workOrder ? (
            <div>
              <Title level={5}>Work Order for #{workOrder.orderNumber}</Title>
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
