"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getAppointmentDataTableColumn } from "../__utils/appointmentDataTableColumn";
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
          _id:appointment._id,
          customer: {
            phone: appointment.customer_id,
            name: appointment.customer_id,
          },
          registeration_number: appointment.vehicle_id,
          date_time: new Date("2024-03-11T13:10:15.330Z"),
          status: appointment.status,
        };
      });
    });
  }, [props.appointmentData]);

  return (
    <Table
      sticky={true}
      pagination={false}
      columns={getAppointmentDataTableColumn()}
      dataSource={appointmentDataTable}
    />
  );
};

export default AppointmentTableContainer;
