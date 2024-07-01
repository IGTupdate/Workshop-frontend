import Watermark from "@/app/components/Text/WatermarkText";
import { getWorkOrderActivity } from "@/app/services/operations/workorder/workorder";
import { TWorkOrderActivtyLog } from "@/app/types/work-order";
import React, { useEffect, useState } from "react";
import { MdDoubleArrow } from "react-icons/md";

type TProps = {
  workOrderId: string;
};

const WorkOrderHistory = (props: TProps) => {
  const [workOrderActivityLog, setWorkOrderActivityLog] =
    useState<TWorkOrderActivtyLog | null>();

  useEffect(() => {
    loadData();
  }, [props.workOrderId]);

  const loadData = async () => {
    try {
      const workOrderActivityData = (await getWorkOrderActivity(
        props.workOrderId,
      )) as TWorkOrderActivtyLog;
      setWorkOrderActivityLog(() => {
        return workOrderActivityData;
      });
      console.log(workOrderActivityData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-xl">
      {workOrderActivityLog && workOrderActivityLog.activities.length > 0 ? (
        workOrderActivityLog.activities.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-4 py-2 border-b"
          >
            <div className="flex gap-2 items-center">
              <MdDoubleArrow />
              <p className="text-md font-medium">{item.message}</p>
            </div>
            <p>
              {new Date(item.actionTime).toLocaleTimeString()}{" "}
              {new Date(item.actionTime).toLocaleDateString()}{" "}
            </p>
          </div>
        ))
      ) : (
        <div className="relative h-[63vh]">
          <Watermark text={"No History Available"} />
        </div>
      )}
    </div>
  );
};

export default WorkOrderHistory;
