
import { TWorkOrderStatus } from "@/app/types/work-order";
import { ReactNode } from "react";
import { Tag } from "antd";
import { TAppointmentStatus } from "@/app/types/appointment";



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
}

export const workOrderStatusText = {
    Pending: <Tag color="orange">Pending</Tag>,
    Processing: <Tag color="green">Processing</Tag>,
    Completed: <Tag color="blue">Completed</Tag>,
    Assigned: <Tag color="gray">Assigned</Tag>,
}
// ["Pending", "Assigned", "Processing", "Completed"];



