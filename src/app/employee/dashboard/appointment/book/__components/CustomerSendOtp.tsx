"use client"

import ErrorText from '@/app/components/Text/ErrorText';
import { sendOTP } from '@/app/services/operations/auth/customerAuth';
import { TCustomer } from '@/app/types/customer';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
    contactNumber: string,
}

type Tprops = {
    setAuthStep: React.Dispatch<React.SetStateAction<number>>
    setCustomer: React.Dispatch<React.SetStateAction<TCustomer>>
}
const CustomerSendOtp = (props: Tprops) => {
    const {
        handleSubmit
    } = useForm<FormInputs>();

    const [loading, setLoading] = useState(false);
    const [contactNumber, setContactNumber] = useState('')
    const [contactNumberError, setContactNumberError] = useState('')

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (contactNumber.length === 0) setContactNumberError("Contact Number is Required")
        if (contactNumber.length !== 10) return;
        setLoading(true);
        try {
            const result = await sendOTP(contactNumber);
            if (result?.data.success) {
                props.setAuthStep(1);
                props.setCustomer((prv) => {
                    return {
                        ...prv,
                        contactNumber,
                    }
                })
            }
        } catch (error: any) {
            // setContactNumberError(error.response.data.message || COMMON_ERROR);
        } finally {
            setLoading(true);

        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const reg = /^[0-9]*$/;

        if (!reg.test(inputValue)) {
            setContactNumberError('Contact Number must be digits');
        } else if (inputValue.length !== 10) {
            setContactNumberError('Contact Number must have 10 digits');
        } else {
            setContactNumberError('');
        }

        setContactNumber(inputValue);
    };

    return (
        <div className="w-full">

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
                <div className='md:mb-4 mb-3 relative'>
                    <label className='text-sm font-medium mb-1 block text-customGray'>Phone</label>
                    <Input
                        size='large'
                        value={contactNumber}
                        onChange={handleChange}
                        placeholder="Enter Your Contact Number"
                        maxLength={10}
                    />
                    {contactNumberError && <ErrorText text={contactNumberError} />}
                </div>
                <Button
                    disabled={loading}
                    size='large'
                    htmlType='submit'
                    type='primary'>
                    Send
                </Button>
            </form>
        </div>
    );
}

export default CustomerSendOtp;
