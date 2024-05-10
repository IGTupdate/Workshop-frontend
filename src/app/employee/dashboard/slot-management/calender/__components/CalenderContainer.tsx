"use client";

import React, { useEffect } from "react";
import type { Dayjs } from "dayjs";
import { Badge, Calendar } from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import { TCalender } from "@/app/types/calender";
import dateCellRender from "./dateCellRender";
import monthCellRender from "./monthCellRender";
import CalenderManageDrawer from "./CalenderManageDrawer";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setActiveCalender } from "@/app/store/slices/calenderSlice";
import Loader from "@/app/components/Loader";
import { getAllCalender } from "@/app/services/operations/appointment/calender";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import UnAuthorized from "@/app/components/UnAuthorized/UnAuthorized";

type Props = {};

const CalenderContainer = (props: Props) => {
  /*
  state - 
  calenderData, calenderLoading, active calender
  */
  const { calenderData, calenderLoading, activeCalender } = useAppSelector(
    (state) => state.calender,
  );

  // dispatch state action
  const dispatch = useAppDispatch();

  // ability
  const ability = useAbility();

  // for the first time
  useEffect(() => {
    if (ability && ability.can(casl_action.get, casl_subject.calender)) {
      if (calenderLoading) {
        dispatch(getAllCalender());
      }
    }
  }, [calenderLoading, ability]);

  // calender button cell click schedule, view
  const handleCalenderCellButtonClick = (data: Partial<TCalender> | null) => {
    dispatch(setActiveCalender(data));
  };

  // which cell to render monthly or daily

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date")
      return dateCellRender({
        calenderData,
        current,
        activeCalender,
        handleCalenderCellButtonClick,
      });

    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      {ability && ability.can(casl_action.get, casl_subject.calender) ? (
        <div>
          {calenderLoading ? (
            <div
              style={{ height: "calc(100vh - 300px)" }}
              className="flex justify-center items-center w-full"
            >
              <Loader />
            </div>
          ) : (
            <div>
              <Calendar cellRender={cellRender} />
              <CalenderManageDrawer />
            </div>
          )}
        </div>
      ) : (
        <UnAuthorized />
      )}
    </div>
  );
};

export default CalenderContainer;
