"use client";

import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Alert, Badge, Calendar } from "antd";
import type { BadgeProps, CalendarProps } from "antd";

type Props = {};

const calenderData = [];

const getCellStatus = (value: Dayjs) => {
  let listData;
  //   console.log(value.isSame(new Date()), new Date(), value.toISOString())
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalenderContainer = (props: Props) => {
  console.log(dayjs().toISOString());

  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    // setValue(newValue);
    setSelectedValue(newValue);
    console.log("selected", newValue.toISOString());
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getCellStatus(value);
    return (
      <div className="w-full h-full bg-green-300">
        <button>View</button>
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <Calendar
        cellRender={cellRender}
        value={dayjs()}
        onSelect={onSelect}
        onPanelChange={(data) => {
          console.log(data.toISOString(), "panel changed");
        }}
      />
    </div>
  );
};

export default CalenderContainer;
