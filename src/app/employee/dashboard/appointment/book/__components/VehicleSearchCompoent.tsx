"use client";

import { getVehicles } from '@/app/services/operations/appointment/vehicle';
import { Select } from 'antd'
import React, { useEffect } from 'react'

type Props = {}

const VehicleSearchCompoent = (props: Props) => {

    const [searchValue, setSearchValue] = React.useState('');
    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    const onSearch = (value: string) => {
        setSearchValue(value);
    }

    const onChange = () => {
        console.log("chanegd");
    }


    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            (async function () {
                try {
                    const query = `registeration_number=${searchValue}`;
                    const data = await getVehicles(query);

                    console.log(data);
                } catch (err) {
                    console.log(err);
                }
            }())
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchValue]);

    return (
        <div>
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'tom',
                        label: 'Tom',
                    },
                ]}
            />
        </div>
    )
}

export default VehicleSearchCompoent