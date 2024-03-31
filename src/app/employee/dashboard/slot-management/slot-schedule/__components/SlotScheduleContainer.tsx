"use client";

import React, { useEffect } from "react";
import { Table, Button } from "antd";
import SlotScheduleManageDrawer from "./SlotScheduleManageDrawer";
import { get_slot_schedule_columns } from "../__utils/slot-schedule-table-column";
import { NEW_SLOT_SCHEDULE } from "../__utils/constant";
import { useRouter } from "next/navigation";
import {
  setActiveSlotSchedule,
  setSlotScheduleData,
  setSlotScheduleDataLoading,
} from "@/app/store/slices/slot-scheduleSlice";
import { demoSlotScheduleData } from "../__demo";
import { TActiveSlotSchedule } from "@/app/types/slot-schedule";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";

type Props = {};

const SlotScheduleContainer = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { slotScheduleData } = useAppSelector((state) => state.slotSchedule);

  // handing loading the slot schedule data
  useEffect(() => {
    console.log("router cahgned");
    // call api for data
    dispatch(setSlotScheduleDataLoading(true));
    setTimeout(() => {
      dispatch(setSlotScheduleData(demoSlotScheduleData));
      dispatch(setSlotScheduleDataLoading(false));
    });
  }, [router]);

  const handleSlotScheduleDrawer = (newDrawerData: TActiveSlotSchedule) => {
    dispatch(setActiveSlotSchedule(newDrawerData));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Slot Schedule</h2>
        <Button
          onClick={() => {
            handleSlotScheduleDrawer(NEW_SLOT_SCHEDULE);
          }}
          className="bg-blue1 text-white1 font-medium text-md"
        >
          Add Schedule
        </Button>
      </div>
      <Table
        dataSource={slotScheduleData}
        columns={get_slot_schedule_columns(handleSlotScheduleDrawer)}
      />
      <SlotScheduleManageDrawer />
    </div>
  );
};

export default SlotScheduleContainer;
