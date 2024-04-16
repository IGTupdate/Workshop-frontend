"use client"
import DescriptionItem from '@/app/components/DescriptionItem.tsx';
import Loader from '@/app/components/Loader';
import { getAllCustomerAppointment, getAppointMentBookInitData, rescheduleAppointment } from '@/app/services/operations/appointment/appointment';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { TAppointment, TAppointmentBook } from '@/app/types/appointment';
import { TSlot } from '@/app/types/calender';
import { TVehicle } from '@/app/types/vehicle';
import { COMMON_ERROR } from '@/app/utils/constants/constant';
import { removeQueryParams } from '@/app/utils/helper';
import { Button, Divider, Typography } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const { Title } = Typography

type Props = {
    appointmentRescheduleData: TAppointmentBook
    setAppointmentRescheduleData: React.Dispatch<React.SetStateAction<TAppointmentBook>>,
    appointmentId: string
}

type TappointmentRescheduleConfirmationData = {
    vehicle: null | TVehicle,
    customer: null | {
        phone: string,
        name: string,
        email: string
    },
    slot_details: TSlot | null
}

const AppointmentRescheduleConfirmation = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const userRole = useAppSelector(state => state.auth.authData.role);
    const dispatch = useAppDispatch()

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [appointmentRescheduleConfirmationData, setAppointmentRescheduleConfirmationData] = useState<TappointmentRescheduleConfirmationData>({
        vehicle: null,
        customer: null,
        slot_details: null
    });


    useEffect(() => {
        setLoading(true);

        if (props.appointmentRescheduleData.calender_id &&
            props.appointmentRescheduleData.slot_id &&
            props.appointmentRescheduleData.customer_id &&
            props.appointmentRescheduleData.vehicle_id) {
            (async function () {
                try {
                    const responseData = await getAppointMentBookInitData(props.appointmentRescheduleData) as TappointmentRescheduleConfirmationData;
                    setAppointmentRescheduleConfirmationData(responseData)
                    setLoading(false);
                } catch (err) {
                    // console.log(err);
                }
            }());
        }

    }, [props.appointmentRescheduleData]);

    const handleBack = () => {
        props.setAppointmentRescheduleData((prv) => {
            return {
                ...prv,
                slot_id: '',
                calender_id: '',
            }
        })
    }

    const handleRescheduleAppointment = async () => {
        try {
            setLoading(true);
            await rescheduleAppointment(props.appointmentId, { calender_id: props.appointmentRescheduleData.calender_id, slot_id: props.appointmentRescheduleData.slot_id });
            userRole === 'customer' ? router.push(`/dashboard/appointment/${props.appointmentId}`) :
                router.push(`/employee/dashboard/appointment/${props.appointmentId}`)

            dispatch(getAllCustomerAppointment());

        } catch (err: any) {
        } finally {
            setLoading(false);
        }
    }

    const changeSlotDetails = () => {
        let queryParams = removeQueryParams(searchParams.toString(), "slot_id");
        queryParams = removeQueryParams(queryParams, "calender_id");

        router.push(`${pathname}?${queryParams}`);
    }


    return (
        loading ? <Loader /> : <div className='bg-white p-4'>
            <div >
                <div className='grid grid-cols-2'>
                    <Title level={5}>Customer Details</Title>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DescriptionItem title='Name'
                        content={appointmentRescheduleConfirmationData.customer?.name || "-"} />
                    <DescriptionItem title='Phone'
                        content={appointmentRescheduleConfirmationData.customer?.phone || "-"} />
                    <DescriptionItem title='Email'
                        content={appointmentRescheduleConfirmationData.customer?.email || "-"} />

                </div>
            </div>
            <Divider />
            <div>
                <div className='grid grid-cols-2'>
                    <Title level={5}>Vehicle Details</Title>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <DescriptionItem title='Registeration Number'
                        content={appointmentRescheduleConfirmationData.vehicle?.registeration_number || "-"} />
                    <DescriptionItem title='Vin'
                        content={appointmentRescheduleConfirmationData.vehicle?.vin || "-"} />
                    <DescriptionItem title='Make'
                        content={appointmentRescheduleConfirmationData.vehicle?.vehicle_make || "-"} />
                    <DescriptionItem title='Model'
                        content={appointmentRescheduleConfirmationData.vehicle?.vehicle_model || "-"} />
                    <DescriptionItem title='Owner'
                        content={appointmentRescheduleConfirmationData.vehicle?.owner || "-"} />


                </div>
            </div>
            <Divider />
            <div>
                <div className='grid grid-cols-2'>
                    <Title level={5}>Slot Details</Title>
                    <div className='flex justify-end'>
                        <Button type='link' onClick={changeSlotDetails}>Change</Button>
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <DescriptionItem title='Start'
                        content={appointmentRescheduleConfirmationData.slot_details?.start_time ?
                            new Date(appointmentRescheduleConfirmationData.slot_details?.start_time).toLocaleString()
                            : "-"} />
                    <DescriptionItem title='End'
                        content={appointmentRescheduleConfirmationData.slot_details?.end_time ?
                            new Date(appointmentRescheduleConfirmationData.slot_details?.end_time).toLocaleString()
                            : "-"} />
                </div>
            </div>

            <div className='mt-6 flex gap-4'>
                <Button onClick={() => { handleBack(); router.push(pathname) }} >Back </Button>
                <Button onClick={handleRescheduleAppointment} className="bg-blue1 text-white">Reschedule</Button>
            </div>

        </div>
    )
}

export default AppointmentRescheduleConfirmation