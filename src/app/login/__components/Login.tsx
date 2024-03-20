import Heading from '@/app/components/Heading';
import { sendOTP } from '@/app/services/operations/auth/customerAuth';
import { contactNumberValidator } from '@/app/validators';
import { Button, Input } from 'antd';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    contactNumber: string;
}

interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const LogIn: React.FC<Props> = ({ setStep }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data) return;
        try {
            console.log(data);
            await sendOTP(data.contactNumber);
            setStep(1);
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <div className="w-full">

            <Heading
                type='heading1'
                primary={"Log in"}
                secondary={"Join Us: Log in for Seamless Integration"}
                primaryColor='text-black1'
            />
            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:mt-10 mt-8'>

                {/* input field */}
                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Contact Number</label>
                    <Input type='number' {...register("contactNumber", {
                        required: true,
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid phone number in the format xxx-xxx-xxxx"
                        },
                        minLength: {
                            value: 10,
                            message: "Please enter exactly 10 digits"
                        },
                        maxLength: {
                            value: 10,
                            message: "Please enter exactly 10 digits"
                        }
                    })}
                        size='large'
                        placeholder="Enter contact number"
                        className='w-full text'
                    />
                    {errors.contactNumber && <span className='text-red-500 text-[11px] font-medium'>{errors.contactNumber.message}</span>}
                </div>

                <Button
                    size='large'
                    htmlType='submit'
                    className='bg-blue1 text-white1 font-semibold w-full'>
                    Send Otp
                </Button>
            </form>
        </div>
    );
}

export default LogIn;
