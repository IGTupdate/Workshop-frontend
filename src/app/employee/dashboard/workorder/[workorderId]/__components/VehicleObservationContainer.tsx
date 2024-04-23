"use client";
import React, { useState } from 'react';
import type { CheckboxProps, GetProp } from 'antd';
import { Checkbox, Divider, Typography } from 'antd';

const { Title } = Typography

const plainOptions = ['Engine Oil', 'Sheet Cover', 'Break Rubber'];
const defaultCheckedList = ['Apple', 'Orange'];

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];

const CheckboxGroup = Checkbox.Group;

type Props = {}

const VehicleObservationContainer = (props: Props) => {

    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

    const checkAll = plainOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
    };

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };
    return (
        <div className='mb-4'>
            <Title level={5}>Inventory - Order</Title>
            <div>
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Check all
                </Checkbox>
                <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
            </div >
        </div>
    )
}

export default VehicleObservationContainer