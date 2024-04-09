"use client"

import { TSlot } from '@/app/types/calender'
import { TASlot, TAvailbleSlots } from '@/app/types/slot'
import { TSlotDetail } from '@/app/types/slot-schedule'
import { Button, Space, Table, TableProps, Tag, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
const { Title, Text } = Typography

type Props = {
    availableSlot: TAvailbleSlots | null
}

const ShowSlotAvailableData = (props: Props) => {
    const router = useRouter();

    const columns: TableProps<TASlot>['columns'] = [
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text) => {
                return new Date(text).toLocaleTimeString()
            }
        },
        {
            title: 'End Time',
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text) => {
                return new Date(text).toLocaleTimeString()
            }
        },
        {
            title: 'Available',
            key: 'slot_limit',
            dataIndex: 'slot_limit',
            render: (_, { available }) => (
                <>
                    <Tag color={available > 4 ? 'geekblue' : 'green'} key={available}>
                        {available}
                    </Tag>

                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        router.push(`/employee/dashboard/appointment/book?calender_id=${props.availableSlot?.calender_id}&slot_id=${record._id}`)
                    }} className='px-4 bg-blue1 text-white'> Procced</Button>
                </Space>
            ),
        },
    ];

    return (
        props.availableSlot ?
            <div>
                <Text strong>Date : {new Date(props.availableSlot.date).toDateString()}</Text>
                <Table pagination={false} className='mt-4' columns={columns} dataSource={props.availableSlot.available_slots} />
            </div> : ""
    )
}

export default ShowSlotAvailableData