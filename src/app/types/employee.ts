import { TRamp } from "./ramp";

export type TEmployeeStatus = "active" | "inactive";

export type TEmployee = {
  userType: "employee";
  _id: string;
  fullName: string;
  email: string;
  status?: string;
  role?: string;
  roleId: string;
  contactNumber?: string;
};

export type TEmployeeWorkStatus = {
  _id: string;
  fullName: string;
  contactNumber: string;
  email: string;
  roleId: string;
  assigned_workOrder: {
    _id: string;
    ramdId?: TRamp | string;
    orderNumber: string;
    estimatedTimeOfCompletion?: string;
  }[];
};

export type TEmployeeTableDataType = {
  _id: string;
  fullName: string;
  contactNumber: string;
  email: string;
  status: string;
  role: string;
};

export type TRole = {
  _id: string;
  role: string;
};

export type TEmployeeDetails = {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  contactNumber: string;
  email: string;
  status: string;
  roleId: TRole;
  address?: string;
};
