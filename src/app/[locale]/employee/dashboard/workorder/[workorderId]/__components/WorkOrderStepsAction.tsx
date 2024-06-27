import { useAppSelector } from "@/app/store/reduxHooks";
import { TWorkOrder } from "@/app/types/work-order";
import { employeeRoleEnum } from "@/app/utils/constants/employee-roles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleRight, FaCheck } from "react-icons/fa6";
import {
  isStatusCompleted,
  workOrderStatusEnum,
} from "../../__utils/workOrderStatus";
import { TWorkOrderSteps, workOrderSteps } from "../__utils/work_order_steps";

type Props = {
  workOrder: TWorkOrder | null;
};

const WorkOrderStepsAction = (props: Props) => {
  const router = useRouter();
  const { authData } = useAppSelector((state) => state.auth);

  const [workOrderStepForUser, setWorkOrderForUser] = useState<
    TWorkOrderSteps[]
  >([]);

  useEffect(() => {
    setWorkOrderForUser(() => {
      return workOrderSteps.filter((item) => {
        if (
          authData.role === employeeRoleEnum.ADVISOR ||
          authData.role === employeeRoleEnum.RECEPTOINIST
        ) {
          return true;
        } else if (item.role) {
          return item.role === authData.role;
        }
        return false;
      });
    });
  }, [authData]);

  const isStepCompleted = (
    workOrderStep: TWorkOrderSteps,
    currentWorkOrderStatus: workOrderStatusEnum,
  ) => {
    if (workOrderStep.statusForActive) {
      if (typeof workOrderStep.statusForActive === "string") {
        return isStatusCompleted(
          workOrderStep.statusForActive,
          currentWorkOrderStatus,
        );
      } else {
        for (const stts of workOrderStep.statusForActive) {
          if (!isStatusCompleted(stts, currentWorkOrderStatus)) {
            return false;
          }
        }
      }
    }
    return false;
  };

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="">
        {workOrderStepForUser.map((el, index) => {
          return (
            <div
              key={index}
              className={`mb-4 w-1/2 border p-2 flex justify-between items-center ${isStepCompleted(el, props.workOrder?.status as workOrderStatusEnum) ? "bg-gray-300" : "hover:bg-gray-200"}`}
            >
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 border rounded-full bg-[#ededff]"></div>
                <div>
                  <h2 className="font-medium">{el.name}</h2>
                  <p>
                    {isStepCompleted(
                      el,
                      props.workOrder?.status as workOrderStatusEnum,
                    )
                      ? "Completed"
                      : ""}
                    {/* {el.statusForActive ? "Pending" : isStatusCompleted(el.statusForActive || "", props.workOrder?.status || "") ? "Completed" : "-"} */}
                  </p>
                </div>
              </div>
              <div>
                <button
                  disabled={
                    !(
                      props.workOrder?.status === el.statusForActive ||
                      el.statusForActive?.includes(
                        props.workOrder?.status as workOrderStatusEnum,
                      )
                    )
                  }
                  onClick={() => {
                    router.push(
                      `/employee/dashboard/workorder/${props?.workOrder?._id}/${el.route}`,
                    );
                  }}
                >
                  {(props.workOrder?.status === el.statusForActive ||
                    el.statusForActive?.includes(
                      props.workOrder?.status as workOrderStatusEnum,
                    )) &&
                  authData.role === el.role ? (
                    <FaAngleRight size={20} />
                  ) : isStepCompleted(
                      el,
                      props.workOrder?.status as workOrderStatusEnum,
                    ) ? (
                    <FaCheck size={20} />
                  ) : (
                    ""
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkOrderStepsAction;
