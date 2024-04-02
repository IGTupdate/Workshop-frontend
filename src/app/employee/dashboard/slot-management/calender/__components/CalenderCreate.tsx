"use client"

import React from 'react'
import { Button, Typography, Select, Form } from 'antd';
import { demoSlotScheduleData } from '../../slot-schedule/__demo';
import { useForm } from 'react-hook-form';

const { Title, Text } = Typography;

type TSlotScheduleOption = {
    value: string,
    label: string
}

type Props = {}

const CalenderCreate = (props: Props) => {

    const createCalender = () => {
        console.log("create claender");
    }

    const getSlotScheduleOptions = (): TSlotScheduleOption[] => {
        return demoSlotScheduleData.map((el) => {
            return {
                value: el._id,
                label: el.name
            } as TSlotScheduleOption
        })
    }

    const filterOption = (input: string, option?: { label: string; value: string }) => {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            slot_schedule:""
        }
    });


    return (
        <div>
            <div className="flex justify-between items-center mb-4">

                <Form onSubmitCapture={handleSubmit(onSubmit)} className="w-full" layout="vertical" hideRequiredMark>
                    {/* <Title level={5}>Slot Details</Title> */}
                    <Form.Item
                        className="w-full"
                        {...register("slot_schedule")}
                        label="Select Schedule for the day"
                        rules={[{ required: true, message: "Please enter Schedule name" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select Schedule"
                            optionFilterProp="children"
                            // onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={
                                [
                                    {
                                        value: "ABCd",
                                        label: "Regular"
                                    },
                                    {
                                        value: "ABCd1",
                                        label: "Morning"
                                    }
                                ]
                            }
                        />
                    </Form.Item>

                    <div className='flex justify-end'>
                        <Button
                            htmlType='submit'
                            className="bg-blue1 text-white1 font-medium text-md"
                        >
                            Create
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CalenderCreate