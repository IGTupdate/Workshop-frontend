import { Input, Typography } from 'antd';
import React from 'react'
import { Controller } from 'react-hook-form';

const { Search } = Input
const { Text } = Typography

type Props = {
    name: string;
    label: string;
    placeholder: string;
    type: string,//"text" | "number" | "email"; // Adjust as needed,
    error: string,
    control: any
}

const SearchField = (props: Props) => {
    return (
        <div>
            <label className='font-medium mb-2 block text-black1' htmlFor="name">{props.label}</label>
            <Controller name={props.name}
                control={props.control}
                render={({ field }) => {
                    return <Search type={props.type} {...field} placeholder={props.placeholder} enterButton="Add" onSearch={(value)=>{
                        console.log(value);
                    }}/>
                }} />
            {props.error && <Text type='danger'> {props.error}</Text>}
        </div>
    )
}

export default SearchField