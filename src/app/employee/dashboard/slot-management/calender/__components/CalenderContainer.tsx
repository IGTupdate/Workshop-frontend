"use client";

import React, { useEffect } from "react";
import type { Dayjs } from "dayjs";
import { Calendar } from "antd";
import type { CalendarProps } from "antd";
import { TCalender } from "@/app/types/calender";
import dateCellRender from "./dateCellRender";
import monthCellRender from "./monthCellRender";
import CalenderManageDrawer from "./CalenderManageDrawer";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import {
  setActiveCalender,
} from "@/app/store/slices/calenderSlice";
import Loader from "@/app/components/Loader";
import { getAllCalender } from "@/app/services/operations/appointment/calender";

type Props = {

};

const CalenderContainer = (props: Props) => {
  /*
  state - 
  calenderData, calenderLoading, active calender
  */
  const { calenderData, calenderLoading, activeCalender } = useAppSelector((state) => state.calender);

  // dispatch state action
  const dispatch = useAppDispatch();

  // for the first time
  useEffect(() => {
    if (calenderLoading) {
      console.log("calender fetched");
      dispatch(getAllCalender());
    }
  }, [calenderLoading]);

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
      {calenderLoading ? (
        <Loader />
      ) : (
        <div>
          <Calendar cellRender={cellRender} />
          <CalenderManageDrawer />
        </div>
      )}
    </div>
  );
};

export default CalenderContainer;
