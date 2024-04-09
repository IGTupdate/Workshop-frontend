

import { Input, Typography } from 'antd';
import React from 'react'
import { Controller } from 'react-hook-form';

const { Text } = Typography

export type InputField = {
    name: string;
    label: string;
    placeholder: string;
    type: string,//"text" | "number" | "email"; // Adjust as needed,
    error: string,
    control: any
};

type Props = InputField & {

}

const InputField = (props: Props) => {
    return (
        <div>
            <label className='font-medium mb-2 block text-black1' htmlFor="name">{props.label}</label>
            <Controller name={props.name}
                control={props.control}
                render={({ field }) => {
                    return <Input {...field} placeholder={props.placeholder} />
                }} />
            {props.error && <Text type='danger'> {props.error}</Text>}
        </div>
    )
}

export default InputField