"use client"

import React, { useState } from 'react'
import SendOTP from './SendOTP';
import Register from './Register';
import VerifyOTP from './VerifyOTP';
import { useAppSelector } from '@/app/store/reduxHooks';
import Loader from '@/app/components/Loader/index';

type Props = {}

const RightSection = (props: Props) => {

    const loading = useAppSelector((state) => state.auth.authLoading)

    const [step, setStep] = useState(1)
    return (
        <div className='relative md:z-[0] z-[10] w-full h-full md:p-10 xl:pl-20 py-16 px-6 flex items-center justify-center xl:justify-start bg-white1 rounded-t-[50px]'>
            {
                loading ? <Loader /> : <div className='w-full sm:max-w-[320px]'>
                    {
                        step === 1 && <SendOTP />
                    }
                    {
                        step === 2 && <VerifyOTP />
                    }
                    {
                        step === 3 && <Register />
                    }
                </div>
            }


        </div>
    )
}

export default RightSection;