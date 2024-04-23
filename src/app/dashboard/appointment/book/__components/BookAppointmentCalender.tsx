"use client";
import AppointmentBookingConfirmation from '@/app/employee/dashboard/appointment/book/__components/AppointmentBookingConfirmation';
import SlotAvailablityContainer from '@/app/employee/dashboard/appointment/book/__components/SlotAvailablityContainer';
import { slot_booking_customer_step } from '@/app/employee/dashboard/appointment/book/__utils/slot-booking-step';
import { useAppSelector } from '@/app/store/reduxHooks';
import { TAppointmentBook } from '@/app/types/appointment';
import { Steps } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import VehicleDetailContainer from './VehicleDetailContainer';

type Props = {};

const BookAppointmentContainer = (props: Props) => {
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState<number>(0);

    const authData = useAppSelector(state => state.auth.authData);

    const [appointmentBookingData, setAppointmentBookingData] = useState<TAppointmentBook>({
        slot_id: "",
        calender_id: "",
        customer_id: "",
        vehicle_id: ""
    });


    useEffect(() => {
        if (authData._id) {
            setAppointmentBookingData((prv) => {
                return {
                    ...prv,
                    customer_id: authData._id || ""
                };
            });
        }
    }, [authData]);

    useEffect(() => {
        // console.log(searchParams.toString());
        const slot_id = searchParams.get("slot_id");
        const calender_id = searchParams.get("calender_id");
        if (slot_id && calender_id) {
            setAppointmentBookingData((prv) => {
                return {
                    ...prv,
                    slot_id,
                    calender_id,
                };
            });
        } else {
            setAppointmentBookingData((prv) => {
                return {
                    ...prv,
                    slot_id: '',
                    calender_id: '',
                };
            });
        }
    }, [searchParams]);

    useEffect(() => {
        if (appointmentBookingData.calender_id &&
            appointmentBookingData.slot_id &&
            appointmentBookingData.customer_id &&
            appointmentBookingData.vehicle_id) {
            setCurrentStep(2);
        }
        else if (appointmentBookingData.calender_id &&
            appointmentBookingData.slot_id &&
            appointmentBookingData.customer_id) {
            setCurrentStep(1);
        }
        else {
            setCurrentStep(0);
        }
    }, [appointmentBookingData]);

    return (
        <div>
            <Steps
                className='mb-4'
                current={currentStep}
                labelPlacement="vertical"
                direction="horizontal"
                items={slot_booking_customer_step}
            />
            {
                currentStep === 0 && <SlotAvailablityContainer />
            }
            {
                currentStep === 1 && <VehicleDetailContainer
                    setAppointmentBookingData={setAppointmentBookingData}
                />
            }
            {
                currentStep === 2 &&
                <AppointmentBookingConfirmation
                    appointmentBookingData={appointmentBookingData}
                    setAppointmentBookingData={setAppointmentBookingData}
                />
            }
        </div>
    );
};

export default BookAppointmentContainer;