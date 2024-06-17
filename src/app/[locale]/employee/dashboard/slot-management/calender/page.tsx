"use client";

import React from "react";
import CalenderContainer from "./__components/CalenderContainer";
import { useTranslations } from "next-intl";

type Props = {};

const Page = (props: Props) => {
  const t = useTranslations("EmployeeDashboardCalenderPage");
  return (
    <div className="">
      {/* heading */}
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl">
        <h2 className="text-xl font-semibold">{t("manage_calender")}</h2>
      </div>

      <div className="p-4 shadow-xl bg-white rounded-xl">
        <CalenderContainer />
      </div>
    </div>
  );
};

export default Page;
