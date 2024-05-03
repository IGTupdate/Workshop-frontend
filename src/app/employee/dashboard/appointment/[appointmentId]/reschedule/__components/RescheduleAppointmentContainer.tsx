"use client";

import { Steps } from "antd";
import React, { useEffect, useState } from "react";
import { slot_booking_customer_reschedule_step } from "../../../book/__utils/slot-booking-step";
import SlotAvailablityContainer from "../../../book/__components/SlotAvailablityContainer";
import { useSearchParams } from "next/navigation";
import { TAppointment, TAppointmentBook } from "@/app/types/appointment";
import AppointmentRescheduleConfirmation from "@/app/dashboard/appointment/reschedule/[appointmentId]/__components/AppointmentReschedulePreviewPage";

type Props = {
  appointment: TAppointment | null;
};

const RescheduleAppointmentContainer = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const searchParams = useSearchParams();
  const [appointmentRescheduleData, setAppointmentRescheduleData] =
    useState<TAppointmentBook>({
      slot_id: "",
      calender_id: "",
      customer_id: "",
      vehicle_id: "",
      service_plans: props.appointment?.service_plans || [],
      service_description: props.appointment?.service_description || []
    });

  useEffect(() => {
    setAppointmentRescheduleData((prv) => {
      if (props.appointment !== null) {
        return {
          ...prv,
          vehicle_id:
            typeof props.appointment.vehicle_id === "string"
              ? props.appointment?.vehicle_id
              : props.appointment?.vehicle_id._id,
          customer_id:
            typeof props.appointment.customer_id === "string"
              ? props.appointment?.customer_id
              : props.appointment?.customer_id._id,
        };
      }
      return prv;
    });
  }, [props.appointment]);

  useEffect(() => {
    const slot_id = searchParams.get("slot_id");
    const calender_id = searchParams.get("calender_id");
    if (slot_id && calender_id) {
      setAppointmentRescheduleData((prv) => {
        return {
          ...prv,
          slot_id,
          calender_id,
        };
      });
    } else {
      setAppointmentRescheduleData((prv) => {
        return {
          ...prv,
          slot_id: "",
          calender_id: "",
        };
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      appointmentRescheduleData.calender_id &&
      appointmentRescheduleData.slot_id
    ) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [appointmentRescheduleData]);

  return (
    <div>
      {props.appointment ? (
        <div>
          <Steps
            className="m-4 mx-auto"
            current={currentStep}
            labelPlacement="vertical"
            direction="horizontal"
            items={slot_booking_customer_reschedule_step}

          />

          {currentStep === 0 && <SlotAvailablityContainer />}

          {currentStep === 1 && (
            <AppointmentRescheduleConfirmation
              appointmentRescheduleData={appointmentRescheduleData}
              setAppointmentRescheduleData={setAppointmentRescheduleData}
              appointmentId={props.appointment._id}
            />
          )}
        </div>
      ) : (
        <>No appointment found</>
      )}
    </div>
  );
};

export default RescheduleAppointmentContainer;
