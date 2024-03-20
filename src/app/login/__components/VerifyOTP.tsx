"use client"
import Heading from '@/app/components/Heading';
import { login } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { resetAuthSlice, setAuthData, setAuthLoading, setAuthStep } from '@/app/store/slices/authSlice';
import { Button, Input } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    otp: string;
}

const VerifyOTP: React.FC = () => {
    const loading = useAppSelector((state) => state.auth.authLoading);
    const userExists = useAppSelector((state) => state.auth.userExists);
    const customerData = useAppSelector((state) => state.auth.authData);
    const router = useRouter()

    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data) return;
        dispatch(setAuthLoading(true));
        try {
            if (userExists) {
                if (!customerData?.contactNumber) return
                await login(customerData?.contactNumber, data.otp);
                router.push('/dashboard')
            } else {
                dispatch(setAuthStep(2));
                dispatch(setAuthData({ ...customerData, otp: data.otp }));
            }
        } catch (error) {
            console.error("Error Verifying OTP:", error);
        }
        dispatch(setAuthLoading(false));
    };

    return (
        <div className="w-full">

            <Heading
                type='heading1'
                primary={"OTP"}
                secondary={"Give Your Identity"}
                primaryColor='text-black1'
            />

            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:mt-10 mt-8">

                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Enter OTP</label>
                    <Input type='number' {...register("otp", {
                        pattern: {
                            value: /^[0-9]{6}$/,
                            message: "ENTER VALID OTP"
                        },
                        minLength: {
                            value: 6,
                            message: "Please enter exactly 6 digits"
                        },
                        maxLength: {
                            value: 6,
                            message: "Please enter exactly 6 digits"
                        }
                    })}
                        size='large'
                        placeholder="ex - 123456"
                        className='w-full text'
                    />
                    {errors.otp && <span className='text-red-500 text-[11px] font-medium'>{errors.otp.message}</span>}
                </div>


                <Button
                    size='large'
                    htmlType='submit'
                    className='bg-blue1 text-white1 font-semibold w-full'>
                    Send
                </Button>
            </form>

        </div>
    );
}

export default VerifyOTP