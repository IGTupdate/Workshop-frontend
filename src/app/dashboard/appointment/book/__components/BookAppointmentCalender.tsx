"use client"
import SlotAvailablityContainer from '@/app/employee/dashboard/appointment/book/__components/SlotAvailablityContainer'
import { slot_booking_customer_step } from '@/app/employee/dashboard/appointment/book/__utils/slot-booking-step'
import { useAppSelector } from '@/app/store/reduxHooks'
import { TAppointmentBook } from '@/app/types/appointment'
import { Steps } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ServicePlanSelection from './ServicePlanSelection'
import VehicleDetailContainer from './VehicleDetailContainer'
import { setQueryParams } from '@/app/utils/helper'
import CustomerAppointmentBookingConfirmation from './CustomerAppointmentBookingConfirmation'

const BookAppointmentContainer: React.FC = () => {
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState<number>(0);
    const authData = useAppSelector(state => state.auth.authData);
    // const [showServicePlans, setShowServicePlans] = useState(JSON.parse(localStorage.getItem('showServicePlans') || JSON.stringify(true)))
    const [appointmentBookingData, setAppointmentBookingData] = useState<TAppointmentBook>(JSON.parse(localStorage.getItem('appointmentBookingData') || JSON.stringify({
        slot_id: "",
        calender_id: "",
        customer_id: "",
        vehicle_id: "",
        service_plans: JSON.parse(localStorage.getItem('selectedPlans') || JSON.stringify([])),
        service_description: [],
        showServicePlans: true
    })));
    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem('appointmentBookingData', JSON.stringify(appointmentBookingData))
        if(appointmentBookingData.slot_id && appointmentBookingData.calender_id){
            let queryParams = setQueryParams(searchParams.toString(), "slot_id", appointmentBookingData.slot_id);
            queryParams = setQueryParams(queryParams, "calender_id", appointmentBookingData.calender_id);
            router.push(`${pathname}?${queryParams}`);
        }
    },[appointmentBookingData])

  useEffect(() => {
    if (authData._id) {
      setAppointmentBookingData((prevData) => ({
        ...prevData,
        customer_id: authData._id || "",
      }));
    }
  }, [authData]);


    useEffect(() => {
        const slot_id = searchParams.get("slot_id");
        const calender_id = searchParams.get("calender_id");
        if (slot_id && calender_id) {
            setAppointmentBookingData(prevData => ({ ...prevData, slot_id, calender_id }));
        } else {
            setAppointmentBookingData(prevData => ({ ...prevData, slot_id: '', calender_id: '' }));
        }
    }, [searchParams]); 

    useEffect(() => {
        const { calender_id, slot_id, customer_id, vehicle_id, showServicePlans } = appointmentBookingData;
        if(calender_id && slot_id && customer_id && vehicle_id && !showServicePlans){
            setCurrentStep(3)
        }else if (calender_id && slot_id && customer_id && vehicle_id && showServicePlans) {
            setCurrentStep(2);
        } else if (calender_id && slot_id && customer_id) {
            setCurrentStep(1);
        } else {
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
            {currentStep === 0 && <SlotAvailablityContainer />}
            {currentStep === 1 && <VehicleDetailContainer setAppointmentBookingData={setAppointmentBookingData} />}
            {currentStep === 2 && <ServicePlanSelection appointmentBookingData={appointmentBookingData} setAppointmentBookingData={setAppointmentBookingData} setCurrentStep={setCurrentStep} />}
            {currentStep === 3 && <CustomerAppointmentBookingConfirmation appointmentBookingData={appointmentBookingData} setAppointmentBookingData={setAppointmentBookingData} setCurrentStep={setCurrentStep} />}
        </div>
    );
}

export default BookAppointmentContainer;
