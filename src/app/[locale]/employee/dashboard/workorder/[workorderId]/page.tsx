"use client";

import ServicePlans from "@/app/[locale]/dashboard/appointment/[appointmentId]/workorder/__componets/ServicePlans";
import StaffAndRamps from "@/app/[locale]/dashboard/appointment/[appointmentId]/workorder/__componets/StaffAndRamps";
import VehicleDetails from "@/app/[locale]/dashboard/appointment/[appointmentId]/workorder/__componets/VehicleDetails";
import useAbility from "@/app/__hooks/useAbility";
import Loader from "@/app/components/Loader";
import { getWorkOrderById } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder } from "@/app/types/work-order";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { workOrderStatusText } from "../__utils/workOrderStatus";
import Watermark from "@/app/components/Text/WatermarkText";

const { Text } = Typography;

type Props = {
  params: {
    workorderId: string;
  };
};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [workOrder, setWorkOrder] = useState<TWorkOrder | null>(null);

  const ability = useAbility();

  // load work order
  useEffect(() => {
    // console.log("hello from work order", props.params.workorderId);

    if (ability && ability.can(casl_action.get, casl_subject.workorder)) {
      if (props.params.workorderId) {
        (async function () {
          try {
            const required_workorder = await getWorkOrderById(
              props.params.workorderId,
              true,
            );
            setWorkOrder(required_workorder);
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        })();
      }
    }
  }, [props.params.workorderId, ability]);

  const handleUpdateWorkOrderData = (
    field: keyof TWorkOrder,
    fieldData: any,
  ) => {
    setWorkOrder((prv) => {
      return {
        ...prv,
        [field]: fieldData,
      } as TWorkOrder;
    });
  };

  const labels = ["Vehicle Details", "Service Plans", "Staff & Ramps"];

  const components = [
    <VehicleDetails key="vehicle details" workOrderData={workOrder} />,

    <ServicePlans
      key={"Service Plan"}
      workOrderData={workOrder}
      showAdditionalWorks={true}
    />,

    <StaffAndRamps
      key={"Staff & Ramps"}
      workOrderData={workOrder}
      handleUpdateWorkOrderData={handleUpdateWorkOrderData}
      params={props.params}
    />,
  ];

  return (
    <>
      {loading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : workOrder ? (
        <div>
          <div className="flex justify-between items-center bg-white rounded-xl p-4 mb-4">
            <h2 className="text-lg font-bold">
              Work Order - #{workOrder?.orderNumber}
            </h2>
            {workOrderStatusText[workOrder.status]}
          </div>

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
          <Watermark text="Work Order not found" />
        </div>
      )}
    </>
  );
};

export default Page;

//  <div>
// <div className="flex justify-between items-center mb-4">
//   <h2 className="text-xl font-semibold">
//     Work Order - #{workOrder.orderNumber}
//   </h2>
//   <div>
//     {workOrderStatusText[workOrder.status]}

//   </div >
// </div >

//   <div>
//     <WorkOrderCustomerDetails
//       vehicle={
//         typeof workOrder.appointmentId !== "string"
//           ? workOrder.appointmentId.vehicle_id
//           : ""
//       }
//       customer={
//         typeof workOrder.appointmentId !== "string"
//           ? workOrder.appointmentId.customer_id
//           : ""
//       }
//     />
//     <Divider />
//     <WorkOrderAdvisorDetails advisor={workOrder.advisorId} />
//     <Divider />
//     <WorkOrderMechanicDetailContainer
//       advisorId={workOrder.advisorId}
//       assigned_mechanics={workOrder.mechanicId}
//       handleUpdateWorkOrderData={handleUpdateWorkOrderData}
//     />
//     <Divider />
//     <WorkOrderRampDetails
//       advisorId={workOrder.advisorId}
//       ramp={workOrder.rampId}
//       handleUpdateWorkOrderData={handleUpdateWorkOrderData}
//     />
//     <Divider />

//     {workOrder.status === "Pending" ? (
//       <div>
//         {((typeof workOrder.advisorId === "string" &&
//           workOrder.advisorId === authData._id) ||
//           (typeof workOrder.advisorId !== "string" &&
//             workOrder.advisorId._id === authData._id)) && (
//             <div>
//               <Title level={5}>Prepare WorkOrder</Title>
//               <Button
//                 type="primary"
//                 onClick={() => {
//                   router.push(
//                     `/employee/dashboard/workorder/${props.params.workorderId}/prepare`,
//                   );
//                 }}
//               >
//                 Prepare
//               </Button>
//             </div>
//           )}
//       </div>
//     ) : (
//       <div>
//         <WorkOrderServiceDetailContainer workOrder={workOrder} />
//         <Divider />
//         <WorkOrdersPlansWorkContainer
//           servicePlanId={workOrder.servicePlanId || []}
//           tasks={workOrder.tasks} showAdditionalWorks={true} />
//         <Divider />
//         <div className="grid items-center grid-cols-2 gap-4">
//           <WorkOrderObservations
//             observations={workOrder.observations}
//           />
//           <VehicleFuelDetailContainer
//             fuelQuantity={workOrder.fuelQuantity}
//           />
//         </div>
//         <Divider />
//         <InventoryOrderContainer parts={workOrder.partsRequested} />
//       </div>
//     )}
//     {/* <VehicleInspectionImagesContainer /> */}
//   </div>
// </div >
