import React from "react";
import WorkOrderPreparePageContainer from "./__components/WorkOrderPreparePageContainer";

type Props = {
  params: {
    workorderId: string;
  };
};

const page = (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <WorkOrderPreparePageContainer workOrderId={props.params.workorderId} />
    </div>
  );
};

export default page;
