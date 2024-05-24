"use client";
import { getWorkOrderByAppointmentId } from "@/app/services/operations/workorder/workorder";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import WorkOrderAdvisorDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderAdvisorDetails";
import WorkOrderCustomerDetails from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderCustomerDetails";
import { TWorkOrder } from "@/app/types/work-order";
import Watermark from "@/app/components/Text/WatermarkText";
import WorkOrderMechanicDetailContainer from "@/app/[locale]/employee/dashboard/workorder/[workorderId]/__components/WorkOrderMechanicDetailContainer";
import VehicleDetails from "./__componets/VehicleDetails";

const Page = () => {
  const [workOrderData, setWorkOrderData] = useState<TWorkOrder | null>(null);
  const pathname = usePathname();
  const id = pathname.split("/").slice(-2)[0];

  useEffect(() => {
    if (id) {
      getWorkOrderData(id);
    }
  }, [id]);

  const getWorkOrderData = async (id: string) => {
    const result = await getWorkOrderByAppointmentId(id);
    if (result != null) {
      setWorkOrderData(result);
    }
  };

  const labels = ["Vehicle Details"];

  const components = [
    <VehicleDetails key="vehicle details" workOrderData={workOrderData} />,

    // <WorkOrderAdvisorDetails
    //     key="advisor-details"
    //     advisor={workOrderData && typeof workOrderData.advisorId !== "string" ? workOrderData?.advisorId : ""}
    // />,

    // <WorkOrderMechanicDetailContainer
    //     key="mechanic-details"
    //     advisorId={workOrderData?.advisorId || ""}
    //     assigned_mechanics={workOrderData?.mechanicId || []}
    //     handleUpdateWorkOrderData={() => { console.log("Not working"); }}
    // />,
  ];

  console.log(workOrderData, "workOrderData");

  return (
    <div>
      {workOrderData ? (
        <div>
          <Tabs
            defaultActiveKey="0"
            tabPosition="top"
            centered
            style={{ height: "100%" }}
            items={labels.map((label, i) => ({
              label: label,
              key: String(i),
              children: components[i],
            }))}
          />
        </div>
      ) : (
        <div style={{ height: "calc(100vh - 200px)" }} className="relative">
          <Watermark text="No Data Found" />
        </div>
      )}
    </div>
  );
};

export default Page;
