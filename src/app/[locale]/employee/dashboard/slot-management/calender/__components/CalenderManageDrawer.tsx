"use client";

import { Drawer, Typography } from "antd";
import React from "react";
import CalenderShowDetail from "./CalenderShowDetail";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setActiveCalender } from "@/app/store/slices/calenderSlice";
import { TCalender } from "@/app/types/calender";
import CalenderCreate from "./CalenderCreate";
import { useTranslations } from "next-intl";

const { Text } = Typography;

type Props = {};

const CalenderManageDrawer = (props: Props) => {
  // dispatch event
  const dispatch = useAppDispatch();

  const t = useTranslations("EmployeeDashboardCalenderPage");

  // calender state
  const { activeCalender, calenderDrawerLoading } = useAppSelector((state) => {
    return state.calender;
  });

  const closeDrawer = () => {
    if (!calenderDrawerLoading) {
      dispatch(setActiveCalender(null));
    }
  };

  return (
    <div>
      <Drawer
        title={
          <Text>
            {t("manage_date")} :{" "}
            {activeCalender?.date
              ? new Date(activeCalender?.date).toDateString()
              : "-"}{" "}
          </Text>
        }
        width={480}
        onClose={closeDrawer}
        open={activeCalender !== null}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {activeCalender ? (
          <div>
            {!activeCalender._id ? (
              <CalenderCreate activeCalender={activeCalender} />
            ) : (
              <CalenderShowDetail
                activeCalender={activeCalender as TCalender}
              />
            )}
          </div>
        ) : (
          <Text>{t("no_date_selected")}</Text>
        )}
      </Drawer>
    </div>
  );
};

export default CalenderManageDrawer;
