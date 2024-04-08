"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { GetAppointmentDataTableColumn } from "../__utils/appointmentDataTableColumn";
import { TAppointment, TAppointmentDataTable } from "@/app/types/appointment";

type Props = {
  appointmentData: TAppointment[];
};

const AppointmentTableContainer = (props: Props) => {

  const [appointmentDataTable, setAppointMentDataTable] = useState<
    TAppointmentDataTable[]
  >([]);

  useEffect(() => {
    setAppointMentDataTable(() => {
      return props.appointmentData.map((appointment) => {
        return {
          _id: appointment._id,
          customer: {
            phone: appointment.customer_id,
            name: appointment.customer_id,
          },
          registeration_number: (typeof appointment.vehicle_id !== "string" ? appointment.vehicle_id.registeration_number : ""),
          date_time: new Date(),
          status: appointment.status,
        };
      });
    });
  }, [props.appointmentData]);

  return (
    <Table
      sticky={true}
      pagination={false}
      columns={GetAppointmentDataTableColumn()}
      dataSource={appointmentDataTable}
    />
  );
};

export default AppointmentTableContainer;
