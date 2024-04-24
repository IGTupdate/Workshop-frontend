"use client";

import React, { useEffect, useState } from "react";
import RescheduleAppointmentContainer from "./__components/RescheduleAppointmentContainer";
import { TAppointment } from "@/app/types/appointment";
import { getAppointmentByAppointmentId } from "@/app/services/operations/appointment/appointment";
import Loader from "@/app/components/Loader";

type Props = {
  params: {
    appointmentId: string;
  };
};

const Page = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<TAppointment | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await getAppointmentByAppointmentId(
          props.params.appointmentId
        );
        setAppointment(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [props.params]);

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Reschedule Appointment</h2>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <RescheduleAppointmentContainer appointment={appointment} />
      )}
    </div>
  );
};

export default Page;
