

import InputField from '@/app/components/Input/InputField'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CreateEmployeeFormContainer from './CreateEmployeeFormContainer'
import { Button } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { createEmployeeYupSchema, TCreateEmployee } from '@/app/validators/employee'

type Props = {}

const CreateEmployeeContainer = (props: Props) => {

    const [loading, setLoading] = useState(false);

    const { control, formState: { errors }, handleSubmit, setValue } = useForm<TCreateEmployee>({
        resolver: yupResolver(createEmployeeYupSchema)
    });

    const handleOnSubmit = (data: TCreateEmployee) => {
        try {
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <CreateEmployeeFormContainer control={control} errors={errors} setValue={setValue}/>
                <div className='mt-4 flex justify-end'>
                    <Button htmlType='submit' type='primary'>Create</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateEmployeeContainer