"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import SlotDetailsManageContainer from "./SlotDetailsManageContainer";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import {
  setActiveSlotSchedule,
  setSlotScheduleDrawerLoading,
} from "@/app/store/slices/slot-scheduleSlice";
import {
  NEW_SLOT_SCHEDULE,
  NEW_SLOT_SCHEDULE_INITIAL_DATA,
} from "../__utils/constant";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  slotScheduleManageSchema,
  TSlotScheduleManage,
} from "@/app/validators/slot-schedule";
import { TSlotSchedule } from "@/app/types/slot-schedule";
import {
  createSlotSchedule,
  updateSlotSchedule,
} from "@/app/services/operations/appointment/slotSchedule";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const { Text } = Typography;
type Props = {};

const SlotScheduleManageDrawer = (props: Props) => {
  // open drawer has of _id of the slot schedule which need to be edit and if it has new key word then the create new slot

  const { activeSlotSchedule, slotScheduleDrawerLoading } = useAppSelector(
    (state) => state.slotSchedule,
  );

  const dispatch = useAppDispatch();

  const t = useTranslations("EmployeeDashboardSlotSchedulePage");

  const closeDrwer = () => {
    if (!slotScheduleDrawerLoading) {
      dispatch(setActiveSlotSchedule(null));
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: NEW_SLOT_SCHEDULE_INITIAL_DATA,
    resolver: yupResolver(slotScheduleManageSchema),
  });

  // setting initail fields
  useEffect(() => {
    if (activeSlotSchedule && activeSlotSchedule !== NEW_SLOT_SCHEDULE) {
      setValue("name", activeSlotSchedule.name);
      setValue("slot_details", activeSlotSchedule.slot_details);
    } else if (!activeSlotSchedule) {
      setValue("name", NEW_SLOT_SCHEDULE_INITIAL_DATA.name);
      setValue("slot_details", NEW_SLOT_SCHEDULE_INITIAL_DATA.slot_details);
    }
  }, [activeSlotSchedule]);

  const onSubmit = (data: TSlotScheduleManage) => {
    if (data?.slot_details?.length > 0) {
      for (let i = 0; i < data?.slot_details?.length; i++) {
        if (
          data?.slot_details[i]?.start_time?.hour >
          data?.slot_details[i]?.end_time?.hour
        ) {
          toast.error(
            `The start time must be before the end time. Slot ${i + 1}`,
          );
          return;
        }
      }
    }

    if (!activeSlotSchedule) return;
    dispatch(setSlotScheduleDrawerLoading(true));
    if (activeSlotSchedule === NEW_SLOT_SCHEDULE) {
      dispatch(createSlotSchedule(data));
    } else {
      dispatch(updateSlotSchedule(activeSlotSchedule._id, data));
    }
  };

  return (
    <Drawer
      title={
        activeSlotSchedule && activeSlotSchedule === NEW_SLOT_SCHEDULE
          ? t("create_new_schedule")
          : t("update_schedule")
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
            disabled={slotScheduleDrawerLoading}
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            type="primary"
          >
            {t("save")}
          </Button>
        </Space>
      }
    >
      <Form className="w-full" layout="vertical">
        <Row className="w-full mb-4">
          <label className="font-medium mb-2 block text-black1" htmlFor="name">
            {t("schedule_name")}
          </label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <Input {...field} placeholder="Please enter Schedule name" />
              );
            }}
          />
          {errors.name && <Text type="danger"> {errors.name.message}</Text>}
        </Row>

        <SlotDetailsManageContainer control={control} errors={errors} />
      </Form>
    </Drawer>
  );
};

export default SlotScheduleManageDrawer;
