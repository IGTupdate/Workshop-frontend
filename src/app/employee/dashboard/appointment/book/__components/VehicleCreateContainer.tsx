"use client";

import { TVehicle } from '@/app/types/vehicle';
import { TvehicleCreateSchema, vehicleCreateSchema } from '@/app/validators/vehicle';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { vehicleCreateInputFields } from '../__utils/vehicle-create-input';
import InputField from '@/app/components/Input/InputField';
import toast from 'react-hot-toast';
import { COMMON_ERROR } from '@/app/utils/constant';
import { createVehicle } from '@/app/services/operations/appointment/vehicle';

const { Text } = Typography

type Props = {
    setVehicleId: React.Dispatch<React.SetStateAction<string>>
}

const VehicleCreateContainer = (props: Props) => {

    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {},
        resolver: yupResolver(vehicleCreateSchema)
    });

    const onSubmit = async (data: TvehicleCreateSchema) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await createVehicle(data) as TVehicle;
            console.log(response);
            props.setVehicleId(response._id);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || COMMON_ERROR)
        }
        finally {
            setLoading(false);
        }
    }

    const handleBack = () => {
        props.setVehicleId("");
    }
    return (
        <div className='w-full'>

            <div className='w-full grid grid-cols-2 gap-5 mb-5'>
                {
                    vehicleCreateInputFields.map((field, index) => {
                        return <InputField key={index}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            control={control}
                            error={errors[field.name as keyof TvehicleCreateSchema] ? errors[field.name as keyof TvehicleCreateSchema]?.message || "" : ""}
                        />
                    })
                }
            </div>
            <div className='mt-4 flex justify-start gap-4'>
                <Button
                    disabled={loading}
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Button
                    disabled={loading}
                    onClick={handleSubmit(onSubmit)}
                    className='bg-blue1 text-white'>
                    Save
                </Button>

            </div>
        </div>
    )
}

export default VehicleCreateContainer