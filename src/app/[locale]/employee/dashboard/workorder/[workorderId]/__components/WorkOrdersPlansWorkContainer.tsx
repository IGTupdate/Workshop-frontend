"use client";
import React from "react";
import ServicePlanDetailContainer from "./ServicePlanDetailContainer";
import { Button, Typography } from "antd";
import { TServicePlans } from "@/app/types/service";
import { TTask } from "@/app/types/work-order";
import AdditionalWorkRequest from "./AdditionalWorkRequest";
import { usePathname, useRouter } from "next/navigation";
const { Title, Text } = Typography;

type Props = {
  servicePlanId: string[] | TServicePlans[];
  tasks: TTask[];
  showAdditionalWorks?: boolean;
  workOrderId?: string;
};

const WorkOrdersPlansWorkContainer = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").slice(-2)[0];
  return (
    <div>
      {/* <Title level={5}>Work to be done</Title> */}
      <div>
        {/* service plans opted */}
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <Title level={5}>Service Plan Opted</Title>

            {!props.showAdditionalWorks && (
              <Button
                onClick={() =>
                  router.push(
                    `/dashboard/appointment/${id}/workorder/${props.workOrderId}/additionalWorks`,
                  )
                }
              >
                Addition Works
              </Button>
            )}
          </div>
          {props.servicePlanId && props.servicePlanId.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 gap-2">
                {props.servicePlanId.map((plan, index) => {
                  return (
                    <ServicePlanDetailContainer
                      key={index}
                      servicePlan={plan}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div>No plans Opted</div>
          )}
        </div>

        {/* tasks */}
        <div className="mt-4">
          <div className="flex flex-wrap justify-between items-center">
            <Title level={5}>Tasks</Title>
          </div>
          {props.tasks && props.tasks.length > 0 ? (
            <ul className="flex flex-wrap justify-between items-center">
              {props.tasks.map((el, index) => {
                return (
                  <li
                    key={index}
                    className='w-full md:w-1/2 relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300 mb-2'
                  >
                    <p>{el.title}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>No tasks found</div>
          )}
        </div>

        {props.showAdditionalWorks ? (
          <div className="mt-4">
            <AdditionalWorkRequest />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WorkOrdersPlansWorkContainer;
