"use client";

import React, { useState } from 'react';
import SendOTP from './SendOTP';
import Register from './Register';
import VerifyOTP from './VerifyOTP';
import { useAppSelector } from '@/app/store/reduxHooks';
import Loading from '../Loading';

type Props = {};

const RightSection = (props: Props) => {

    const loading = useAppSelector((state) => state.auth.authLoading);

    const step = useAppSelector((state) => state.auth.authStep);
    return (
        <div className='relative md:z-[0] z-[10] w-full h-full md:p-10 xl:pl-20 py-16 px-6 flex items-center justify-center bg-white1 rounded-t-[50px]'>
            {
                loading ? <Loading /> : <div className='w-full sm:max-w-[320px]'>
                    {
                        step === 0 && <SendOTP />
                    }
                    {
                        step === 1 && <VerifyOTP />
                    }
                    {
                        step === 2 && <Register />
                    }
                </div>
            }


        </div>
    );
};

export default RightSection;