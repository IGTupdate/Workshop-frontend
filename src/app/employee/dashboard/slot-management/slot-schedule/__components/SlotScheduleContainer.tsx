"use client";

import React, { useEffect } from "react";
import { Table, Button, Typography } from "antd";
import SlotScheduleManageDrawer from "./SlotScheduleManageDrawer";
import { get_slot_schedule_columns } from "../__utils/slot-schedule-table-column";
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

const { Text } = Typography

type Props = {};

const SlotScheduleContainer = (props: Props) => {
    const dispatch = useAppDispatch();
    const { slotScheduleData, slotScheduleLoading } = useAppSelector((state) => state.slotSchedule);

    useEffect(() => {
        console.log("slot schedule fetched");
        if (slotScheduleLoading) {
            dispatch(getAllSlotSchedule());
        }
    }, [slotScheduleLoading]);

    const handleSlotScheduleDrawer = (newDrawerData: TActiveSlotSchedule) => {
        dispatch(setActiveSlotSchedule(newDrawerData));
    };

    const handleSlotScheduleDeleteModal = (newDeleteModal: TSlotSchedule | null) => {
        dispatch(setDeleteSlotSchedule(newDeleteModal))
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

            {
                slotScheduleLoading ? <Loader /> : <Table
                    dataSource={slotScheduleData}
                    columns={get_slot_schedule_columns(handleSlotScheduleDrawer, handleSlotScheduleDeleteModal)}
                />
            }

            <SlotScheduleManageDrawer />
            <SlotScheduleDeleteModal />
        </div>
    );
};

export default SlotScheduleContainer;
