"use client";
import Loader from "@/app/components/Loader";
import { getAppointmentByAppointmentId } from "@/app/services/operations/appointment/appointment";
import { TAppointment } from "@/app/types/appointment";
import { useEffect, useState } from "react";
import RescheduleAppointmentContainer from "./__components/RescheduleAppointmentContainer";

type Props = {
  params: {
    appointmentId: string;
  };
};

const Page = (props: Props) => {
  const [appointmentData, setAppointmentData] = useState<TAppointment | null>(
    null,
  );

  const fetchAppointmentData = async () => {
    try {
      const result = await getAppointmentByAppointmentId(
        props.params.appointmentId,
      );
      setAppointmentData(result);
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchAppointmentData();
  }, [props.params.appointmentId]);

  return (
    <>
      {!appointmentData ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      ) : (
        <div className=" flex flex-col gap-4">
          <RescheduleAppointmentContainer
            vehicle_id={
              typeof appointmentData.vehicle_id === "string"
                ? appointmentData.vehicle_id
                : appointmentData.vehicle_id._id
            }
            customer_id={
              typeof appointmentData.customer_id === "string"
                ? appointmentData.customer_id
                : appointmentData.customer_id._id
            }
            appointmentId={props.params.appointmentId}
            appointmentData={appointmentData}
          />
        </div>
      )}
    </>
  );
};

export default Page;
