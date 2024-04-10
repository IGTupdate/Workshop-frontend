import { Descriptions, Tag, Typography } from 'antd';
import React from 'react';

interface Props {
    appointmentData: any;
}

const AppointmentDetails: React.FC<Props> = ({ appointmentData }) => {
    return (
        <div className=' bg-white p-4'>
            <Typography.Title level={2}>Appointment Details</Typography.Title>
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Appointment ID">{appointmentData._id}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Make">{appointmentData.vehicle_id.vehicle_make}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Model">{appointmentData.vehicle_id.vehicle_model}</Descriptions.Item>
                <Descriptions.Item label="VIN">{appointmentData.vehicle_id.vin}</Descriptions.Item>
                <Descriptions.Item label="Registration Number">{appointmentData.vehicle_id.registeration_number}</Descriptions.Item>
                <Descriptions.Item label="Owner">{appointmentData.vehicle_id.owner}</Descriptions.Item>
                <Descriptions.Item label="Appointment Date">{appointmentData.calender_id.date}</Descriptions.Item>
                <Descriptions.Item label="Start Time">{appointmentData.calender_id.slots[0].start_time}</Descriptions.Item>
                <Descriptions.Item label="End Time">{appointmentData.calender_id.slots[0].end_time}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Tag color={appointmentData.status === 'Cancelled' ? 'red' : 'green'}>
                        {appointmentData.status}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Created At">{appointmentData.createdAt}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{appointmentData.updatedAt}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}

export default AppointmentDetails;
