"use client";

import React, { useState } from "react";
import { Button, Drawer, Form, Input, Row, Select, Space } from "antd";
import SlotDetailsManageContainer from "./SlotDetailsManageContainer";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setActiveSlotSchedule } from "@/app/store/slices/slot-scheduleSlice";
import { NEW_CALENDER } from "../../calender/__utils.ts/constant";
import { NEW_SLOT_SCHEDULE } from "../__utils/constant";
import { useForm } from "react-hook-form";

type Props = {};

const SlotScheduleManageDrawer = (props: Props) => {
  // open drawer has of _id of the slot schedule which need to be edit and if it has new key word then the create new slot

  const { activeSlotSchedule } = useAppSelector((state) => state.slotSchedule);
  const dispatch = useAppDispatch();

  const closeDrwer = () => {
    dispatch(setActiveSlotSchedule(null));
  };

  const saveSlotSchedule = () => {
    console.log("saved");
  };

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      slotSchedules: [
        {
          name: "Morning",
          slot_details: [
            {
              start_time: { hour: 8, minute: 0 },
              end_time: { hour: 10, minute: 0 },
              slot_limit: 5,
            },
            {
              start_time: { hour: 10, minute: 0 },
              end_time: { hour: 12, minute: 0 },
              slot_limit: 5,
            },
          ],
        },
      ],
    },
  });

  return (
    <Drawer
      title={
        activeSlotSchedule && activeSlotSchedule === NEW_SLOT_SCHEDULE
          ? "Create a new Schedule"
          : "Update Schedule"
      }
      width={480}
      onClose={closeDrwer}
      open={activeSlotSchedule !== null}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={closeDrwer}>Cancel</Button>
          <Button
            onClick={saveSlotSchedule}
            className="bg-blue1 text-white1 font-medium text-md"
          >
            Save
          </Button>
        </Space>
      }
    >
      <Form className="w-full" layout="vertical" hideRequiredMark>
        <Row className="w-full">
          <Form.Item
            className="w-full"
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter Schedule name" }]}
          >
            <Input placeholder="Please enter Schedule name" />
          </Form.Item>
        </Row>
        
        <SlotDetailsManageContainer />
      </Form>
    </Drawer>
  );
};

export default SlotScheduleManageDrawer;
