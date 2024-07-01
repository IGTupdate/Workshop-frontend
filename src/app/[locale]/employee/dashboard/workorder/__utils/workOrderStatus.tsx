import { TWorkOrderStatus } from "@/app/types/work-order";
import { Tag } from "antd";

export const workOrderStatus: TWorkOrderStatus[] = [
  "Pending",
  "Prepared",
  "InProgress",
  "Washing",
  "Billing",
  "Completed",
] as const;

export enum workOrderStatusEnum {
  Pending = "Pending",
  Prepared = "Prepared",
  InProgress = "InProgress",
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
