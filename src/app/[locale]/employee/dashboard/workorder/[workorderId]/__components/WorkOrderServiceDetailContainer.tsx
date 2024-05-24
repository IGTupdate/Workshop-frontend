import DescriptionItem from "@/app/components/DescriptionItem.tsx";
import { TWorkOrder } from "@/app/types/work-order";
import { Typography } from "antd";
import React from "react";
const { Title } = Typography;

type Props = {
  workOrder: TWorkOrder | null;
};

const WorkOrderServiceDetailContainer = (props: Props) => {
  return (
    <>
      {props.workOrder && (
        <div>
          <Title level={5}>Service Details</Title>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mb-3">
            <div>
              <h3 className="font-semibold">Odometer Reading</h3>
              <p>{props.workOrder.odometerReading}</p>
            </div>
            <div>
              <h3 className="font-semibold">Fuel Quantity</h3>
              <p>{props.workOrder.fuelQuantity} L</p>
            </div>
            <div>
              <h3 className="font-semibold">Estimated Deliver Time</h3>
              <p>{`
                ${new Date(props.workOrder.estimatedTimeOfCompletion || "").toDateString()} 
                ${new Date(props.workOrder.estimatedTimeOfCompletion || "").toLocaleTimeString()}
                `}</p>
            </div>
            <div>
              <h3 className="font-semibold">Estimated Service Cost</h3>
              <p>$ {props.workOrder.estimatedCost}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkOrderServiceDetailContainer;
