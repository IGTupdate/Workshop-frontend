"use client"
import Heading from '@/app/components/Heading';
import ErrorText from '@/app/components/Text/ErrorText';
import { sendOTP, verifyOTP } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { setAuthLoading, setAuthStep } from '@/app/store/slices/authSlice';
import { Button } from 'antd';
import { InputOTP } from 'antd-input-otp';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";

const VerifyOTP = () => {
    const contact = useAppSelector((state) => state.auth.authData.contactNumber);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [otpValues, setOtpValues] = useState<string[]>([]);
    const [otpErrors, setOTPErrors] = useState('');

    const handleFinish = async () => {
        const otp = otpValues.join('');
        if (!otp || otp.trim() === '') {
            setOTPErrors("OTP is required");
            return;
        }
        if (otp.length !== 6) {
            setOTPErrors("OTP must be of 6 digits");
            return;
        }
        if (otp.length === 6) {
            setOTPErrors('');
        }
        
        dispatch(setAuthLoading(true));

        let result
        try {
            result = await verifyOTP(contact, otp, dispatch);
            if (result.data.success) {
                if (result?.data?.data?.userExists) router.push('/dashboard');
                else dispatch(setAuthStep(2));
            }
        } catch (error) {
            toast.error("Invalid OTP")
            router.push('/login')
        }finally {
            dispatch(setAuthLoading(false));
        }

    };

    const resendOTP = async () => {
        dispatch(setAuthLoading(true));
        try {
            await sendOTP(contact, true);
        } catch (error) {
            // console.error("Error sending OTP:", error);
        } finally {
            dispatch(setAuthLoading(false));
        }
    }

    const editContactNumber = async () => {
        dispatch(setAuthStep(0))
    }

    return (
        <div className="w-full">
            <Heading
                type='heading1'
                primary={"OTP"}
                secondary={"Give Your Identity"}
                primaryColor='text-black1'
            />

            <div className=' flex flex-col gap-5'>
                <div className=' flex gap-4 text-xs'>Your Verification code has been sent to ******{contact.substring(6)} <FaRegEdit onClick={() => editContactNumber()} className=' cursor-pointer' /></div>
                <div className='relative'>
                    <InputOTP
                        inputType="custom"
                        inputRegex="[0-9]"
                        onChange={(value) => setOtpValues(value)}
                        value={otpValues}
                    />
                    {otpErrors && <ErrorText text={otpErrors} />}
                </div>
                <Button
                    size='large'
                    className='bg-blue1 text-white1 font-semibold w-full'
                    onClick={handleFinish}
                >
                    Send
                </Button>
                <p className=' text-xs'>Didn&apos;t get the code? <span onClick={() => resendOTP()} className=' cursor-pointer text-sm'>Resend</span></p>
            </div>
        </div>
    );
};

export default VerifyOTP;
