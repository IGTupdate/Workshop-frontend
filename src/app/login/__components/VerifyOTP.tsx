import { useState } from 'react';
import { Button } from 'antd';
import { InputOTP } from 'antd-input-otp';
import Heading from '@/app/components/Heading';
import ErrorText from '@/app/components/Text/ErrorText';
import { verifyOTP } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { setAuthData, setAuthLoading, setAuthStep } from '@/app/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const MAX_RETRY = 3;

const VerifyOTP: React.FC = () => {
    const contact = useAppSelector((state) => state.auth.authData.contactNumber);
    const router = useRouter();
    const dispatch = useAppDispatch();
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

        dispatch(setAuthLoading(true));

        let result
        try {
            result = await verifyOTP(contact, otp, dispatch);
            if (result.data.success) {
                if (result?.data?.data?.userExists) router.push('/dashboard');
                else dispatch(setAuthStep(2));
            }
        } catch (error) {
            if (result?.status !== 403) {
                toast.error("Internal Error... Please Try After some time")
                router.push('/')
                return
            }
            if (retryCount < MAX_RETRY) { // Check retryCount against MAX_RETRY
                setRetryCount(prevRetryCount => prevRetryCount + 1); // Increment retryCount
                const remainingRetries = MAX_RETRY - retryCount - 1;
                // console.log("Remaining Retries:", remainingRetries);
                toast.error(`INVALID OTP - RETRIES LEFT ${remainingRetries}`);
            } else {
                toast.error("Max retry limit reached");
                router.push('/login');
            }
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
                    size='large'
                    className='bg-blue1 text-white1 font-semibold w-full'
                    onClick={handleFinish}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default VerifyOTP;
