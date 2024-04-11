"use client"
import AppointmentDetails from '@/app/components/Appointment/AppointmentDetails';
import Loader from '@/app/components/Loader';
import { getAppointmentByAppointmentId } from '@/app/services/operations/appointment/appointment';
import { TAppointment } from '@/app/types/appointment';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react'

type Props = {
    appointmentId: string
}

const { Text } = Typography

const AppointmentPageContiner = (props: Props) => {
    const [loading, setLoading] = useState(true);

    const [appointment, setAppointment] = useState<TAppointment | null>(null);

    useEffect(() => {

        console.log("changed", props.appointmentId)

        fetchAppointmentData();

    }, [props.appointmentId]);

    const fetchAppointmentData = async () => {
        setLoading(true);
        try {
            const result = await getAppointmentByAppointmentId(props.appointmentId);
            setAppointment(result);
        } catch (err) {
            // Handle error
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            {
                loading ? <Loader /> : (
                    appointment ? <AppointmentDetails appointmentData={appointment} /> : <Text>Appointment not found</Text>
                )
            }

        </div>
    )
}

export default AppointmentPageContiner