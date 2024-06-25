import { employeeRoleEnum } from "@/app/utils/constants/employee-roles";
import { workOrderStatusEnum } from "../../__utils/workOrderStatus";

export const workOrderSteps: {
  name: string;
  statusForActive?: workOrderStatusEnum;
  route: string;
  role?: employeeRoleEnum;
}[] = [
  {
    name: "Initial Check",
    route: "/prepare",
    role: employeeRoleEnum.ADVISOR,
    statusForActive: workOrderStatusEnum.Pending,
  },
  {
    name: "Mechanic Inspection",
    route: "/check",
    role: employeeRoleEnum.MECHANIC,
    statusForActive: workOrderStatusEnum.Prepared,
  },
  {
    name: "Service Execution",
    route: "service-execution",
    role: employeeRoleEnum.MECHANIC,
    statusForActive: workOrderStatusEnum.InProgress,
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
