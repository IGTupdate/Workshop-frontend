"use client";
import { getAppointmentByAppointmentId } from "@/app/services/operations/appointment/appointment";
import { TAppointment } from "@/app/types/appointment";
import { useEffect, useState } from "react";
import AppointmentDetails from "../../../components/Appointment/AppointmentDetails";
import { useRouter } from "next/navigation";
import { Button, Typography } from "antd";
import { appointmentNotification } from "@/app/services/operations/notification/appointment";

interface Props {
  params: {
    appointmentId: string;
  };
}

const AppointmentPage: React.FC<Props> = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState<TAppointment | null>(
    null
  );
  const [notificationData, setNotificationData] = useState({});
  const router = useRouter();

  const fetchAppointmentData = async () => {
    try {
      const result = await getAppointmentByAppointmentId(params.appointmentId);
      setAppointmentData(result);
    } catch (err) {
      // Handle error
    }
  };

  const initData = async () => {
    try {
      if (!params.appointmentId) return;

      const initNotificationData = await appointmentNotification(
        params.appointmentId
      );
      setNotificationData(initNotificationData);
    } catch (err) {}
  };

  useEffect(() => {
    if (!appointmentData) fetchAppointmentData();
    
    const timeoutId = setTimeout(() => {
      initData();
    }, 2000);
  
    return () => clearTimeout(timeoutId);
  }, [params.appointmentId]);

  return (
    <div className="p-4 pt-28 pb-32 md:p-0">
      <Button onClick={() => router.back()} className="mb-4 w-fit">
        Back
      </Button>
      {appointmentData ? (
        <>
          <Typography.Title
            level={2}
            className="text-lg font-bold bg-white p-4 rounded-xl"
          >
            Appointment Details
          </Typography.Title>
          <AppointmentDetails
            appointmentData={appointmentData}
            notificationData={notificationData}
            bordered
          />
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default AppointmentPage;
