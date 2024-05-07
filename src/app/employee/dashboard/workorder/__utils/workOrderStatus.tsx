
import { TWorkOrderStatus } from "@/app/types/work-order";
import { Tag } from "antd";



export const workOrderStatus: TWorkOrderStatus[] = [
    "Pending",
    "Processing",
    "Completed",
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
    Pending: <Tag className="w-[82px] text-center" color="orange">Pending</Tag>,
    Processing: <Tag className="w-[82px] text-center" color="green">Processing</Tag>,
    Completed: <Tag className="w-[82px] text-center" color="blue">Completed</Tag>,
    Assigned: <Tag className="w-[82px] text-center" color="gray">Assigned</Tag>,
};
// ["Pending", "Assigned", "Processing", "Completed"];



