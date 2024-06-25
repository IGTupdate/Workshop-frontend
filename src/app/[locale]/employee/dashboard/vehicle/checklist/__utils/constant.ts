import {
  IChecklist,
  ICheckListCategory,
  ICheckListTask,
} from "@/app/types/vehicle-checklist";
import { vehicleChecklistStatusEnum } from "@/app/utils/constants/checklistenum";

export const NEW_VEHICLE_CHECKLIST_CATEGORY_TASK: ICheckListTask = {
  name: "",
  // status: vehicleChecklistStatusEnum.NOT_AVAILABLE,
};

export const NEW_VEHICLE_CHECKLIST_CATEGORY: ICheckListCategory = {
  name: "",
  tasks: [NEW_VEHICLE_CHECKLIST_CATEGORY_TASK],
};
export const NEW_VEHICLE_CHECKLIST: IChecklist = {
  level: 0,
  categories: [NEW_VEHICLE_CHECKLIST_CATEGORY],
};
