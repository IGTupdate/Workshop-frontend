import Heading from '@/app/components/Heading';
import ErrorText from '@/app/components/Text/ErrorText';
import { sendOTP } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch } from '@/app/store/reduxHooks';
import { setAuthData, setAuthLoading, setAuthStep } from '@/app/store/slices/authSlice';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormInputs {
    contactNumber : string
}

const SendOTP: React.FC= () => {
    const {
        handleSubmit
      } = useForm<FormInputs>()

    const dispatch = useAppDispatch()
    const [contactNumber, setContactNumber] = useState('')
    const [contactNumberError, setContactNumberError] = useState('')

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if(contactNumber.length === 0) setContactNumberError("Contact Number is Required")
        if(contactNumber.length !== 10) return
        dispatch(setAuthLoading(true));
        try {
            const result = await sendOTP(contactNumber);
            if (result?.data.success) {
                dispatch(setAuthStep(1));
                dispatch(setAuthData({contactNumber}));
            }
        } catch (error) {
            // console.error("Error sending OTP:", error);
        } finally {
            dispatch(setAuthLoading(false));
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
            <Heading
                type='heading1'
                primary={"Authenticate"}
                secondary={"Give Your Identity"}
                primaryColor='text-black1'
            />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:mt-10 mt-8 flex flex-col gap-3">
                <div className='md:mb-4 mb-3 relative'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Phone</label>
                    <Input
                        size='large'
                        value= {contactNumber}
                        onChange={handleChange}
                        placeholder="Enter Your Contact Number"
                        maxLength={10}
                    />
                    {contactNumberError && <ErrorText text={contactNumberError}/>}
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
