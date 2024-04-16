"use client"

import { useState } from 'react';
import { Button } from 'antd';
import { InputOTP } from 'antd-input-otp';
import Heading from '@/app/components/Heading';
import ErrorText from '@/app/components/Text/ErrorText';
import toast from 'react-hot-toast';
import { TCustomer } from '@/app/types/customer';
import { authEndpoints } from '@/app/services/apis';
import { apiOpenConnector } from '@/app/services/apiOpenConnector';

const { VERIFYOTP_API } =
    authEndpoints;

const MAX_RETRY = 3;

type Props = {
    customer: TCustomer,
    setCustomer: React.Dispatch<React.SetStateAction<TCustomer>>,
    setAuthStep: React.Dispatch<React.SetStateAction<number>>
}

const CustomerVerifyOtp = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [otpValues, setOtpValues] = useState<string[]>([]);
    const [otpErrors, setOTPErrors] = useState('');
    const [retryCount, setRetryCount] = useState(0);

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

        setLoading(true);

        console.log(props.customer)
        let result
        try {
            const response = await apiOpenConnector({
                method: "POST",
                url: VERIFYOTP_API,
                bodyData: { contactNumber: props.customer.contactNumber, otp },
            })
            console.log(response);
            props.setCustomer((prv) => {
                return {
                    ...prv,
                    _id: response?.data?.data?._id
                }
            });

            if (response?.data?.data.userExists) {
                props.setAuthStep(3)
            } else {
                props.setAuthStep(2);
            }
            toast.success("OTP VERIFY SUCCESSFULLY");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || "")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Heading
                type='heading1'
                primary={"OTP"}
                secondary={"Give Your Identity"}
                primaryColor='text-black1'
            />

            <div className=' flex flex-col gap-8'>
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
                    disabled={loading}
                    size='large'
                    className='bg-customYellow text-white1 font-semibold w-full'
                    onClick={handleFinish}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default CustomerVerifyOtp;
