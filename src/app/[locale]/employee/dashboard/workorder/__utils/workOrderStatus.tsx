import { TWorkOrderStatus } from "@/app/types/work-order";
import { Tag } from "antd";

export const workOrderStatus: TWorkOrderStatus[] = [
  "Pending",
  "InProgress",
  "Completed",
  "Prepared",
  "Billing",
  "Washing",
] as const;

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
    <Tag className="w-[82px] text-center" color="orange">
      Pending
    </Tag>
  ),
  InProgress: (
    <Tag className="w-[82px] text-center" color="green">
      InProgress
    </Tag>
  ),
  Completed: (
    <Tag className="w-[82px] text-center" color="blue">
      Completed
    </Tag>
  ),
  Prepared: (
    <Tag className="w-[82px] text-center" color="blue">
      Prepared
    </Tag>
  ),
  Billing: (
    <Tag className="w-[82px] text-center" color="blue">
      Billing
    </Tag>
  ),
  Washing: (
    <Tag className="w-[82px] text-center" color="blue">
      Washing
    </Tag>
  ),
};
// ["Pending", "Assigned", "Processing", "Completed"];
