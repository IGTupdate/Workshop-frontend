"use client";

import InputField from '@/app/components/Input/InputField';
import SelectField from '@/app/components/Input/SelectField';
import TextAreaField from '@/app/components/Input/TextArea';
import { TUpdateEmpoloyee, updateEmployeeYupSchema } from '@/app/validators/employee';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const UpdateEmployeeForm = (props: Props) => {

    const { control, formState: { errors }, setValue, handleSubmit } = useForm<TUpdateEmpoloyee>({
        resolver: yupResolver(updateEmployeeYupSchema)
    });

    const employee_update_fields = [
        {
            name: 'firstName',
            error: errors?.firstName?.message || "",
            label: "First Name",
            type: "text",
            control: control,
            placeholder: "John"
        },
        {
            name: 'lastName',
            error: errors?.lastName?.message || "",
            label: "Last Name",
            type: "text",
            control: control,
            placeholder: "Doe"
        },
        {
            name: 'email',
            error: errors?.email?.message || "",
            label: "Email",
            type: "email",
            control: control,
            placeholder: "example@example.com"
        },
        {
            name: 'contactNumber',
            error: errors?.contactNumber?.message || "",
            label: "Contact Number",
            type: "text",
            control: control,
            placeholder: "123-456-7890"
        },
        {
            name: 'role',
            error: errors?.role?.message || "",
            label: "Role",
            type: "select",
            control: control,
            placeholder: "Role"
        },
        {
            name: 'address',
            error: errors?.address?.message || "",
            label: "Address",
            type: "textarea",
            control: control,
            placeholder: "Address"
        },
    ];

    const onSubmit = (data: TUpdateEmpoloyee) => {
        console.log(data);
    }


    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-3'>
                    {
                        employee_update_fields.map((field, index) => {
                            switch (field.type) {
                                case "select":
                                    return <SelectField
                                        key={index}
                                        {...field}
                                        mode='single'
                                        options={[]}
                                        setValue={setValue}
                                    />
                                case "textarea":
                                    return <TextAreaField key={index}
                                        {...field} />
                                default:
                                    return <InputField
                                        key={index}
                                        {...field}
                                    />
                            }
                        })
                    }
                </div>

                <div className='flex justify-end mt-8'>
                    <Button htmlType='submit' type='primary'>Update</Button>
                </div>

            </form>
        </div>
    )
}

export default UpdateEmployeeForm