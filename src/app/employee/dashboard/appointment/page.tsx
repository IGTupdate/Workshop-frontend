import React from "react";
import AppointmentpageContainer from "./__components/AppointmentpageContainer";
import Link from "next/link";

type Props = {};
const page = async (props: Props) => {
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Manage Appointments</h2>
        <Link
          href={`/employee/dashboard/appointment/book`}
          className="bg-customYellow text-white1 font-medium text-md px-4 py-2 rounded-md"
        >
          Book Appointment
        </Link>
      </div>

      <AppointmentpageContainer />
    </div>
  );
};

export default page;
