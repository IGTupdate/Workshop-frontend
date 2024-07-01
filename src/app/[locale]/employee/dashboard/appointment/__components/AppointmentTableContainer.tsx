"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { GetAppointmentDataTableColumn } from "../__utils/appointmentDataTableColumn";
import { TAppointment, TAppointmentDataTable } from "@/app/types/appointment";
import { getSlotTiming } from "@/app/utils/get-slot-timing";
import { useTranslations } from "next-intl";

type Props = {
  appointmentData: TAppointment[];
};

const AppointmentTableContainer = (props: Props) => {
  const [appointmentDataTable, setAppointMentDataTable] = useState<
    TAppointmentDataTable[]
  >([]);

  const t = useTranslations("EmployeeDashboardAppointmentPage");

  useEffect(() => {
    setAppointMentDataTable(() => {
      return props.appointmentData.map((appointment) => {
        const slotTime =
          typeof appointment.calender_id !== "string"
            ? getSlotTiming(
                appointment.calender_id,
                appointment.slot_id as string,
              )?.start_time || ""
            : "";
        return {
          key: appointment._id,
          _id: appointment._id,
          name:
            typeof appointment.customer_id !== "string"
              ? appointment.customer_id && appointment.customer_id.fullName
              : "-",
          phone:
            typeof appointment.customer_id !== "string"
              ? appointment.customer_id && appointment.customer_id.contactNumber
              : "-",
          registeration_number:
            typeof appointment.vehicle_id !== "string"
              ? appointment.vehicle_id.registeration_number
              : "",
          date_time: new Date(slotTime),
          status: appointment.status,
        };
      });
    });
  }, [props.appointmentData]);

  return (
    <Table
      sticky={true}
      pagination={false}
      // size="small"
      columns={GetAppointmentDataTableColumn()}
      dataSource={appointmentDataTable}
      scroll={{ x: 980 }}
    />
  );
};

export default AppointmentTableContainer;
