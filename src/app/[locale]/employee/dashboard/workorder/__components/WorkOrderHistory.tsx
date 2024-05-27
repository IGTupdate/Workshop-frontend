import Watermark from "@/app/components/Text/WatermarkText";
import React from "react";

const data = [
  {
    title: "Appointment Pending",
    created_At: "1:12 PM",
  },
  {
    title: "Appointment Assign",
    created_At: "1:35 PM",
  },
  {
    title: "Appointment Processing",
    created_At: "2:43 PM",
  },
];

const WorkOrderHistory = () => {
  return (
    <div>
      {data.length > 0 ? (
        [...data].reverse().map((item, index) => (
          <div key={index} className="flex justify-between items-center gap-4">
            <p className="text-lg font-semibold">{item.title}</p>
            <p>{item.created_At}</p>
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
