import { NEW_RAMP } from "../employee/dashboard/ramp/_utils/constants";
import { TWorkOrder } from "./work-order";

export type TRamp = {
  name: string;
  location?: string;
  _id?: string;
  isActive?: boolean;
};

export type TRampDetails = TRamp & {
  assigned_workOrder?: TWorkOrder[];
};

export type TActiveRampNewRamp = {
  type: "newramp";
  value: typeof NEW_RAMP;
};

export type TActiveRampRamp = {
  type: "ramp";
  value: TRamp;
};

export type TActiveRampWorkOrder = {
  type: "workorder";
  value: TWorkOrder[];
};

export type TActiveRamp =
  | TActiveRampRamp
  | null
  | TActiveRampNewRamp
  | TActiveRampWorkOrder;
