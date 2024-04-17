
import { TWorkOrderStatus } from "@/app/types/work-order";
import { ReactNode } from "react";
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
}

// export const workOrderStatusText: Record<TWorkOrderStatus, ReactNode> = {
//     Pending: <h2></h2>,
//     Processing: <></>,
//     Completed: <></>,
// }


