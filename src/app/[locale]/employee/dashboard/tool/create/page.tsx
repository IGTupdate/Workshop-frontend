"use client";
import InputField from '@/app/components/Input/InputField';
import SelectCreateField from '@/app/components/Input/SelectCreateField';
import { EnterTool, TEnterTool } from '@/app/validators/tool';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';

const option = [
    { value: "1", label: "pana" },
    { value: "2", label: "penchis" },
];

const Page = () => {
    const { control, formState: { errors }, handleSubmit, setValue } = useForm<TEnterTool>({
        resolver: yupResolver(EnterTool)
    });


    const toolField = [
        { name: "name", label: "Name", type: "text", placeholder: "Enter Tool Name", error: errors.name?.message, control: control },
        { name: "category", label: "Category", type: "select", placeholder: "Select Category", error: errors.name?.message, control: control },
        { name: "location", label: "Location", type: "text", placeholder: "Enter Tool Location", error: errors.name?.message, control: control },
        { name: "initialStatus", label: "Initial Status", type: "text", placeholder: "Enter Tool Initial Status", error: errors.name?.message, control: control },
        { name: "quantity", label: "Quantity", type: "number", placeholder: "Enter Tool Quantity", error: errors.name?.message, control: control },
    ];



    const onSubmit = async (data: TEnterTool) => {
        console.log(data, "data");
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    {
                        toolField?.map((item, index) => (
                            item.type === "select" ? <SelectCreateField key={index} options={option} label={item.label} placeholder={item.placeholder} name={item.name} mode={'single'} setValue={setValue} control={item.control} /> :
                                <InputField key={index} name={item.name} label={item.label} placeholder={item.placeholder} type={item.type} error={item.error} control={item.control} />
                        ))
                    }
                </div>

                <div className="flex justify-end">
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default Page;
