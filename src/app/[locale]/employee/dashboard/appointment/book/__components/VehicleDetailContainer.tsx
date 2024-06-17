"use client";

import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import VehicleSearchCompoent from "./VehicleSearchCompoent";
import { TVehicle } from "@/app/types/vehicle";
import VehicleCreateContainer from "./VehicleCreateContainer";
import { NEW_VEHICLE } from "../__utils/constant";
import { TAppointmentBook } from "@/app/types/appointment";

const { Title } = Typography;

type Props = {
  setAppointmentBookingData: React.Dispatch<
    React.SetStateAction<TAppointmentBook>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  appointmentBookingData: TAppointmentBook;
};

const VehicleDetailContainer = (props: Props) => {
  const [vehicleId, setVehicleId] = useState("");

  useEffect(() => {
    if (vehicleId !== NEW_VEHICLE.value) {
      props.setAppointmentBookingData((prv) => {
        return {
          ...prv,
          vehicle_id: vehicleId,
        };
      });
    }
  }, [vehicleId]);

  return (
    <div>
      <div className="mb-5">
        <Title level={5}>Fill Vehicle Details</Title>
      </div>

      {vehicleId === NEW_VEHICLE.value ? (
        <VehicleCreateContainer
          setVehicleId={setVehicleId}
          customer_id={props.appointmentBookingData.customer_id}
        />
      ) : (
        <VehicleSearchCompoent
          setAppointmentBookingData={props.setAppointmentBookingData}
          setVehicleId={setVehicleId}
        />
      )}

      <div></div>
    </div>
  );
};

export default VehicleDetailContainer;
