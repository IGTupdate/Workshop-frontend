import InputField from '@/app/components/Input/InputField'
import SelectField from '@/app/components/Input/SelectField'
import { TCreateEmployee } from '@/app/validators/employee'
import { error } from 'console'
import React, { useEffect, useState } from 'react'
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'

type Props = {
    control: Control<TCreateEmployee, any>,
    errors: FieldErrors<TCreateEmployee>
    setValue: UseFormSetValue<TCreateEmployee>
}

export type TEmployeeCreateField = {
    name: string,
    error: string,
    label: string,
    type: string,
    control: any,
    placeholder: string
}

const CreateEmployeeFormContainer = (props: Props) => {

    const employee_create_fields: TEmployeeCreateField[] = [
        {
            name: 'firstName',
            error: props.errors?.firstName?.message || "",
            label: "First Name",
            type: "text",
            control: props.control,
            placeholder: "John"
        },
        {
            name: 'lastName',
            error: props.errors?.firstName?.message || "",
            label: "Last Name",
            type: "text",
            control: props.control,
            placeholder: "Doe"
        },
        {
            name: 'contactNumber',
            error: props.errors?.contactNumber?.message || "",
            label: "Contact Number",
            type: "text",
            control: props.control,
            placeholder: "123-456-7890"
        },
        {
            name: 'role',
            error: props.errors?.role?.message || "",
            label: "Role",
            type: "select",
            control: props.control,
            placeholder: "Role"
        },
        {
            name: 'email',
            error: props.errors?.email?.message || "",
            label: "Email",
            type: "email",
            control: props.control,
            placeholder: "example@example.com"
        },
        {
            name: 'password',
            error: props.errors?.password?.message || "",
            label: "Create Password",
            type: "password",
            control: props.control,
            placeholder: "example@example.com"
        },
    ];

    const [employeeRole, setEmployeeRole] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                {
                    employee_create_fields.map((field, index) => {
                        switch (field.type) {
                            case "select":
                                return <SelectField
                                    key={index}
                                    {...field}
                                    mode='single'
                                    options={[]}
                                    setValue={props.setValue}
                                />
                            default:
                                return <InputField
                                    key={index}
                                    {...field}
                                />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default CreateEmployeeFormContainer


/**
 * get all employee role
 * get all empolyee
 * get employee by id
 * update employee
 */