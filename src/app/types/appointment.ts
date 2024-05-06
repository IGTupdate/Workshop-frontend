import { TCalender, TSlot } from "./calender";
import { TCustomer } from "./customer";
import { TVehicle } from "./vehicle";
import { TWorkOrderStatus } from "./work-order";

export type TAppointmentStatus =
  | "Missed"
  | "Scheduled"
  | "Assigned"
  | "Completed"
  | "Cancelled"
  | "Pending";

export type TAppointment = {
  _id: string;
  vehicle_id: TVehicle | string;
  customer_id: string | TCustomer;
  calender_id: string | TCalender;
  slot_id: string | TSlot;
  extensions: any[];
  service_plans: string[] | [];
  service_description: string[] | [];
  status: TAppointmentStatus;
  bookedBy: {
    role_id: string;
    user_id: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TAppointmentDataTable = {
  _id: string;

  name: string;
  phone: string;

  registeration_number: string;
  date_time: Date;
  status: TAppointmentStatus;
};


export type TAppointmentBook = {
  slot_id: string,
  calender_id: string,
  vehicle_id: string,
  customer_id: string,
  service_plans?: string[] | [],
  service_description?: string[] | [],
  showServicePlans?: boolean;
};

export type TAppointmentReschedule = {
  slot_id: string,
  calender_id: string;
};

export type TAppointmentWorkOrderStatus = {
  appointmentId:string,
  appointmentStatus : TAppointmentStatus,
  workOrderId?:string,
  workOrderStatus: TWorkOrderStatus
}