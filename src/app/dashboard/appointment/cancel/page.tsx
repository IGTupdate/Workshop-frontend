'use client'
import React, { useEffect, useState } from 'react';
import AllAppointments from '../__common/AllAppointment';
import { AppointmentData, fetchAppointments } from '../__utils/FetchAppointments';
import { getAllAppointmentByCustomerId } from '@/app/services/operations/appointment/appointment';
import { useAppSelector } from '@/app/store/reduxHooks';
import Watermark from '@/app/components/Text/WatermarkText';

const Page: React.FC = () => {
    const [scheduledAppointmentData, setScheduledAppointmentData] = useState<AppointmentData[]>([]);
    const authData = useAppSelector((state) => state.auth.authData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!authData || !authData._id) throw Error
                const getAllScheduledAppointments = await getAllAppointmentByCustomerId(authData._id, 'scheduled')
                const newData = await fetchAppointments(getAllScheduledAppointments.data.data);
                setScheduledAppointmentData(newData);
                console.log("Fetched appointments:", newData);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchData();
    }, []);

    const handleReschedule = (appointmentId: string) => {
        console.log(`Rescheduling appointment with ID: ${appointmentId}`);
    };

    const handleCancel = (appointmentId: string) => {
        console.log(`Canceling appointment with ID: ${appointmentId}`);
    };

    return (
        <div>
            <h1 className='text-lg font-bold bg-white p-4'>Cancel Appointment</h1>
            <div className=' flex flex-col gap-4 my-4'>
                {scheduledAppointmentData.length > 0 ? (
                    scheduledAppointmentData.map(appointment => (
                        <AllAppointments
                            key={appointment.appointmentId}
                            appointment={appointment}
                            onReschedule={handleReschedule}
                            onCancel={handleCancel}
                        />
                    ))
                ) : (
                    <div><Watermark text='No Previous appointments found'/></div>
                )}
            </div>
        </div>
    );
};

export default Page;
