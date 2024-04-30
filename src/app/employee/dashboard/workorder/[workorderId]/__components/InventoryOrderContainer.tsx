"use client";
import React, { useEffect, useState } from 'react';
import type { CheckboxProps, GetProp } from 'antd';
import { Checkbox, Divider, Typography } from 'antd';
import { TPartRequested } from '@/app/types/work-order';

const { Title, Text } = Typography

const plainOptions = ['Engine Oil', 'Sheet Cover', 'Break Rubber'];
const defaultCheckedList = ['Apple', 'Orange'];

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

const CheckboxGroup = Checkbox.Group;

type Props = {
    parts: TPartRequested[]
}

const InventoryOrderContainer = (props: Props) => {

    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

    const [plainOptions, setPlainOptions] = useState<string[]>([])

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    useEffect(() => {
        setPlainOptions(() => {
            return props.parts.map((el) => {
                return el.partName
            })
        })
    }, [props.parts])
    return (
        <div className='mb-4'>
            <Title level={5}>Inventory - Order</Title>
            {
                props.parts.length > 0 ?
                    <div>
                        <Checkbox onChange={onCheckAllChange}
                            checked={plainOptions.length === checkedList.length ? true : false}
                            indeterminate={checkedList.length > 0 && checkedList.length < plainOptions.length}
                        >
                            Check all
                        </Checkbox>
                        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                    </div >
                    : <Text>No Parts found</Text>
            }
        </div>
    )
}



export default InventoryOrderContainer