"use client";
import React from "react";
import { deleteSlotScheduleById } from "@/app/services/operations/appointment/slotSchedule";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import { setDeleteSlotSchedule } from "@/app/store/slices/slot-scheduleSlice";
import { Button, Modal, Typography } from "antd";

const { Title, Text } = Typography;

type Props = {};

const SlotScheduleDeleteModal = (props: Props) => {
  const { deleteSlotSchedule, deleteSlotScheduleLoading } = useAppSelector(
    (state) => state.slotSchedule,
  );
  const dispatch = useAppDispatch();

  const handleOk = () => {
    if (deleteSlotSchedule !== null) {
      dispatch(deleteSlotScheduleById(deleteSlotSchedule._id));
    }
  };

  const handleCancel = () => {
    if (!deleteSlotScheduleLoading) {
      dispatch(setDeleteSlotSchedule(null));
    }
  };

  return (
    <Modal
      title={<Title level={4}>Confirm</Title>}
      open={deleteSlotSchedule !== null}
      confirmLoading={deleteSlotScheduleLoading}
      onCancel={handleCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            disabled={deleteSlotScheduleLoading}
            onClick={handleOk}
            danger
          >
            {deleteSlotScheduleLoading ? "Deleting..." : "Delete"}
          </Button>
        </>
      )}
    >
      <p>
        Are You Sure want to delete{" "}
        <b>{deleteSlotSchedule && deleteSlotSchedule.name}</b> Slot Schedule.
      </p>
    </Modal>
  );
};

export default SlotScheduleDeleteModal;
