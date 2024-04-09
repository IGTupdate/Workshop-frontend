'use client'
import React, { useState } from 'react';
import { Button, Descriptions } from 'antd';
import { AppointmentData } from '../__utils/FetchAppointments';
import CustomModal from '@/app/components/Model/CustomModel';

interface Props {
    appointment: AppointmentData;
    onRescheduleAppointment?: (id: string) => void;
    onCancelAppointment?: (id: string) => void;
    onShowAppointmentDetails?: (id: string) => void;
}

const AllAppointments: React.FC<Props> = ({ appointment, onRescheduleAppointment, onCancelAppointment, onShowAppointmentDetails }) => {

    const [visible, setVisible] = useState(false);


    const showModal = () => {
        setVisible(true);
    };
    
    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Descriptions title={`Appointment Id: ${appointment.appointmentId}`} column={2} className=' bg-white p-4 pb-0 '>
                <Descriptions.Item label="Appointment Date">{appointment.appointmentDate}</Descriptions.Item>
                <Descriptions.Item label="Slot Timings">{`${appointment.slotTimings?.startTime} - ${appointment.slotTimings?.endTime}`}</Descriptions.Item>
                <Descriptions.Item label="Appointment Created">{appointment.appointmentCreated}</Descriptions.Item>
                <Descriptions.Item label="Vehicle VIN">{appointment.vehicleVIN}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Registration">{appointment.vehicleReg}</Descriptions.Item>
                <Descriptions.Item label="Status">{appointment.status}</Descriptions.Item>
                <Descriptions.Item label="" contentStyle={{ display: 'flex', justifyContent: 'end', paddingRight: '25%', gap: '10px'}}>
                    {onRescheduleAppointment && <Button onClick={() => onRescheduleAppointment(appointment.appointmentId)}>Reschedule</Button>}
                    {onCancelAppointment && <Button onClick={() => showModal()}>Cancel</Button>}
                    {onShowAppointmentDetails && <Button onClick={() => onShowAppointmentDetails?.(appointment.appointmentId)}>Show Details</Button>}
                </Descriptions.Item>
            </Descriptions>
            <CustomModal
                title="Are you sure you want to Cancel Appointment?"
                open={visible}
                onCancel={handleCancel}
                footer={[
                    onRescheduleAppointment && <Button key="reschedule" onClick={() => {handleCancel(); onRescheduleAppointment(appointment.appointmentId)}}>Reschedule</Button>,
                    onCancelAppointment && <Button key="cancel" onClick={() => {handleCancel(); onCancelAppointment(appointment.appointmentId)}}>Cancel</Button>,
                ]}
            >
                <p>You can reschedule it as per your convenience</p>
            </CustomModal>
        </>
    );
};

export default AllAppointments;
