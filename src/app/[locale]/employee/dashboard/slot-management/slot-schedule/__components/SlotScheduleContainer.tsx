"use client";

import React, { useEffect } from "react";
import { Table, Button, Typography } from "antd";
import SlotScheduleManageDrawer from "./SlotScheduleManageDrawer";
import { Get_slot_schedule_columns } from "../__utils/slot-schedule-table-column";
import { NEW_SLOT_SCHEDULE } from "../__utils/constant";
import {
  setActiveSlotSchedule,
  setDeleteSlotSchedule,
} from "@/app/store/slices/slot-scheduleSlice";
import { TActiveSlotSchedule, TSlotSchedule } from "@/app/types/slot-schedule";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import SlotScheduleDeleteModal from "./SlotScheduleDeleteModal";
import { getAllSlotSchedule } from "@/app/services/operations/appointment/slotSchedule";
import Loader from "@/app/components/Loader";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { useTranslations } from "next-intl";

const { Text } = Typography;

type Props = {};

const SlotScheduleContainer = (props: Props) => {
  const ability = useAbility();
  const dispatch = useAppDispatch();
  const { slotScheduleData, slotScheduleLoading } = useAppSelector(
    (state) => state.slotSchedule,
  );

  const t = useTranslations("EmployeeDashboardSlotSchedulePage");

  useEffect(() => {
    if (slotScheduleLoading) {
      dispatch(getAllSlotSchedule());
    }
  }, [slotScheduleLoading, dispatch]);

  const handleSlotScheduleDrawer = (newDrawerData: TActiveSlotSchedule) => {
    dispatch(setActiveSlotSchedule(newDrawerData));
  };

  const handleSlotScheduleDeleteModal = (
    newDeleteModal: TSlotSchedule | null,
  ) => {
    dispatch(setDeleteSlotSchedule(newDeleteModal));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-md">
        <h2 className="text-xl font-semibold">{t("slot_schedule")}</h2>
        {ability &&
          ability.can(casl_action.create, casl_subject.slot_schedule) && (
            <Button
              onClick={() => {
                handleSlotScheduleDrawer(NEW_SLOT_SCHEDULE);
              }}
              type="primary"
            >
              {t("add_schedule")}
            </Button>
          )}
      </div>

      {slotScheduleLoading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Loader />
        </div>
      ) : (
        <div className="shadow-xl rounded-xl overflow-hidden">
          <Table
            scroll={{ x: 980 }}
            pagination={false}
            dataSource={slotScheduleData}
            columns={Get_slot_schedule_columns(
              handleSlotScheduleDrawer,
              handleSlotScheduleDeleteModal,
              ability,
              t,
            )}
          />
        </div>
      )}

      <SlotScheduleManageDrawer />
      <SlotScheduleDeleteModal />
    </div>
  );
};

export default SlotScheduleContainer;
