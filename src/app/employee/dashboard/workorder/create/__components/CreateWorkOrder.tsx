"use client";

import React, { useEffect, useState } from "react";
import { employeeRole } from "@/app/utils/constants/employee-roles";
import EmployementAvailabilityContainer from "./EmployementAvailabilityContainer";
import WorkOrderAppointmentContiner from "./WorkOrderAppointmentContiner";
import { TworkOrderCreate } from "@/app/validators/workorder";
import { Button } from "antd";
import toast from "react-hot-toast";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { createWorkOrder } from "@/app/services/operations/workorder/workorder";
import { useRouter } from "next/navigation";

type Props = {
  appointmentId: string | undefined;
};

const CreateWorkOrder = (props: Props) => {
  const [workOrderCreateData, setWorkOrderCreateData] =
    useState<TworkOrderCreate>({
      appointmentId: "",
      advisorId: "",
    });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateWorkOrder = async () => {
    if (!workOrderCreateData.advisorId) {
      toast.error("Select Advisor");
      return;
    } else if (!workOrderCreateData.appointmentId) {
      toast.error("Appointment Not Found");
      return;
    }
    setLoading(true);
    try {
      const response = await createWorkOrder(workOrderCreateData);
      // console.log(response);
      toast.success(response.message);
      router.push("/employee/dashboard/workorder/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvisorSelect = (advisorId: string) => {
    setWorkOrderCreateData((prv) => {
      return {
        ...prv,
        advisorId: advisorId,
      };
    });
  };

  return (
    <div>
      <WorkOrderAppointmentContiner
        appointmentId={props.appointmentId}
        setWorkOrderCreateData={setWorkOrderCreateData}
      />

      <EmployementAvailabilityContainer
        role={employeeRole.advisor}
        handleSetlect={handleAdvisorSelect}
        selectedAdvisor={workOrderCreateData.advisorId}
      />

      <div className="w-full flex justify-end mt8">
        <Button
          disabled={loading}
          type="primary"
          onClick={handleCreateWorkOrder}
        >
          Create{" "}
        </Button>
      </div>
    </div>
  );
};

export default CreateWorkOrder;
