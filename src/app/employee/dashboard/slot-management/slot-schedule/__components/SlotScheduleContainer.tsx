"use client"

import { Space, Table, TableProps, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import React from 'react'


interface TSlotSchedule {
    key: string;
    name: string;
    limit: number,
    details: string[],
}

const columns: TableProps<TSlotSchedule>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Limit',
        dataIndex: 'limit',
        key: 'limit',
    },
    {
        title: 'Details',
        key: 'details',
        dataIndex: 'details',
        render: (_, { details }) => (
            <div style={{ maxWidth: 300 }} className='flex flex-wrap gap-2'>
                {details.map((tag, index) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={index}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </div>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Update </a>
                <a>Delete</a>
            </Space>
        ),
    },
];



type Props = {}

const SlotScheduleContainer = (props: Props) => {


    const data: TSlotSchedule[] = [
        {
            key: '1',
            name: 'John Brown',
            limit: 32,
            details: ['3:30 - 5:30', '6:60 - 7:56', '6:60 - 7:56', '6:60 - 7:56', '6:60 - 7:56', '6:60 - 7:56'],
        },
    ];



    console.log(data);
    return (
        <Table dataSource={data} columns={columns} />
    )
}

export default SlotScheduleContainer