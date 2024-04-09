'use client'
import React, { useState } from 'react';
import { Button, Descriptions } from 'antd';
import { AppointmentData } from '../__utils/FetchAppointments';
import CustomModal from '@/app/components/Model/CustomModel';

interface Props {
    appointment: AppointmentData;
    onReschedule?: (id: string) => void;
    onCancel?: (id: string) => void;
    onShowDetails?: (id: string) => void;
}

const AllAppointments: React.FC<Props> = ({ appointment, onReschedule, onCancel, onShowDetails }) => {

    const [visible, setVisible] = useState(false);


    const showModal = () => {
        setVisible(true);
    };
    
    const handleOk = () => {
        onReschedule?.(appointment.appointmentId);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
        onCancel?.(appointment.appointmentId)
    };

    return (
        <>
            <Descriptions title={`Appointment Id: ${appointment.appointmentId}`} column={2} layout='vertical' className=' bg-white p-4 '>
                <Descriptions.Item label="Appointment Date">{appointment.appointmentDate}</Descriptions.Item>
                <Descriptions.Item label="Slot Timings">{`${appointment.slotTimings?.startTime} - ${appointment.slotTimings?.endTime}`}</Descriptions.Item>
                <Descriptions.Item label="Appointment Created">{appointment.appointmentCreated}</Descriptions.Item>
                <Descriptions.Item label="Vehicle VIN">{appointment.vehicleVIN}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Registration">{appointment.vehicleReg}</Descriptions.Item>
                <Descriptions.Item label="" contentStyle={{ display: 'flex', gap: '10px'}}>
                    {onReschedule && <Button onClick={() => onReschedule(appointment.appointmentId)}>Reschedule</Button>}
                    {onCancel && <Button onClick={() => showModal()}>Cancel</Button>}
                    {onShowDetails && <Button onClick={() => onShowDetails?.(appointment.appointmentId)}>Show Details</Button>}
                </Descriptions.Item>
            </Descriptions>
            <CustomModal
                title="Are you sure you want to Cancel Appointment?"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Reschedule'
                okButtonProps={{ className: "bg-customGray hover:bg-opacity-80 text-white font-semibold" }}
            >
                <p>You can reschedue it as per your convinience</p>
            </CustomModal>
        </>
    );
};

export default AllAppointments;
