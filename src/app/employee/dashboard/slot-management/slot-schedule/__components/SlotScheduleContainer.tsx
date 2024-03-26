"use client";

import React, { useState } from "react";
import { Table, Button } from "antd";
import SlotScheduleUpdateDrawer from "./SlotScheduleUpdateDrawer";
import {
  get_slot_schedule_columns,
  ISlotSchedule,
} from "../__utils/slot-schedule-table-column";
import { NEW_SLOT_SCHEDULE } from "../__utils/constant";

type Props = {};

const SlotScheduleContainer = (props: Props) => {
  // update drawer it take id of the data(ISlotSchedule) to which it needs to show on drawer if it is close than has values null
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  // sample data
  const data: ISlotSchedule[] = [
    {
      _id: "abcd",
      key: "1",
      name: "John Brown",
      limit: 32,
      details: [
        "3:30 - 5:30",
        "6:60 - 7:56",
        "6:60 - 7:56",
        "6:60 - 7:56",
        "6:60 - 7:56",
        "6:60 - 7:56",
      ],
    },
  ];

  const handleOpenDrawer = (toOpen: string) => {
    setOpenDrawer(toOpen);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Slot Schedule</h2>
        <Button
          onClick={() => {
            handleOpenDrawer(NEW_SLOT_SCHEDULE);
          }}
          className="bg-blue1 text-white1 font-medium text-md"
        >
          Add Schedule
        </Button>
      </div>
      <Table
        dataSource={data}
        columns={get_slot_schedule_columns(setOpenDrawer)}
      />
      <SlotScheduleUpdateDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </div>
  );
};

export default SlotScheduleContainer;
