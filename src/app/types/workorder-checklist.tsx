// import { vehicleChecklistStatusEnum, vehicleTypeEnum } from "../utils/constants/enums";

import {
  vehicleChecklistStatusEnum,
  vehicleTypeEnum,
} from "../utils/constants/checklistenum";
export interface IWorkorderChecklistDescription {
  text?: string;
  images?: string[];
}
export interface IWorkorderChecklistTask {
  name: string;
  status: vehicleChecklistStatusEnum;
  description?: IWorkorderChecklistDescription;
}
export interface IWorkorderChecklistCategory {
  name: string;
  tasks: IWorkorderChecklistTask[];
}
export interface IWorkorderChecklistChecklist {
  level: number;
  categories: IWorkorderChecklistCategory[];
}
export interface IWorkorderChecklistVehicle {
  type: vehicleTypeEnum;
  brand?: string;
  model?: string;
  year?: number;
}
export interface IWorkorderChecklist {
  vehicle: IWorkorderChecklistVehicle; // todo - remove this
  checklist: IWorkorderChecklistChecklist[];
  remarks?: string[];
}
