"use client"
import Heading from '@/app/components/Heading';
import { sendOTP } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { Button, Input } from 'antd';
import { setAuthData, setAuthLoading, setAuthStep, setUserExists } from '@/app/store/slices/authSlice';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import contactNumberValidationSchema from '@/app/validators/contact-number';
import { yupResolver } from '@hookform/resolvers/yup';



const SendOTP: React.FC = () => {
    const loading = useAppSelector((state) => state.auth.authLoading)
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            contactNumber: ""
        },
        resolver: yupResolver(contactNumberValidationSchema)
    });

    const onSubmit = async (data) => {

        if (!data) return;
        dispatch(setAuthLoading(true))
        try {
            const result = await sendOTP(data.contactNumber);
            if (result?.data.success) {
                dispatch(setAuthStep(2));
                dispatch(setAuthData({ ...data }))
                dispatch(setUserExists(result.data.data.customerExists))
            }

        } catch (error) {
            console.error("Error sending OTP:", error);
        } finally {
            dispatch(setAuthLoading(false))
        }
    };

    console.log(errors)

    return (
        <div className="w-full">

            <Heading
                type='heading1'
                primary={"Authenticate"}
                secondary={"Give Your Identity"}
                primaryColor='text-black1'
            />

            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:mt-10 mt-8">

                {/* input field */}
                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Phone</label>
                    <Input type="text" {...register("contactNumber")}
                        size='large'
                        placeholder="ex - 0123456789"
                        className='w-full text'
                    />
                    {errors.contactNumber && <span className='text-red-500 text-[11px] font-medium'>{errors.contactNumber.message}</span>}
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

export default SendOTP;
