"use client";
import AppointmentDetails from "@/app/components/Appointment/AppointmentDetails";
import Loader from "@/app/components/Loader";
import { getAppointmentByAppointmentId } from "@/app/services/operations/appointment/appointment";
import { TAppointment } from "@/app/types/appointment";
import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";
import AppointmentCancel from "./AppointmentCancel";
import { useRouter } from "next/navigation";

type Props = {
  appointmentId: string;
};

const { Text } = Typography;

const AppointmentPageContiner = (props: Props) => {
  const [appointmentLoading, setAppointmentLoading] = useState(true);
  const [appointment, setAppointment] = useState<TAppointment | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (appointmentLoading) {
      fetchAppointmentData();
    }
  }, [props.appointmentId, appointmentLoading]);

  const fetchAppointmentData = async () => {
    setAppointmentLoading(true);
    try {
      const result = await getAppointmentByAppointmentId(props.appointmentId);
      setAppointment(result);
    } catch (err) {
      // Handle error
    } finally {
      setAppointmentLoading(false);
    }
  };

  return (
    <div>
      {appointmentLoading ? (
        <Loader />
      ) : appointment ? (
        <div>
          <AppointmentDetails appointmentData={appointment} />

          <div className="flex justify-end items-center  gap-3 ">
            {appointment.status === "Scheduled" && (
              <Button
                onClick={() => {
                  router.push(
                    `/employee/dashboard/appointment/${props.appointmentId}/reschedule`
                  );
                }}
                type="primary"
              >
                ReSchedule
              </Button>
            )}
            {appointment.status !== "Cancelled" && (
              <AppointmentCancel
                appointmentId={props.appointmentId}
                setAppointmentLoading={setAppointmentLoading}
              />
            )}
          </div>
        </div>
      ) : (
        <Text>Appointment not found</Text>
      )}
    </div>
  );
};

export default AppointmentPageContiner;
