"use client"

import Heading from '@/app/components/Heading';
import { Input } from 'antd';

import React, { useState } from 'react'
import LogIn from './Login';
import SendOTP from './SendOTP';
import Register from './Register';

type Props = {}

const RightSection = (props: Props) => {

    const [step, setStep] = useState(3)
    return (
        <div className='relative md:z-[0] z-[10] w-full h-full md:p-10 xl:pl-20 py-16 px-6 flex items-center justify-center xl:justify-start bg-white1 rounded-t-[50px]'>
            <div className='w-full sm:max-w-[320px]'>
                {
                    step === 1 && <LogIn setStep={setStep} />
                }
                {
                    step === 2 && <SendOTP />
                }
                {
                    step === 3 && <Register />
                }
            </div>
        </div>
    )
}

export default RightSection;