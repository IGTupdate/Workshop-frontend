import { employeeRoleEnum } from "@/app/utils/constants/employee-roles";
import { workOrderStatusEnum } from "../../__utils/workOrderStatus";

export type TWorkOrderSteps = {
  name: string;
  statusForActive?: workOrderStatusEnum | workOrderStatusEnum[];
  route: string;
  role?: employeeRoleEnum;
};

export const workOrderSteps: TWorkOrderSteps[] = [
  {
    name: "Initial Check",
    route: "/prepare",
    role: employeeRoleEnum.ADVISOR,
    statusForActive: workOrderStatusEnum.Pending,
  },
  {
    name: "Mechanic Inspection",
    route: "/check?checklistType=technical",
    role: employeeRoleEnum.MECHANIC,
    statusForActive: [
      workOrderStatusEnum.InProgress,
      workOrderStatusEnum.Prepared,
    ],
  },
  {
    name: "Service Execution",
    route: "service-execution",
    role: employeeRoleEnum.MECHANIC,
    statusForActive: [
      workOrderStatusEnum.InProgress,
      workOrderStatusEnum.Prepared,
    ],
  },
  {
    name: "Final Inspection",
    route: "",
    statusForActive: workOrderStatusEnum.InProgress,
  },
  {
    name: "Washing",
    route: "",
    statusForActive: workOrderStatusEnum.Washing,
  },
];
