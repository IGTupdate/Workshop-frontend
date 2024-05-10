"use client";
import React from "react";
import AppointmentpageContainer from "./__components/AppointmentpageContainer";
import Link from "next/link";
import { Button } from "antd";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";

type Props = {};
const Page = async (props: Props) => {
  const ability = useAbility();

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl">
        <h2 className="text-xl font-semibold">Manage Appointments</h2>
        <Link href={`/employee/dashboard/appointment/book`}>
          {ability &&
            ability.can(casl_action.book, casl_subject.appointment) && (
              <Button type="primary">Book Appointment</Button>
            )}
        </Link>
      </div>

      <AppointmentpageContainer />
    </div>
  );
};

export default Page;
