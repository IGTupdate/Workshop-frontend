'use client'
import Watermark from '@/app/components/Text/WatermarkText';
import { getAllCustomerAppointment } from '@/app/services/operations/appointment/appointment';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import React, { useEffect, useState } from 'react';
import AllAppointments from '../appointment/__common/AllAppointment';
import { AppointmentData, fetchAppointments } from '../appointment/__utils/FetchAppointments';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const [scheduledAppointmentData, setScheduledAppointmentData] = useState<AppointmentData[]>([]);
    const { appointmentLoading, appointmentData } = useAppSelector((state) => state.customerAppointment)
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        if(appointmentLoading){
            // console.log("APPOINTMENT DATA FETCHED")
            dispatch(getAllCustomerAppointment())
        }
    }, [appointmentLoading]);

    useEffect(() => {
        // console.log(appointmentData)
        const allAppointmentsData : AppointmentData[] = fetchAppointments(appointmentData)
        setScheduledAppointmentData(allAppointmentsData)
    }, [appointmentData]);

    // useEffect(() => {
    //     console.log(scheduledAppointmentData)
    // }, [scheduledAppointmentData])

    const handleShowAppointmentDetails = (appointmentId: string) => {
        router.push('/dashboard/appointment/'+appointmentId)
    };
    return (
        <>
        {
            appointmentLoading ? (<h1>Loading</h1>) : (
                <div>
                    <h1 className='text-lg font-bold bg-white p-4'>Previous Appointments</h1>
                    <div className=' flex flex-col gap-4 my-4'>
                        {scheduledAppointmentData.length > 0 ? (
                            scheduledAppointmentData.map(appointment => (
                                <AllAppointments
                                    key={appointment.appointmentId}
                                    appointment={appointment}
                                    onShowAppointmentDetails={handleShowAppointmentDetails}
                                />
                            ))
                        ) : (
                            <div><Watermark text='No appointments found'/> </div>
                        )}
                    </div>
                </div>
            ) 
        }
        </>
    );
};

export default Page;
