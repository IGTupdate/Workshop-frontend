

import { Input, Typography } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const { Text } = Typography;

const { TextArea } = Input;

export type InputField = {
    name: string;
    label: string;
    placeholder: string;
    error: string | undefined,
    control: any;
};

type Props = InputField & {

};

const TextAreaField = (props: Props) => {
    return (
        <div>
            <label className='font-medium mb-2 block text-black1' htmlFor={props.name}>{props.label}</label>
            <Controller name={props.name}
                control={props.control}
                render={({ field }) => {
                    return <TextArea {...field} placeholder={props.placeholder} size='large' />;
                }} />
            {props.error && <Text type='danger'> {props.error}</Text>}
        </div>
    );
};

export default TextAreaField;