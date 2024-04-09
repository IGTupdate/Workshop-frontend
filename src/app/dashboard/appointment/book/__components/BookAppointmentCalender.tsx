"use client"
import SlotAvailablityContainer from "@/app/employee/dashboard/appointment/book/__components/SlotAvailablityContainer";
import VehicleDetailContainer from "@/app/employee/dashboard/appointment/book/__components/VehicleDetailContainer";
import { slot_booking_item_customer } from "@/app/employee/dashboard/appointment/book/__utils/slot-booking-step";
import { TAppointmentBook } from "@/app/types/appointment";
import { Steps } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
        // console.log(searchParams.toString());
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
                items={slot_booking_item_customer}
            />
            {
                currentStep === 0 && <SlotAvailablityContainer />
            }
            {
                currentStep === 1 && <VehicleDetailContainer />
            }
            {
                currentStep === 2 && <h1>REVIEW</h1>
            }
        </div>
    )
}

export default BookAppointmentContainer