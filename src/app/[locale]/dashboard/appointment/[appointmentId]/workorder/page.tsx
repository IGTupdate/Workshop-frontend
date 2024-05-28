"use client";
import { getWorkOrderByAppointmentId } from "@/app/services/operations/workorder/workorder";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { TWorkOrder } from "@/app/types/work-order";
import Watermark from "@/app/components/Text/WatermarkText";

import ServicePlans from "../../../../../components/WorkOrder/ServicePlans";
import CusotmerVehicleDetails from "@/app/components/WorkOrder/CusotmerVehicleDetails";

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

  const labels = ["Vehicle Details", "Service Plans"];

  const components = [
    <CusotmerVehicleDetails
      key="vehicle details"
      workOrderData={workOrderData}
    />,

    <ServicePlans
      key={"Service Plan"}
      workOrderData={workOrderData}
      showAdditionalWorks={false}
    />,
  ];

  return (
    <div>
      {workOrderData ? (
        <div className="pt-28 pb-36 md:py-0">
          <h2 className="mb-4 text-lg font-bold bg-white rounded-xl p-4">
            Work Order - #{workOrderData?.orderNumber}
          </h2>

          <Tabs
            defaultActiveKey="0"
            tabPosition="top"
            size="large"
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
