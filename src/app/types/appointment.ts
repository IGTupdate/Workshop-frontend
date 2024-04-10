import { appointmentStatus } from "../employee/dashboard/appointment/__utils/appointmentStatus";
import { TCalender, TSlot } from "./calender";
import { TCustomer } from "./customer";
import { TVehicle } from "./vehicle";

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
  _id: string
  customer: {
    name: string;
    phone: string;
  };
  registeration_number: string;
  date_time: Date;
  status: TAppointmentStatus;
};


export type TAppointmentBook = {
  slot_id: string,
  calender_id: string,
  vehicle_id: string,
  customer_id: string
}