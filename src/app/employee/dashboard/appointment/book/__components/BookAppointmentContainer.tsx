"use client"

import React, { useEffect, useState } from 'react'
import SlotAvailablityContainer from './SlotAvailablityContainer'
import { Steps } from 'antd'
import { slot_booking_step } from '../__utils/slot-booking-step'
import { useRouter, useSearchParams } from 'next/navigation'
import { TAppointmentBook } from '@/app/types/appointment'
import CustomerDetailContainer from './CustomerDetailContainer'
import VehicleDetailContainer from './VehicleDetailContainer'
import AppointmentBookingConfirmation from './AppointmentBookingConfirmation'
import { useAppSelector } from '@/app/store/reduxHooks'

type Props = {}

const BookAppointmentContainer = (props: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState<number>(0);

    const authData = useAppSelector(state => state.auth.authData);

    const [appointmentBookingData, setAppointmentBookingData] = useState<TAppointmentBook>({
        slot_id: "",
        calender_id: "",
        customer_id: "", // 65fd3718356daf4e516a09f0
        vehicle_id: ""
    });


    useEffect(() => {
        console.log(authData);
        if (authData._id) {
            setAppointmentBookingData((prv) => {
                return {
                    ...prv,
                    customer_id: authData._id || ""
                }
            })
        }
    }, [authData])

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
        if (appointmentBookingData.calender_id &&
            appointmentBookingData.slot_id &&
            appointmentBookingData.customer_id &&
            appointmentBookingData.vehicle_id) {
            setCurrentStep(3);
        }
        else if (appointmentBookingData.calender_id &&
            appointmentBookingData.slot_id &&
            appointmentBookingData.customer_id) {
            setCurrentStep(2);
        }
        else if (appointmentBookingData.slot_id && appointmentBookingData.calender_id) {
            setCurrentStep(1);
        }
        else {
            setCurrentStep(0);
        }
    }, [appointmentBookingData])

    return (
        <div>
            <Steps
                className='mb-4'
                current={currentStep}
                items={slot_booking_step}
            />
            {
                currentStep === 0 && <SlotAvailablityContainer />
            }
            {
                currentStep === 1 &&
                <CustomerDetailContainer
                    setAppointmentBookingData={setAppointmentBookingData}
                    setCurrentStep={setCurrentStep} />
            }
            {
                currentStep === 2 && <VehicleDetailContainer
                    setAppointmentBookingData={setAppointmentBookingData}
                    setCurrentStep={setCurrentStep}
                />
            }
            {
                currentStep === 3 &&
                <AppointmentBookingConfirmation
                    appointmentBookingData={appointmentBookingData}
                    setAppointmentBookingData={setAppointmentBookingData}
                />
            }
        </div>
    )
}

export default BookAppointmentContainer