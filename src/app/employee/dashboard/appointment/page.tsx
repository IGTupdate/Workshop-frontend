import React from "react";
import AppointmentpageContainer from "./__components/AppointmentpageContainer";
import Link from "next/link";
import { Button } from "antd";

type Props = {};
const page = async (props: Props) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl">
        <h2 className="text-xl font-semibold">Manage Appointments</h2>
        <Link
          href={`/employee/dashboard/appointment/book`}
        >
          <Button type="primary">Book Appointment</Button>
        </Link>
      </div>

      <AppointmentpageContainer />
    </div>
  );
};

export default page;
