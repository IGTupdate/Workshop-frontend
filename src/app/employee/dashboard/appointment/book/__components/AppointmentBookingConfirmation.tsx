"use client"
import DescriptionItem from '@/app/components/DescriptionItem.tsx'
import Loader from '@/app/components/Loader';
import { bookAppointment, getAppointMentBookInitData } from '@/app/services/operations/appointment/appointment';
import { useAppSelector } from '@/app/store/reduxHooks';
import { TAppointmentBook } from '@/app/types/appointment'
import { TSlot } from '@/app/types/calender';
import { TVehicle } from '@/app/types/vehicle';
import { COMMON_ERROR } from '@/app/utils/constant';
import { Button, Divider, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const { Title } = Typography

type Props = {
    appointmentBookingData: TAppointmentBook
    setAppointmentBookingData: React.Dispatch<React.SetStateAction<TAppointmentBook>>
}

type TappointmentBookingConfirmationData = {
    vehicle: null | TVehicle,
    customer: null | {
        phone: string,
        name: string,
        email: string
    },
    slot_details: TSlot | null
}

const AppointmentBookingConfirmation = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const userRole = useAppSelector(state => state.auth.authData.role)

    const [appointmentBookingConfirmationData, setAppointmentBookingConfirmationData] = useState<TappointmentBookingConfirmationData>({
        vehicle: null,
        customer: null,
        slot_details: null
    });


    useEffect(() => {
        setLoading(true);
        // console.log(props.appointmentBookingData);

        if (props.appointmentBookingData.calender_id &&
            props.appointmentBookingData.slot_id &&
            props.appointmentBookingData.customer_id &&
            props.appointmentBookingData.vehicle_id) {
            (async function () {
                try {
                    const responseData = await getAppointMentBookInitData(props.appointmentBookingData) as TappointmentBookingConfirmationData;
                    // console.log(responseData);
                    // console.log(responseData);
                    setAppointmentBookingConfirmationData(responseData)
                    setLoading(false);
                } catch (err) {
                    // console.log(err);
                }
            }());
        }

    }, [props.appointmentBookingData]);


    const handleBack = () => {
        props.setAppointmentBookingData((prv) => {
            return {
                ...prv,
                vehicle_id: ""
            }
        });
    }

    const handleBookAppointment = async () => {
        try {

            const response = await bookAppointment(props.appointmentBookingData);
            // console.log(response);
            toast.success(response?.message);
            userRole === 'customer' ? router.push(`/dashboard/appointment/${response.data._id}`) :
            router.push(`/employee/dashboard/appointment/${response.data._id}`)

        } catch (err: any) {
            toast.error(err?.response?.data?.message || COMMON_ERROR)
        }
    }


    return (
        loading ? <Loader /> : <div className='bg-white p-4'>
            <div >
                <Title level={5}>Customer Details</Title>
                <div className='grid grid-cols-2 gap-2'>
                    <DescriptionItem title='Name'
                        content={appointmentBookingConfirmationData.customer?.name || "-"} />
                    <DescriptionItem title='Phone'
                        content={appointmentBookingConfirmationData.customer?.phone || "-"} />
                    <DescriptionItem title='Email'
                        content={appointmentBookingConfirmationData.customer?.email || "-"} />

                </div>
            </div>
            <Divider />
            <div>
                <Title level={5}>Vehicle Details</Title>
                <div className='grid grid-cols-2 gap-2'>
                    <DescriptionItem title='Registeration Number'
                        content={appointmentBookingConfirmationData.vehicle?.registeration_number || "-"} />
                    <DescriptionItem title='Vin'
                        content={appointmentBookingConfirmationData.vehicle?.vin || "-"} />
                    <DescriptionItem title='Make'
                        content={appointmentBookingConfirmationData.vehicle?.vehicle_make || "-"} />
                    <DescriptionItem title='Model'
                        content={appointmentBookingConfirmationData.vehicle?.vehicle_model || "-"} />
                    <DescriptionItem title='Owner'
                        content={appointmentBookingConfirmationData.vehicle?.owner || "-"} />


                </div>
            </div>
            <Divider />
            <div>
                <Title level={5}>Slot Details</Title>
                <div className='grid grid-cols-2'>
                    <DescriptionItem title='Start'
                        content={appointmentBookingConfirmationData.slot_details?.start_time ?
                            new Date(appointmentBookingConfirmationData.slot_details?.start_time).toLocaleString()
                            : "-"} />
                    <DescriptionItem title='End'
                        content={appointmentBookingConfirmationData.slot_details?.end_time ?
                            new Date(appointmentBookingConfirmationData.slot_details?.end_time).toLocaleString()
                            : "-"} />
                </div>
            </div>

            <div className='mt-6 flex gap-4'>
                <Button onClick={handleBack} >Back </Button>
                <Button onClick={handleBookAppointment} className="bg-blue1 text-white">Book</Button>
            </div>

        </div>
    )
}

export default AppointmentBookingConfirmation