"use client"

import React, { useEffect, useState } from 'react'
import { Button, Typography, Select, Form, Radio } from 'antd';
import { demoSlotScheduleData } from '../../slot-schedule/__demo';
import { Controller, useForm } from 'react-hook-form';
import { calenderCreateSchema, TCalenderCreate } from '@/app/validators/calender';
import { yupResolver } from '@hookform/resolvers/yup';
import { TCalender } from '@/app/types/calender';
import { calender_status } from '../__utils/constant';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import { setCalenderDrawerLoading } from '@/app/store/slices/calenderSlice';

const { Text } = Typography;

type TSlotScheduleOption = {
    value: string,
    label: string
}[] | undefined

type Props = {
    activeCalender: Partial<TCalender>
}

const CalenderCreate = (props: Props) => {
    const [slotScheduleOptions, setSlotScheduleOptions] = useState<TSlotScheduleOption>([])

    const { calenderDrawerLoading } = useAppSelector((state) => state.calender);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSlotScheduleOptions(() => {
            return demoSlotScheduleData.map((schedule) => {
                return {
                    value: schedule._id,
                    label: schedule.name
                }
            })
        })
    }, []);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            slot_schedule_id: "",
            status: calender_status.open,
            date: props.activeCalender.date
        },
        resolver: yupResolver(calenderCreateSchema)
    });


    const filterOption = (input: string, option?: { label: string; value: string }) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }

    const onSubmit = (data: TCalenderCreate) => {
        dispatch(setCalenderDrawerLoading(true));
        console.log(data);
    }


    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Form onSubmitCapture={handleSubmit(onSubmit)} className="w-full" layout="vertical">
                    <div className='md:mb-4 mb-3'>
                        <label className='text-sm font-medium mb-2 block text-black1'>Select Slot Schedule for the day</label>
                        <Controller
                            name="slot_schedule_id"
                            control={control}
                            render={({ field }) => {
                                return <Select
                                    className='w-full'
                                    {...field}
                                    showSearch
                                    placeholder="Select Schedule"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    options={slotScheduleOptions}
                                />
                            }}
                        />
                        {errors.slot_schedule_id && <Text type='danger'> {errors.slot_schedule_id.message}</Text>}
                    </div>

                    <div>
                        <label className='text-sm font-medium mb-2 block text-black1'>Calender Status</label>
                        <Controller
                            name='status'
                            control={control}
                            render={({ field }) => {
                                return <Radio.Group {...field}>
                                    <Radio
                                        defaultChecked
                                        value={calender_status.open}
                                    >
                                        {calender_status.open}
                                    </Radio>
                                    <Radio
                                        value={calender_status.close}
                                    >
                                        {calender_status.close}
                                    </Radio>
                                </Radio.Group>
                            }}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Button
                            disabled={calenderDrawerLoading}
                            htmlType='submit'
                            className="bg-blue1 text-white1 font-medium text-md"
                        >
                            Create
                        </Button>
                    </div>
                </Form>
            </div>
        </div >
    )
}

export default CalenderCreate