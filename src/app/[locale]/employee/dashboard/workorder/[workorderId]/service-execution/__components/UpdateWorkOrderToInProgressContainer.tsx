"use client";

import { updateWorkOrder } from "@/app/services/operations/workorder/workorder";
import { TWorkOrder } from "@/app/types/work-order";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { Button, Typography } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { workOrderStatusEnum } from "../../../__utils/workOrderStatus";

const { Title } = Typography;

type Props = {
  workOrder: TWorkOrder;
  handleUpdateWorkOrder: (key: string, value: any) => void;
};

const UpdateWorkOrderToInProgressContainer = (props: Props) => {
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleUpdateClick = async () => {
    try {
      setUpdateLoading(true);

      const update_data = {
        status: workOrderStatusEnum.InProgress,
      };
      const result = await updateWorkOrder(
        props.workOrder._id,
        update_data as Partial<TWorkOrder>,
      );

      if (result?.success === true) {
        toast.success("Updated Successfully");
        props.handleUpdateWorkOrder("status", workOrderStatusEnum.InProgress);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || COMMON_ERROR);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div>
      <Title level={4}>Start Work</Title>

      <Button
        type="primary"
        loading={updateLoading}
        onClick={handleUpdateClick}
        disabled={updateLoading}
      >
        Start
      </Button>
    </div>
  );
};

export default UpdateWorkOrderToInProgressContainer;
