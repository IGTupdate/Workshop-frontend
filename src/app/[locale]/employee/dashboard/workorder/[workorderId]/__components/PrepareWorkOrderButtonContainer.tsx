"use client";

import { Button, Typography } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  workOrderId: string;
};

const { Title } = Typography;

const PrepareWorkOrderButtonContainer = (props: Props) => {
  const router = useRouter();
  return (
    <div className="mt-5">
      <Title level={5}>Prepare WorkOrder</Title>
      <p className="my-2">WorkOrder Not preapred for the vehicle</p>
      <Button
        type="primary"
        onClick={() => {
          router.push(
            `/employee/dashboard/workorder/${props.workOrderId}/prepare`,
          );
        }}
      >
        Prepare
      </Button>
    </div>
  );
};

export default PrepareWorkOrderButtonContainer;
