'use client'
import React, { useEffect, useState } from 'react';
import { AppointmentData, fetchAppointments } from '../appointment/__utils/FetchAppointments';
import AllAppointments from '../appointment/__common/AllAppointment';
import { useAppSelector } from '@/app/store/reduxHooks';
import { getAllAppointmentByCustomerId } from '@/app/services/operations/appointment/appointment';
import Watermark from '@/app/components/Text/WatermarkText';

const Page: React.FC = () => {
    const [scheduledAppointmentData, setScheduledAppointmentData] = useState<AppointmentData[]>([]);
    const authData = useAppSelector((state) => state.auth.authData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!authData || !authData._id) throw Error
                const getAllAppointments = await getAllAppointmentByCustomerId(authData._id)
                const newData = await fetchAppointments(getAllAppointments.data.data);
                setScheduledAppointmentData(newData);
                console.log("Fetched appointments:", newData);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchData();
    }, []);

    const handleShowAppointmentDetails = (appointmentId: string) => {
        console.log(`Showing Details for appointment with ID: ${appointmentId}`);
    };
    return (
        <div>
            <h1 className='text-lg font-bold bg-white p-4'>Previous Appointments</h1>
            <div className=' flex flex-col gap-4 my-4'>
                {scheduledAppointmentData.length > 0 ? (
                    scheduledAppointmentData.map(appointment => (
                        <AllAppointments
                            key={appointment.appointmentId}
                            appointment={appointment}
                            onShowDetails={handleShowAppointmentDetails}
                        />
                    ))
                ) : (
                    <div><Watermark text='No appointments found'/> </div>
                )}
            </div>
        </div>
    );
};

export default Page;
