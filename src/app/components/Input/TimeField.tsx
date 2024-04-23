import React from 'react'
import { Controller } from 'react-hook-form'
import { TimePicker, Typography } from 'antd'
import dayjs from 'dayjs'

const { Text } = Typography

type Props = {
    name: string;
    label: string;
    placeholder: string;
    error: string | undefined,
    defaultValue: string,
    setValue: any,
}

const TimeField = (props: Props) => {
    return (
        <div>
            <label className='font-medium mb-2 block text-black1' htmlFor="name">{props.label}</label>
            <TimePicker defaultValue={dayjs(props.defaultValue)} onChange={(value) => {
                if (value) {
                    props.setValue(props.name, value.toISOString());
                }
                else props.setValue("");
            }} placeholder={props.placeholder} className='w-full' />
            {props.error && <Text type='danger'> {props.error}</Text>}
        </div>
    )
}

export default TimeField