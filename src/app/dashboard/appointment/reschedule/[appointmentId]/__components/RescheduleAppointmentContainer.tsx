"use client"
import AppointmentDetails from '@/app/components/Appointment/AppointmentDetails'
import SlotAvailablityContainer from '@/app/employee/dashboard/appointment/book/__components/SlotAvailablityContainer'
import { slot_booking_customer_reschedule_step } from '@/app/employee/dashboard/appointment/book/__utils/slot-booking-step'
import { TAppointment } from '@/app/types/appointment'
import { Button, Steps, Typography } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AppointmentRescheduleConfirmation from './AppointmentReschedulePreviewPage'

const { Title } = Typography

type Props = {
    vehicle_id : string,
    customer_id : string,
    appointmentId: string,
    appointmentData: TAppointment
}

const RescheduleAppointmentContainer = (props: Props) => {
    const { vehicle_id, customer_id, appointmentId } = props;
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const router = useRouter()

    const [appointmentRescheduleData, setAppointmentRescheduleData] = useState({
        slot_id: "",
        calender_id: "",
        vehicle_id,
        customer_id
    });

    useEffect(() => {
        const slot_id = searchParams.get("slot_id");
        const calender_id = searchParams.get("calender_id");
        // console.log(slot_id, calender_id)
        if (slot_id && calender_id) {
            setAppointmentRescheduleData((prv) => {
                return {
                    ...prv,
                    slot_id,
                    calender_id,
                }
            })
        }else{
            setAppointmentRescheduleData((prv) => {
                return {
                    ...prv,
                    slot_id : '',
                    calender_id : '',
                }
            })
        }
    }, [searchParams])

    useEffect(() => {
        if (appointmentRescheduleData.calender_id &&
            appointmentRescheduleData.slot_id &&
            appointmentRescheduleData.customer_id &&
            appointmentRescheduleData.vehicle_id) {
            setCurrentStep(1);
        }
        else {
            setCurrentStep(0);
        }
    }, [appointmentRescheduleData])

    return (
        <div className=' flex flex-col gap-4'>
            {currentStep===0 && <div className=' flex flex-col gap-4'>
                <Button onClick={() => router.back()} className='w-fit'>Back</Button>
                <AppointmentDetails appointmentData={props.appointmentData}/>
            </div>}
            <Steps
                className='m-4 w-[80%] mx-auto'
                current={currentStep}
                items={slot_booking_customer_reschedule_step}
            />
            {
                currentStep === 0 && <div className='px-4'><SlotAvailablityContainer /></div>
            }
            {
                currentStep === 1 &&
                <>
                    <Title level={5}>Appointment Reschedule Details</Title>
                    <AppointmentRescheduleConfirmation
                        appointmentRescheduleData={appointmentRescheduleData}
                        setAppointmentRescheduleData={setAppointmentRescheduleData}
                        appointmentId={appointmentId}
                    />
                </>
            }
        </div>
    )
}

export default RescheduleAppointmentContainer