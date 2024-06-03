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
  Missed: (
    <Tag className="w-[76px] text-center" color="orange">
      Missed
    </Tag>
  ),
  Scheduled: (
    <Tag className="w-[76px] text-center" color="green">
      Scheduled
    </Tag>
  ),
  Assigned: (
    <Tag className="w-[76px] text-center" color="blue">
      Assigned
    </Tag>
  ),
  Completed: (
    <Tag className="w-[76px] text-center" color="gray">
      Completed
    </Tag>
  ),
  Cancelled: (
    <Tag className="w-[76px] text-center" color="red">
      Cancelled
    </Tag>
  ),
  Pending: (
    <Tag className="w-[76px] text-center" color="yellow">
      Pending
    </Tag>
  ),
  Rescheduled: (
    <Tag className="w-[76px] text-center" color="green">
      Rescheduled
    </Tag>
  ),
};
