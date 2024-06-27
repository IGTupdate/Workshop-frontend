"use client";

import useAbility from "@/app/__hooks/useAbility";
import Loader from "@/app/components/Loader";
import Watermark from "@/app/components/Text/WatermarkText";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder } from "@/app/types/work-order";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  isStatusCompleted,
  workOrderStatusEnum,
  workOrderStatusText,
} from "../../__utils/workOrderStatus";
import ServiceExecutionPageContainer from "./__components/ServiceExecutionPageContainer";
import UpdateWorkOrderToInProgressContainer from "./__components/UpdateWorkOrderToInProgressContainer";
import { useAppSelector } from "@/app/store/reduxHooks";
import { employeeRoleEnum } from "@/app/utils/constants/employee-roles";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);
  const { authData } = useAppSelector((state) => state.auth);

  const ability = useAbility();
  const params = useParams();
  const router = useRouter();

  // accesible by only mechanic
  useEffect(() => {
    if (authData.role && authData.role !== employeeRoleEnum.MECHANIC) {
      router.push(`/employee/dashboard/workorder/${params.workorderId}`);
      return;
    }
  }, [authData]);

  // load work order
  useEffect(() => {
    if (ability && ability.can(casl_action.get, casl_subject.workorder)) {
      if (params.workorderId) {
        (async function () {
          try {
            const required_workorder = await getWorkOrderById(
              params.workorderId as string,
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
  }, [params.workorderId, ability]);

  const handleUpdateWorkOrder = (key: string, value: any) => {
    setWorkOrder((prv) => {
      return {
        ...prv,
        [key]: value,
      } as TWorkOrder;
    });
  };

  return (
    <div className="p-4 bg-white rounded-md">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : workOrder ? (
        <div>
          <div className="flex font-kanit justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              Work Order - #{workOrder?.orderNumber}
            </h2>
            {workOrderStatusText[workOrder?.status]}
          </div>

          {isStatusCompleted(workOrderStatusEnum.Prepared, workOrder.status) ? (
            <ServiceExecutionPageContainer workOrder={workOrder} />
          ) : (
            <UpdateWorkOrderToInProgressContainer
              workOrder={workOrder}
              handleUpdateWorkOrder={handleUpdateWorkOrder}
            />
          )}
        </div>
      ) : (
        <div style={{ height: "calc(100vh - 200px)" }} className="relative">
          <Watermark text="Work Order not found" />
        </div>
      )}
    </div>
  );
};

export default Page;
