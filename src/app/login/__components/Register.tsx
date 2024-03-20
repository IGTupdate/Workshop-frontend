import { sendOTP } from '@/app/services/operations/auth/customerAuth';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    contactNumber: string;
}

interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const SendOTP: React.FC<Props> = ({ setStep }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data) return;
        try {
            await sendOTP(data.contactNumber);
            setStep(1);
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
                <input
                    type="number"
                    {...register("contactNumber", {
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
                    placeholder="Enter Your Contact Number"
                    className="border-2 px-4 py-2 border-black"
                />
                {errors.contactNumber && <span>{errors.contactNumber.message}</span>}
                <button type="submit">Send OTP</button>
            </form>
        </div>
    );
}

export default SendOTP;
