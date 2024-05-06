"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Fly from "../../../../../public/images/fly.webp";
import { TAppointmentWorkOrderStatus } from '@/app/types/appointment';

type Props = {
    status: TAppointmentWorkOrderStatus | null
}

const StepBar = ({ status }: Props) => {
    const [step, setStep] = useState<number>(0);

    useEffect(() => {
        if (status?.appointmentStatus === "Assigned") setStep(1);
        if (status?.appointmentStatus === "Scheduled") setStep(2);
        if (status?.appointmentStatus === "Cancelled") setStep(3);
        if (status?.appointmentStatus === "Completed") setStep(4);
        if (status?.appointmentStatus === "Scheduled") setStep(5);
        if (status?.appointmentStatus === "Missed") setStep(6);
    }, [status]);
    return (
        <div className='flex justify-between items-center relative before:content-[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:w-full before:h-2 before:bg-gradient-to-r before:from-[#FFE301] before:to-[#A79638]'>
            {
                step === 1 ?
                    <div className='z-20 flex flex-col items-center pt-4'>
                        <Image src={Fly} alt='Fly' />
                        <p className='font-semibold'>Assigned</p>
                    </div>
                    : <div className='h-[22px] w-[22px] rounded-full bg-[#FBE005] z-10'></div>
            }
            {
                step === 2 ?
                    <div className='z-20 flex flex-col items-center pt-4'>
                        <Image src={Fly} alt='Fly' />
                        <p className='font-semibold'>Under Process</p>
                    </div>
                    : <div className='h-[22px] w-[22px] rounded-full bg-[#EBD10F] z-10'></div>
            }
            {
                step === 3 ?
                    <div className='z-20 flex flex-col items-center pt-4'>
                        <Image src={Fly} alt='Fly' />
                        <p className='font-semibold'>Repairing</p>
                    </div>
                    : <div className='h-[22px] w-[22px] rounded-full bg-[#DAC219] z-10'></div>
            }
            {
                step === 4 ?
                    <div className='z-20 flex flex-col items-center pt-4'>
                        <Image src={Fly} alt='Fly' />
                        <p className='font-semibold'>Washing</p>
                    </div>
                    : <div className='h-[22px] w-[22px] rounded-full bg-[#C9B424] z-10'></div>
            }
            {
                step === 5 ?
                    <div className='z-20 flex flex-col items-center pt-4'>
                        <Image src={Fly} alt='Fly' />
                        <p className='font-semibold'>Payment</p>
                    </div>
                    : <div className='h-[22px] w-[22px] rounded-full bg-[#AD9C32] z-10'></div>
            }
            {
                step === 6 ?
                    <div className='z-20 flex flex-col pt-4'>
                        <Image src={Fly} alt='Fly' />
                        <p className='font-semibold'>Delivery</p>
                    </div>
                    : <div className='h-[22px] w-[22px] rounded-full bg-[#AD9C35] z-10'></div>
            }

        </div>
    );
};

export default StepBar;
