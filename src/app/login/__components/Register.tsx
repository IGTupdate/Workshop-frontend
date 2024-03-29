import Heading from '@/app/components/Heading';
import { registerCustomer } from '@/app/services/operations/auth/customerAuth';
import { useAppDispatch } from '@/app/store/reduxHooks';
import { resetAuthSlice, setAuthLoading } from '@/app/store/slices/authSlice';
import { Button, Input } from 'antd';
import { redirect } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    fullName: string;
    email: string;
};

const Register: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const dispatch = useAppDispatch()

    const onSubmit = async (data: FormData) => {
        dispatch(setAuthLoading(true))
        try{
            await registerCustomer(data.fullName, data.email)
            dispatch(resetAuthSlice())
            redirect('/dashboard')
        }catch(err){
            // console.log(error)
        }
        dispatch(setAuthLoading(false))
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
                    type='primary'
                    size='large'
                    htmlType='submit'
                    className='bg-blue1 text-white1 font-semibold w-full'>
                    Save
                </Button>
            </form>
        </div>
    );
};

export default Register;
