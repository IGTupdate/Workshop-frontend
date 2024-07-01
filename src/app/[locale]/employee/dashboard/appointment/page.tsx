"use client";
import React from "react";
import AppointmentpageContainer from "./__components/AppointmentpageContainer";
import Link from "next/link";
import { Button } from "antd";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { useTranslations } from "next-intl";

type Props = {};
const Page = (props: Props) => {
  const ability = useAbility();

  const t = useTranslations("EmployeeDashboardAppointmentPage");

  return (
    <div className="relative">
      <div className="flex justify-between items-center md:mb-8 mb-4 md:p-4 p-2 bg-white rounded-xl">
        <h2 className="lg:text-xl md:text-lg text-md font-semibold">
          {t("manage_appointment")}
        </h2>
        <Link href={`/employee/dashboard/appointment/book`}>
          {ability &&
            ability.can(casl_action.create, casl_subject.appointment) && (
              <Button type="primary" className="text-sm">
                {t("book_appointment")}
              </Button>
            )}
        </Link>
      </div>
      <AppointmentpageContainer />
    </div>
  );
};

export default Page;
