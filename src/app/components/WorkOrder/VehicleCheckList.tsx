"use client";

import PrepareWorkOrderButtonContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/PrepareWorkOrderButtonContainer";
import VehicleChecklistListContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_checklist/VehicleChecklistListContainer";
import WorkOrderCheckListView from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/vehicle_checklist/WorkOrderCheckListView";
import { workOrderStatusEnum } from "@/app/[locale]/employee/dashboard/workorder/__utils/workOrderStatus";
import useAbility from "@/app/__hooks/useAbility";
import { useAppSelector } from "@/app/store/reduxHooks";
import { TVehicle } from "@/app/types/vehicle";
import { TWorkOrderStatus } from "@/app/types/work-order";
import { IWorkorderChecklist } from "@/app/types/workorder-checklist";
import { employeeRoleEnum } from "@/app/utils/constants/employee-roles";
import DescriptionItem from "../DescriptionItem.tsx";
import { Typography } from "antd";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
// import { casl_action, casl_subject } from "@/app/utils/casl/constant.js";

const { Title } = Typography;

type Props = {
  workOrderVehicle: TVehicle | null;
  workOrderCheckList: Record<string, string | IWorkorderChecklist>;
  workOrderStatus: TWorkOrderStatus;
  workorderId: string;
};

const VehicleCheckList = (props: Props) => {
  const { authData } = useAppSelector((state) => state.auth);

  const ability = useAbility();

  console.log(props.workOrderCheckList);

  return (
    <div className="bg-white p-4 rounded-xl shadow-xl">
      {props.workOrderStatus !== workOrderStatusEnum.Pending ? (
        <div>
          {Object.keys(props.workOrderCheckList).map((key_list, index) => {
            return (
              <div key={index} className="mb-5 border-b">
                <WorkOrderCheckListView
                  checklist={
                    props.workOrderCheckList &&
                    props.workOrderCheckList[key_list] &&
                    typeof props.workOrderCheckList[key_list] !== "string"
                      ? (props.workOrderCheckList[
                          key_list
                        ] as IWorkorderChecklist)
                      : null
                  }
                  type={key_list}
                />
              </div>
            );
          })}
          {/* {props.workOrderCheckList ? (
            <></>
            // <WorkOrderCheckListView checklist={props.workOrderCheckList && props.workOrderCheckList[clist]} />
          ) : (
            <div className="mb-5">
              <Title level={4}>Checklist</Title>
              <p>Not Performed Checks till now</p>
            </div>
          )} */}
          {/* {ability?.can(
            casl_action.update,
            casl_subject.workorder,
            "checklist",
          ) && (
              <VehicleChecklistListContainer
                workOrderVehicle={props.workOrderVehicle}
              />
            )} */}
        </div>
      ) : (
        <PrepareWorkOrderButtonContainer workOrderId={props.workorderId} />
      )}
    </div>
  );
};

export default VehicleCheckList;
