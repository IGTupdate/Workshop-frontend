import { TWorkOrderStatus } from "@/app/types/work-order";
import { Tag } from "antd";

export const workOrderStatus: TWorkOrderStatus[] = [
  "Pending",
  "Prepared",
  "InProgress",
  "FinalInspection",
  "Washing",
  "Billing",
  "Completed",
] as const;

export enum workOrderStatusEnum {
  Pending = "Pending",
  Prepared = "Prepared",
  InProgress = "InProgress",
  FinalInspection = "FinalInspection",
  Washing = "Washing",
  Billing = "Billing",
  Completed = "Completed",
}

export const getWorkOrderStatus = () => {
  return workOrderStatus.map((status) => {
    return {
      text: status,
      value: status,
    };
  });
};

export const isStatusCompleted = (stts1: string, currentStatus: string) => {
  const stts1Index = workOrderStatus.indexOf(stts1 as TWorkOrderStatus);
  const currentStatusIndex = workOrderStatus.indexOf(
    currentStatus as TWorkOrderStatus,
  );

  return stts1Index < currentStatusIndex;
};

export const workOrderStatusText = {
  Pending: (
    <Tag className="w-[82px] text-center" color="red">
      Pending
    </Tag>
  ),
  Prepared: (
    <Tag className="w-[82px] text-center" color="blue">
      Prepared
    </Tag>
  ),
  InProgress: (
    <Tag className="w-[82px] text-center" color="orange">
      InProgress
    </Tag>
  ),
  FinalInspection: (
    <Tag className="w-[82px] text-center" color="orange">
      FinalInspection
    </Tag>
  ),
  Washing: (
    <Tag className="w-[82px] text-center" color="lightblue">
      Washing
    </Tag>
  ),
  Billing: (
    <Tag className="w-[82px] text-center" color="yellow">
      Billing
    </Tag>
  ),
  Completed: (
    <Tag className="w-[82px] text-center" color="green">
      Completed
    </Tag>
  ),
};
