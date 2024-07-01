import {
  vehicleChecklistStatusEnum,
  vehicleTypeEnum,
} from "../utils/constants/checklistenum";

export interface ICheckListTask {
  name: string;
  // status: vehicleChecklistStatusEnum;
}
export interface ICheckListCategory {
  name: string;
  tasks: ICheckListTask[];
}
export interface IChecklist {
  level: number;
  categories: ICheckListCategory[];
}
export interface ICheckListVehicle {
  type: vehicleTypeEnum;
  brand?: string;
  model?: string;
  year?: number;
}
export interface IVehicleChecklist {
  _id: string;
  vehicle: ICheckListVehicle;
  checklist: IChecklist[];
  remarks?: string[];
}

export type TVehicleCheckListDataTable = {
  _id: string;
  vehicle_type: vehicleTypeEnum;
  vehicle: ICheckListVehicle;
  remarks: string;
  levels: number;
};

export type TVehicleEntry = {
  entryTime: string;
  exitTime: string;
  registrationNumber: string;
  _id: string;
};
