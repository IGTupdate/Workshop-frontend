"use client";

import Loader from '@/app/components/Loader';
import Register from '@/app/login/__components/Register';
import SendOTP from '@/app/login/__components/SendOTP';
import VerifyOTP from '@/app/login/__components/VerifyOTP';
import { useAppSelector } from '@/app/store/reduxHooks';
import { TAppointmentBook } from '@/app/types/appointment'
import { Button, Typography } from 'antd'
import React, { useState } from 'react';

const { Title } = Typography;

type Props = {
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    setAppointmentBookingData: React.Dispatch<React.SetStateAction<TAppointmentBook>>
}

const CustomerDetailContainer = (props: Props) => {
    const { authLoading, authStep } = useAppSelector((state) => state.auth)



    return (
        <div>

            <div className='mb-5'>
                <Title level={5}>Fill Customer Details</Title>
            </div>

            <div className='grid grid-cols-2'>
                {
                    authLoading ? <Loader /> : <div className='w-full sm:max-w-[320px]'>
                        {
                            authStep === 0 && <SendOTP />
                        }
                        {
                            authStep === 1 && <VerifyOTP />
                        }
                        {/* {
                            authStep === 2 && <Register />
                        } */}
                    </div>
                }
            </div>


            <Button onClick={() => {
                props.setCurrentStep(2);
            }}>Proceed for now as demo customer</Button>
        </div>
    )
}

export default CustomerDetailContainer