"use client";

import ErrorText from '@/app/components/Text/ErrorText';
import { sendOTP } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch } from '@/app/store/reduxHooks';
import { setAuthCountryCode } from '@/app/store/slices/authSlice';
import { TCustomer } from '@/app/types/customer';
import { Button, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
    contactNumber: string,
}

type Tprops = {
    setAuthStep: React.Dispatch<React.SetStateAction<number>>;
    setCustomer: React.Dispatch<React.SetStateAction<TCustomer>>;
};
const CustomerSendOtp = (props: Tprops) => {
    const {
        handleSubmit
    } = useForm<FormInputs>();

    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (contactNumber.length === 0) setContactNumberError("Contact Number is Required");
        if (contactNumber.length !== 10) return;

        let number = countryCode === '+52' ? 1 + contactNumber : contactNumber;
        setLoading(true);
        try {
            const result = await sendOTP(countryCode, number);
            if (result?.data.success) {
                props.setAuthStep(1);
                props.setCustomer((prv) => {
                    return {
                        ...prv,
                        contactNumber,
                    };
                });

                dispatch(setAuthCountryCode(countryCode));
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

    const handleSelect = (value: string) => {
        setCountryCode(value);
    };


    return (
        <div className="w-full">

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
                <div className='md:mb-4 mb-3 relative'>
                    <label className='text-sm font-medium mb-1 block text-customGray'>Phone</label>
                    <div className="flex w-full justify-between items-center gap-2">


                        <Select
                            size="large"
                            defaultValue="+91"
                            // style={{ width: '22%', height: 42 }}
                            className="w-[28%] sm:w-[22%] h-[42px]"
                            onChange={handleSelect}
                            options={[
                                { value: '+91', label: '+91' },
                                { value: '+52', label: '+52' },
                            ]}
                        />

                        <Space.Compact
                            // style={{ width: '78%', height: '42px' }}
                            className="w-[72%] sm:w-[78%] h-[42px]"
                        >
                            {/* <Input style={{ width: '13%' }} defaultValue="1" /> */}
                            <Input
                                style={{ height: "100%" }}
                                addonBefore={countryCode === '+52' && '1'}
                                size="large"
                                value={contactNumber}
                                onChange={handleChange}
                                placeholder="Enter Your Contact Number"
                                maxLength={10} />
                        </Space.Compact>



                    </div>
                    {contactNumberError && <ErrorText text={contactNumberError} />}
                </div>
                <Button
                    loading={loading}
                    disabled={loading}
                    size="large"
                    htmlType="submit"
                    className="bg-black text-white1 font-semibold w-full border-none hover:shadow-xl">
                    Send
                </Button>
            </form>
        </div>
    );
};

export default CustomerSendOtp;
