"use client";

import { createWorkOrder } from "@/app/services/operations/workorder/workorder";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import { employeeRole } from "@/app/utils/constants/employee-roles";
import { TworkOrderCreate } from "@/app/validators/workorder";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CreateWorkOrderByDate from "./CreateWorkOrderByDate";
import EmployementAvailabilityContainer from "./EmployementAvailabilityContainer";
import WorkOrderAppointmentContiner from "./WorkOrderAppointmentContiner";

type Props = {
  appointmentId?: string;
};

const CreateWorkOrder: React.FC<Props> = (props) => {
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
      {props.appointmentId ? (
        <WorkOrderAppointmentContiner
          appointmentId={props.appointmentId}
          setWorkOrderCreateData={setWorkOrderCreateData}
        />
      ) : (
        <CreateWorkOrderByDate
          setWorkOrderCreateData={setWorkOrderCreateData}
        />
      )}

      <EmployementAvailabilityContainer
        role={employeeRole.advisor}
        handleSetlect={handleAdvisorSelect}
        selectedAdvisor={workOrderCreateData.advisorId}
      />

      <div className="w-full flex justify-end mt-8">
        <Button
          disabled={loading}
          type="primary"
          onClick={handleCreateWorkOrder}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateWorkOrder;
