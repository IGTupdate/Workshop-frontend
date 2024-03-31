import { TAppointmentStatus } from "@/app/types/appointment";
import { ReactNode } from "react";

export const appointmentStatus: TAppointmentStatus[] = [
  "Scheduled",
  "Assigned",
  "Completed",
  "Pending",
  "Cancelled",
  "Missed",
] as const;

export const getAppointMentStatus = () => {
  return appointmentStatus.map((status) => {
    return {
      text: status,
      value: status,
    };
  });
};

export const appointmentStatusText: Record<TAppointmentStatus, ReactNode> = {
  Missed: <h2 className="text-orange-500">Missed</h2>,
  Scheduled: <h2 className="text-gray-500">Scheduled</h2>,
  Assigned: <h2 className="text-blue-500">Assigned</h2>,
  Completed: <h2 className="text-green-500">Completed</h2>,
  Cancelled: <h2 className="text-red-500">Cancelled</h2>,
  Pending: <h2 className="text-red-500">Pending</h2>,
};
