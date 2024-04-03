"use client";

import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Row, Select, Space, Typography } from "antd";
import SlotDetailsManageContainer from "./SlotDetailsManageContainer";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setActiveSlotSchedule } from "@/app/store/slices/slot-scheduleSlice";
import { NEW_SLOT_SCHEDULE, NEW_SLOT_SCHEDULE_INITIAL_DATA } from "../__utils/constant";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { slotScheduleManageSchema } from "@/app/validators/slot-schedule";
import { TSlotSchedule } from "@/app/types/slot-schedule";


const { Text } = Typography
type Props = {};

const SlotScheduleManageDrawer = (props: Props) => {
  // open drawer has of _id of the slot schedule which need to be edit and if it has new key word then the create new slot

  const { activeSlotSchedule, slotScheduleDrawerLoading } = useAppSelector((state) => state.slotSchedule);

  const dispatch = useAppDispatch();

  const closeDrwer = () => {
    if (!slotScheduleDrawerLoading) {
      dispatch(setActiveSlotSchedule(null));
    }
  };

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: NEW_SLOT_SCHEDULE_INITIAL_DATA,
    resolver: yupResolver(slotScheduleManageSchema)
  });


  // setting initail fields
  useEffect(() => {
    if (activeSlotSchedule && activeSlotSchedule !== NEW_SLOT_SCHEDULE) {
      setValue("name", activeSlotSchedule.name)
      setValue("slot_details", activeSlotSchedule.slot_details)
    }
    else if (!activeSlotSchedule) {
      setValue("name", NEW_SLOT_SCHEDULE_INITIAL_DATA.name)
      setValue("slot_details", NEW_SLOT_SCHEDULE_INITIAL_DATA.slot_details)
    }
  }, [activeSlotSchedule])

  const onSubmit = (data: any) => {
    console.log(data);
  }

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
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            className="bg-blue1 text-white1 font-medium text-md"
          >
            Save
          </Button>
        </Space>
      }
    >
      <Form className="w-full" layout="vertical">
        <Row className="w-full mb-4">
          <label className='font-medium mb-2 block text-black1' htmlFor="name">Schedule Name</label>
          <Controller name="name"
            control={control}
            render={({ field }) => {
              return <Input {...field} placeholder="Please enter Schedule name" />
            }} />
          {errors.name && <Text type='danger'> {errors.name.message}</Text>}
        </Row>

        <SlotDetailsManageContainer control={control} />
      </Form>
    </Drawer>
  );
};

export default SlotScheduleManageDrawer;
