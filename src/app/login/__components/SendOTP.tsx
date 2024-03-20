"use client"
import Heading from '@/app/components/Heading';
import { sendOTP } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { setAuthLoading, setAuthStep } from '@/app/store/slices/authSlice';
import { Button, Input } from 'antd';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    contactNumber: string;
}

const SendOTP: React.FC = () => {
    const loading = useAppSelector((state) => state.auth.authLoading)
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data) return;
        dispatch(setAuthLoading(true))
        try {
            const result = await sendOTP(data.contactNumber);
            if (result?.data.success) dispatch(setAuthStep(1));
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
        dispatch(setAuthLoading(false))
    };

    return (
        <div className="w-full">
            {
                loading ? (
                    <div>Loading</div>
                ) : (

                    <div>

                        <Heading
                            type='heading1'
                            primary={"OTP"}
                            secondary={"Give Your Identity"}
                            primaryColor='text-black1'
                        />

                        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:mt-10 mt-8">

                            {/* input field */}
                            <div className='md:mb-4 mb-3'>
                                <label className='text-sm font-medium mb-1 block text-black1'>OTP</label>
                                <Input type='number' {...register("contactNumber", {
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Please enter a valid phone number in the format xxx-xxx-xxxx"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Please enter exactly 10 digits"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Please enter exactly 10 digits"
                                    }
                                })}
                                    size='large'
                                    placeholder="Enter OTP"
                                    className='w-full text'
                                />
                                {errors.contactNumber && <span className='text-red-500 text-[11px] font-medium'>{errors.contactNumber.message}</span>}
                            </div>

                            <Button
                                size='large'
                                htmlType='submit'
                                className='bg-blue1 text-white1 font-semibold w-full'>
                                Verify
                            </Button>
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default SendOTP;
