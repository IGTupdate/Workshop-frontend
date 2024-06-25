import { TWorkOrder } from "@/app/types/work-order";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import {
  isStatusCompleted,
  workOrderStatusEnum,
} from "../../__utils/workOrderStatus";
import { workOrderSteps } from "../__utils/work_order_steps";
import { useAppSelector } from "@/app/store/reduxHooks";
import { employeeRoleEnum } from "@/app/utils/constants/employee-roles";

type Props = {
  workOrder: TWorkOrder | null;
};

const WorkOrderStepsAction = (props: Props) => {
  const router = useRouter();
  const { authData } = useAppSelector((state) => state.auth);

  const [workOrderStepForUser, setWorkOrderForUser] = useState<
    {
      name: string;
      route: string;
      statusForActive?: workOrderStatusEnum;
      role?: employeeRoleEnum;
    }[]
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

  // console.log((props.workOrder?.status === el.statusForActive && authData.role === el.role))
  return (
    <div className="mt-6">
      <div className="">
        {workOrderStepForUser.map((el, index) => {
          return (
            <div
              key={index}
              className={`mb-4 w-1/2 border p-2 flex justify-between items-center ${isStatusCompleted(el.statusForActive || "", props.workOrder?.status || "") ? "bg-gray-300" : "hover:bg-gray-200"}`}
            >
              <div className="flex gap-3 items-start">
                <div className="w-12 h-12 border rounded-full bg-[#ededff]"></div>
                <div>
                  <h2 className="font-medium">{el.name}</h2>
                  <p>Pending</p>
                </div>
              </div>
              <div>
                <button
                  disabled={!(props.workOrder?.status === el.statusForActive)}
                  onClick={() => {
                    router.push(
                      `/employee/dashboard/workorder/${props?.workOrder?._id}/${el.route}`,
                    );
                  }}
                >
                  {props.workOrder?.status === el.statusForActive &&
                  authData.role === el.role ? (
                    <FaAngleRight size={20} />
                  ) : isStatusCompleted(
                      el.statusForActive || "",
                      props.workOrder?.status || "",
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
