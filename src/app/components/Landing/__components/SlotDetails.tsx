"use client";
import { useAppSelector } from "@/app/store/reduxHooks";
import {
  convertToLocaleDateAndWeekday,
  extractTimeFromDate,
} from "@/app/utils/dateFormatter";
import { Tabs } from "antd";
import React from "react";
import SlotTabs from "./SlotTabs";
import Watermark from "../../Text/WatermarkText";

const SlotDetails: React.FC = () => {
  const slotData = useAppSelector((state) => state.slot.slotData);
  const formattedDate = slotData?.date
    ? convertToLocaleDateAndWeekday(slotData.date)
    : "";

  console.log(slotData, "slotData");

  // @ts-ignore
  const availableItems =
    slotData?.available_slots?.map((slot) => {
      const startTime = extractTimeFromDate(slot.start_time);
      const endTime = extractTimeFromDate(slot.end_time);

      let tabColor = "#52c41a"; // Default green color
      if (slot.available <= 2) {
        tabColor = "#f5222d"; // Red color
      } else if (slot.available <= 4) {
        tabColor = "#faad14"; // Yellow color
      } else if (slot.available === 0) {
        tabColor = "#808080";
      }

      return {
        label: (
          <span style={{ color: tabColor }}>{`${startTime} - ${endTime}`}</span>
        ),
        key: slot._id,
        available: slot.available,
        disabled: slot.available === 0,
        slotData: slot,
      };
    }) || [];

  return (
    <>
      {availableItems && availableItems?.length > 0 ? (
        <div className="flex  flex-col gap-8 mx-4">
          <h1 className="text-2xl font-extrabold text-center">
            Displaying Slot Details For Date
          </h1>
          <h1 className="text-xl font-extrabold text-center">
            {formattedDate}
          </h1>
          <div className=" h-[100%]">
            <Tabs
              type="card"
              defaultActiveKey="0"
              tabPosition="top"
              centered={true}
              // @ts-ignore
              items={availableItems.map((slot) => ({
                label: slot.label,
                key: slot.key,
                children: (
                  <SlotTabs slotData={slot.slotData} calenderData={slotData} />
                ),
              }))}
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <Watermark text="No Slots Available" />
        </div>
      )}
    </>
  );
};

export default SlotDetails;
