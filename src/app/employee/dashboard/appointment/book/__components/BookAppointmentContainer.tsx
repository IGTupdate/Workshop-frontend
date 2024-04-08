"use client"

import React, { useEffect, useState } from 'react'
import SlotAvailablityContainer from './SlotAvailablityContainer'
import { Steps } from 'antd'
import { slot_booking_item } from '../__utils/slot-booking-step'
import { useRouter, useSearchParams } from 'next/navigation'
import { TAppointmentBook } from '@/app/types/appointment'
import CustomerDetailContainer from './CustomerDetailContainer'
import VehicleDetailContainer from './VehicleDetailContainer'


type Props = {}

const BookAppointmentContainer = (props: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState<number>(0);

    const [appointmentBookingData, setAppointmentBookingData] = useState<TAppointmentBook>({
        slot_id: "",
        calender_id: "",
        customer_id: "",
        vehicle_id: ""
    })

    useEffect(() => {
        console.log(searchParams.toString());
        const slot_id = searchParams.get("slot_id");
        const calender_id = searchParams.get("calender_id");
        if (slot_id && calender_id) {
            setAppointmentBookingData((prv) => {
                return {
                    ...prv,
                    slot_id,
                    calender_id,
                }
            })
        }
    }, [searchParams])

    useEffect(() => {
        if (appointmentBookingData.slot_id && appointmentBookingData.calender_id) {
            setCurrentStep(1);
        }
    }, [appointmentBookingData])

    return (
        <div>
            <Steps
                className='mb-4'
                current={currentStep}
                items={slot_booking_item}
            />
            {
                currentStep === 0 && <SlotAvailablityContainer />
            }
            {
                currentStep === 1 && <CustomerDetailContainer setCurrentStep={setCurrentStep} />
            }
            {
                currentStep === 2 && <VehicleDetailContainer />
            }
        </div>
    )
}

export default BookAppointmentContainer