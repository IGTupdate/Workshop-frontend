import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { TWorkOrder } from "@/app/types/work-order";
import { Typography } from "antd";
import React from "react";
import VehicleFuelDetailContainer from "./VehicleFuelDetailContainer";
const { Title } = Typography;

type Props = {
  workOrder: TWorkOrder | null;
};

const WorkOrderServiceDetailContainer = (props: Props) => {
  return (
    <>
      {props.workOrder && (
        <div>
          <Title level={4}>Service Details</Title>

          <div className=" grid md:grid-cols-2 grid-cols-1 gap-3 mb-3">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold">Fuel Quantity</h3>
                <p>{props.workOrder.fuelQuantity?.value} L</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Estimated Deliver Time
                </h3>
                <p>{`
                ${new Date(props.workOrder.estimatedTimeOfCompletion || "").toDateString()} 
                ${new Date(props.workOrder.estimatedTimeOfCompletion || "").toLocaleTimeString()}
                `}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Estimated Service Cost
                </h3>
                <p>$ {props.workOrder.estimatedCost}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold">Odometer Reading</h3>
                {/* <p>{props.workOrder.odometerReading}</p> */}
                <div className="flex bg-slate-950 w-max text-white font-mono text-lg">
                  {String(props.workOrder.odometerReading)
                    .padStart(6, "0")
                    .split("")
                    .map((digit, index) => (
                      <div
                        key={index}
                        className="w-8 text-center bg-gray-900 me-[1px] rounded-md shadow-inner"
                      >
                        {digit}
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <VehicleFuelDetailContainer
                  fuelQuantity={props.workOrder?.fuelQuantity?.value}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkOrderServiceDetailContainer;
