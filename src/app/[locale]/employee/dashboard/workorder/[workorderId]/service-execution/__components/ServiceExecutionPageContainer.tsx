"use client";

import { TWorkOrder } from "@/app/types/work-order";
import { Button, Typography } from "antd";
import WorkOrderTaskListContainer from "./WorkOrderTaskListContainer";

const { Title } = Typography;

type Props = {
  workOrder: TWorkOrder;
};

const ServiceExecutionPageContainer = (props: Props) => {
  const tasks = props.workOrder.tasks;

  const handleServiceTaskComplete = () => {};
  return (
    <div className="">
      <div className="mb-5">
        <Title level={4}>Tasks to be performed</Title>
      </div>

      {/* service execution container */}
      <WorkOrderTaskListContainer tasks={props.workOrder.tasks} />

      <div className="flex justify-end mt-4">
        <Button></Button>
      </div>
    </div>
  );
};

export default ServiceExecutionPageContainer;
