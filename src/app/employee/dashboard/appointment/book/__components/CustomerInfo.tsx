"use client";

import Heading from '@/app/components/Heading';
import { apiOpenConnector } from '@/app/services/apiOpenConnector';
import { authEndpoints } from '@/app/services/apis';
import { TCustomer } from '@/app/types/customer';
import { COMMON_ERROR } from '@/app/utils/constants/constant';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type FormData = {
    fullName: string;
    email: string;
};

const { AUTH_API } = authEndpoints;


type Props = {
    setCustomer: React.Dispatch<React.SetStateAction<TCustomer>>,
    setAuthStep: React.Dispatch<React.SetStateAction<number>>,
    customer: TCustomer;
};

const Register = (props: Props) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            // await registerCustomer(data.fullName, data.email, dispatch)'
            const response = await apiOpenConnector({
                method: "POST",
                url: AUTH_API + "?employee=true",
                bodyData: {
                    fullName: data.fullName,
                    email: data.email
                }
            });
            props.setAuthStep(3);

        } catch (err: any) {
            toast.error(err?.response?.data?.message || COMMON_ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Heading
                type='heading1'
                primary={"Share with us"}
                secondary={"Join Us: Log in for Seamless Integration"}
                primaryColor='text-black1'
            />

            <form className='w-full md:mt-10 mt-8' onSubmit={handleSubmit(onSubmit)}>

                {/* input field */}
                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Name</label>
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <Input
                                type='text'
                                size='large'
                                placeholder="Enter Name"
                                className='w-full text'
                                {...field}
                            />
                        )}
                    />
                    {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
                </div>

                {/* input field */}
                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Email</label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
                        render={({ field }) => (
                            <Input
                                type='text'
                                size='large'
                                placeholder="Enter Email"
                                className='w-full text'
                                {...field}
                            />
                        )}
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>

                <Button
                    loading={loading}
                    disabled={loading}
                    size="large"
                    htmlType="submit"
                    className="bg-black text-white1 font-semibold w-full border-none hover:shadow-xl">
                    Save
                </Button>
            </form>
        </div>
    );
};

export default Register;
