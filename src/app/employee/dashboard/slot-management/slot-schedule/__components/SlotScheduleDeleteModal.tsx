"use client"
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { setDeleteSlotSchedule } from '@/app/store/slices/slot-scheduleSlice';
import { Button, Modal, Typography } from 'antd';
import React, { useState } from 'react'

const { Title, Text } = Typography;


type Props = {}

const SlotScheduleDeleteModal = (props: Props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { deleteSlotSchedule } = useAppSelector((state) => state.slotSchedule);
    const dispatch = useAppDispatch();

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(setDeleteSlotSchedule(null))
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        if (!confirmLoading) {
            console.log('Clicked cancel button');
            dispatch(setDeleteSlotSchedule(null))
        }
    };

    return (
        <Modal
            title={<Title level={4}>Confirm</Title>}
            open={deleteSlotSchedule !== null}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <Button
                        disabled={confirmLoading}
                        onClick={handleOk}
                        className="bg-red-500 text-white1 font-medium text-md"
                    >
                        {confirmLoading ? "Deleting..." : "Delete"}
                    </Button>
                </>
            )}
        >
            <p>Are You Sure want to delete <b>{deleteSlotSchedule && deleteSlotSchedule.name}</b> Slot Schedule.</p>
        </Modal >
    )
}

export default SlotScheduleDeleteModal