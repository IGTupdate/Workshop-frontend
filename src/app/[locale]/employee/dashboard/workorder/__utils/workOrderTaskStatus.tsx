import { Tag } from "antd";

export enum workOrderTaskStatusEnum {
  Pending = "Pending",
  Completed = "Completed",
}

export const workOrderTaskStatusText: Record<string, JSX.Element> = {
  Pending: (
    <Tag className="w-[82px] text-center" color="red">
      Pending
    </Tag>
  ),
  Completed: (
    <Tag className="w-[82px] text-center" color="green">
      Completed
    </Tag>
  ),
};
