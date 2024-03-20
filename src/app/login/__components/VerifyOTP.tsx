"use client"
import { login } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { resetAuthSlice, setAuthData, setAuthLoading, setAuthStep } from '@/app/store/slices/authSlice';
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
                if(!customerData?.contactNumber) return
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
        <div className="flex justify-center items-center h-screen">
            {
                loading ? (
                    <div>Loading</div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
                        <input
                            type="number"
                            {...register("otp", {
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
                            placeholder='Enter OTP'
                            className="border-2 px-4 py-2 border-black"
                        />
                        {errors.otp && <span>{errors.otp.message}</span>}
                        <button type="submit">Verify</button>
                    </form>
                )
            }
        </div>
    );
}

export default VerifyOTP