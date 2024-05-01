import { TAppointmentStatus } from "@/app/types/appointment";
import { Tag } from "antd";
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
  Missed: <Tag color="orange">Missed</Tag>,
  Scheduled: <Tag color="green">Scheduled</Tag>,
  Assigned: <Tag color="blue">Assigned</Tag>,
  Completed: <Tag color="gray">Completed</Tag>,
  Cancelled: <Tag color="red">Cancelled</Tag>,
  Pending: <Tag color="yellow">Pending</Tag>,
};
