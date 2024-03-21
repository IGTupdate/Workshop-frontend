import Heading from '@/app/components/Heading';
import { Button, Input } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
    fullName: string;
    email: string;
};

const Register: React.FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data)
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
                    <Input type='text'
                        size='large'
                        placeholder="Enter Name"
                        className='w-full text'
                        {...register("fullName")}
                    />
                </div>

                {/* input field */}
                <div className='md:mb-4 mb-3'>
                    <label className='text-sm font-medium mb-1 block text-black1'>Email</label>
                    <Input type='text'
                        size='large'
                        placeholder="Enter Email"
                        className='w-full text'
                        {...register("email")}
                    />
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
